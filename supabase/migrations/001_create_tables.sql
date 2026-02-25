-- 001: Schema base — portable a qualsevol PostgreSQL
-- =================================================

CREATE TABLE IF NOT EXISTS territories (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT NOT NULL UNIQUE,
  whatsapp_link TEXT,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS profiles (
  id            UUID PRIMARY KEY,
  email         TEXT NOT NULL,
  full_name     TEXT,
  role          TEXT NOT NULL DEFAULT 'president' CHECK (role IN ('superadmin', 'president')),
  territory_id  UUID REFERENCES territories(id),
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS registrations (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT NOT NULL,
  company       TEXT NOT NULL,
  territory_id  UUID NOT NULL REFERENCES territories(id),
  phone         TEXT NOT NULL,
  email         TEXT NOT NULL,
  topics        TEXT[] DEFAULT '{}',
  consent       BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Índexos per queries freqüents
CREATE INDEX IF NOT EXISTS idx_registrations_territory ON registrations(territory_id);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_territory ON profiles(territory_id);
