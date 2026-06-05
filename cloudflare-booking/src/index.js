const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "content-type",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: JSON_HEADERS });
    }

    try {
      if (url.pathname === "/health") {
        return json({ ok: true, service: "olea-booking" });
      }

      const match = url.pathname.match(/^\/api\/sites\/([^/]+)\/([^/]+)$/);
      if (!match) {
        return json({ error: "Not found" }, 404);
      }

      const [, siteSlug, action] = match;
      const site = await findSite(env.DB, siteSlug);
      if (!site) {
        return json({ error: "Unknown site" }, 404);
      }

      if (request.method === "GET" && action === "config") {
        return json(await getConfig(env.DB, site));
      }

      if (request.method === "GET" && action === "slots") {
        return json(await getSlots(env.DB, site, url.searchParams));
      }

      if (request.method === "POST" && action === "bookings") {
        return json(await createBooking(env.DB, site, request), 201);
      }

      return json({ error: "Unsupported route" }, 404);
    } catch (error) {
      return json({ error: error.message || "Unexpected error" }, 500);
    }
  },
};

async function findSite(db, slug) {
  return db
    .prepare("SELECT * FROM sites WHERE slug = ?")
    .bind(slug)
    .first();
}

async function getConfig(db, site) {
  const services = await db
    .prepare(
      `SELECT slug, name, description, duration_minutes, buffer_after_minutes,
              requires_manual_approval
         FROM services
        WHERE site_id = ? AND is_active = 1
        ORDER BY id`
    )
    .bind(site.id)
    .all();

  return {
    site: {
      slug: site.slug,
      name: site.name,
      timezone: site.timezone,
      publicEmail: site.public_email,
    },
    services: services.results,
  };
}

async function getSlots(db, site, params) {
  const serviceSlug = params.get("service");
  const date = params.get("date");
  if (!serviceSlug || !date) {
    throw new Error("Missing required service or date parameter");
  }

  const service = await findService(db, site.id, serviceSlug);
  if (!service) {
    throw new Error("Unknown service");
  }

  const weekday = weekdayFromIsoDate(date);
  const rules = await db
    .prepare(
      `SELECT start_time, end_time
         FROM availability_rules
        WHERE site_id = ?
          AND weekday = ?
          AND is_active = 1
          AND (service_id IS NULL OR service_id = ?)
          AND (effective_from IS NULL OR effective_from <= ?)
          AND (effective_until IS NULL OR effective_until >= ?)
        ORDER BY start_time`
    )
    .bind(site.id, weekday, service.id, date, date)
    .all();

  const slots = [];
  for (const rule of rules.results) {
    slots.push(...buildSlots(date, rule, service.duration_minutes));
  }

  const blocked = await getBlockedRanges(db, site.id, service.id, date);
  return {
    site: site.slug,
    service: service.slug,
    date,
    slots: slots.filter((slot) => !overlapsAny(slot, blocked)),
  };
}

async function createBooking(db, site, request) {
  const payload = await request.json();
  const required = ["service", "startsAt", "clientName", "clientEmail", "needSummary"];
  for (const key of required) {
    if (!payload[key]) {
      throw new Error(`Missing required field: ${key}`);
    }
  }

  const service = await findService(db, site.id, payload.service);
  if (!service) {
    throw new Error("Unknown service");
  }

  const startsAt = new Date(payload.startsAt);
  if (Number.isNaN(startsAt.valueOf())) {
    throw new Error("Invalid startsAt");
  }

  const endsAt = new Date(startsAt.getTime() + service.duration_minutes * 60000);
  const conflict = await hasConflict(db, site.id, service.id, startsAt, endsAt);
  if (conflict) {
    throw new Error("Requested time is no longer available");
  }

  const result = await db
    .prepare(
      `INSERT INTO bookings (
          site_id, service_id, status, starts_at, ends_at, client_name,
          client_email, client_phone, entity_type, tax_year, need_summary,
          records_ready, deadline, source
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      site.id,
      service.id,
      service.requires_manual_approval ? "pending" : "confirmed",
      startsAt.toISOString(),
      endsAt.toISOString(),
      payload.clientName,
      payload.clientEmail,
      payload.clientPhone || null,
      payload.entityType || null,
      payload.taxYear || null,
      payload.needSummary,
      toNullableBooleanInt(payload.recordsReady),
      payload.deadline || null,
      payload.source || "booking-prototype"
    )
    .run();

  return {
    bookingId: result.meta.last_row_id,
    status: service.requires_manual_approval ? "pending" : "confirmed",
    startsAt: startsAt.toISOString(),
    endsAt: endsAt.toISOString(),
  };
}

async function findService(db, siteId, slug) {
  return db
    .prepare("SELECT * FROM services WHERE site_id = ? AND slug = ? AND is_active = 1")
    .bind(siteId, slug)
    .first();
}

async function getBlockedRanges(db, siteId, serviceId, date) {
  const dayStart = `${date}T00:00:00.000Z`;
  const dayEnd = `${date}T23:59:59.999Z`;
  const blackouts = await db
    .prepare(
      `SELECT starts_at, ends_at
         FROM blackout_dates
        WHERE site_id = ?
          AND (service_id IS NULL OR service_id = ?)
          AND starts_at < ?
          AND ends_at > ?`
    )
    .bind(siteId, serviceId, dayEnd, dayStart)
    .all();
  const bookings = await db
    .prepare(
      `SELECT starts_at, ends_at
         FROM bookings
        WHERE site_id = ?
          AND status IN ('pending', 'confirmed')
          AND starts_at < ?
          AND ends_at > ?`
    )
    .bind(siteId, dayEnd, dayStart)
    .all();

  return [...blackouts.results, ...bookings.results].map((range) => ({
    startsAt: new Date(range.starts_at),
    endsAt: new Date(range.ends_at),
  }));
}

async function hasConflict(db, siteId, serviceId, startsAt, endsAt) {
  const blocked = await getBlockedRanges(
    db,
    siteId,
    serviceId,
    startsAt.toISOString().slice(0, 10)
  );
  return overlapsAny({ startsAt, endsAt }, blocked);
}

function buildSlots(date, rule, durationMinutes) {
  const slots = [];
  let cursor = parseUtcDateTime(date, rule.start_time);
  const end = parseUtcDateTime(date, rule.end_time);

  while (cursor.getTime() + durationMinutes * 60000 <= end.getTime()) {
    const startsAt = new Date(cursor);
    const endsAt = new Date(cursor.getTime() + durationMinutes * 60000);
    slots.push({
      startsAt: startsAt.toISOString(),
      endsAt: endsAt.toISOString(),
    });
    cursor = new Date(cursor.getTime() + durationMinutes * 60000);
  }

  return slots;
}

function parseUtcDateTime(date, time) {
  return new Date(`${date}T${time}:00.000Z`);
}

function weekdayFromIsoDate(date) {
  const parsed = new Date(`${date}T00:00:00.000Z`);
  if (Number.isNaN(parsed.valueOf())) {
    throw new Error("Invalid date");
  }
  return parsed.getUTCDay();
}

function overlapsAny(slot, ranges) {
  const startsAt = new Date(slot.startsAt);
  const endsAt = new Date(slot.endsAt);
  return ranges.some((range) => startsAt < range.endsAt && endsAt > range.startsAt);
}

function toNullableBooleanInt(value) {
  if (value === undefined || value === null || value === "") {
    return null;
  }
  return value ? 1 : 0;
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: JSON_HEADERS,
  });
}
