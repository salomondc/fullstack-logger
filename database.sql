-- LOG SCHEMA

CREATE TABLE log_entries(
  id SERIAL PRIMARY KEY,
  "description" TEXT NOT NULL,
  CHECK ("description" <> ''),
  "startAt" TEXT NOT NULL,
  CHECK ("startAt" <> ''),
  "endAt" TEXT NOT NULL,
  CHECK ("endAt" <> ''),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);