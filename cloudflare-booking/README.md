# Olea Booking Prototype

Private Cloudflare booking prototype for testing Kelly's site before reusing
the same engine for Magali's site.

## Direction

- Start with custom availability storage instead of an external scheduler.
- Keep Magali's current scheduling extension untouched.
- Use Kelly's private site as the proving ground.
- Make site-specific branding and services configurable so the same code can
  later run for both Kelly and Magali.

## Proposed Cloudflare Stack

- Cloudflare Worker: booking API and simple embeddable booking surface.
- Cloudflare D1: structured custom storage for sites, services, availability
  rules, blackout dates, and booking requests.
- Cloudflare KV or environment variables: lightweight public config if needed.
- Turnstile: spam protection before public launch.

## Local Prototype Tasks

1. Create the D1 database and run `schema.sql`.
2. Seed one Kelly site, one service, and a basic weekly availability rule.
3. Run the Worker locally with Wrangler.
4. Test available slots and booking creation through the API.
5. Embed or link the prototype from Kelly's private Squarespace site.

Example local commands once Wrangler is available:

```bash
cp wrangler.toml.example wrangler.toml
wrangler d1 execute olea-booking --local --file schema.sql
wrangler d1 execute olea-booking --local --file seed.kelly.sql
wrangler dev
```

## API Sketch

- `GET /health`: health check.
- `GET /api/sites/:slug/config`: public site/service metadata.
- `GET /api/sites/:slug/slots?service=...&date=YYYY-MM-DD`: available slots.
- `POST /api/sites/:slug/bookings`: create a pending booking request.

Bookings should start as `pending` until confirmation rules are finalized. This
keeps the first version safe while we decide how much automation Kelly wants.

Prototype note: slot generation currently treats availability rule times as UTC.
Before any client-facing embed goes live, convert rule times from the site's
timezone into UTC slots and render them in the visitor's expected timezone.

## Open Decisions

- Exact service names and durations.
- Whether bookings are auto-confirmed or held for manual approval.
- Email notification sender and recipients.
- Timezone and service area wording.
- Timezone conversion rules for stored weekly availability.
- Client intake fields that Kelly wants before a call is offered.

## First Test Calls

```bash
curl http://localhost:8787/health
curl "http://localhost:8787/api/sites/kelly/config"
curl "http://localhost:8787/api/sites/kelly/slots?service=intro-fit-call&date=2026-06-02"
```
