INSERT INTO sites (slug, name, timezone, public_email)
VALUES ('kelly', 'Olea Tax Co', 'America/New_York', 'hello@oleataxco.com')
ON CONFLICT(slug) DO UPDATE SET
  name = excluded.name,
  timezone = excluded.timezone,
  public_email = excluded.public_email,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO services (
  site_id, slug, name, description, duration_minutes, buffer_after_minutes,
  requires_manual_approval
)
SELECT
  sites.id,
  'intro-fit-call',
  'Intro Fit Call',
  'A short call after async intake confirms that a conversation would be useful.',
  30,
  15,
  1
FROM sites
WHERE sites.slug = 'kelly'
ON CONFLICT(site_id, slug) DO UPDATE SET
  name = excluded.name,
  description = excluded.description,
  duration_minutes = excluded.duration_minutes,
  buffer_after_minutes = excluded.buffer_after_minutes,
  requires_manual_approval = excluded.requires_manual_approval,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO availability_rules (site_id, service_id, weekday, start_time, end_time)
SELECT sites.id, services.id, 2, '14:00', '17:00'
FROM sites
JOIN services ON services.site_id = sites.id
WHERE sites.slug = 'kelly'
  AND services.slug = 'intro-fit-call';

INSERT INTO availability_rules (site_id, service_id, weekday, start_time, end_time)
SELECT sites.id, services.id, 4, '14:00', '17:00'
FROM sites
JOIN services ON services.site_id = sites.id
WHERE sites.slug = 'kelly'
  AND services.slug = 'intro-fit-call';
