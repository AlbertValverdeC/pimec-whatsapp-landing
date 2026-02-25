-- =============================================
-- PIMEC Joves — Migració completa per Supabase
-- =============================================
-- Executa els fitxers a supabase/migrations/ en ordre:
--
--   001_create_tables.sql   ← Schema portable (qualsevol PostgreSQL)
--   002_supabase_auth.sql   ← FK a auth.users (NOMÉS Supabase)
--   003_rls_policies.sql    ← Row Level Security (NOMÉS Supabase)
--   004_seed.sql            ← 15 territoris inicials
--
-- O bé, enganxa tot el contingut a continuació al SQL Editor de Supabase:

-- =========== 001: SCHEMA ===========

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

CREATE INDEX IF NOT EXISTS idx_registrations_territory ON registrations(territory_id);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_territory ON profiles(territory_id);

-- =========== 002: SUPABASE AUTH ===========

ALTER TABLE profiles
  ADD CONSTRAINT profiles_auth_user_fk
  FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- =========== 003: RLS ===========

ALTER TABLE territories ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "territories_select_public"
  ON territories FOR SELECT USING (true);

CREATE POLICY "territories_update_admin"
  ON territories FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND (
          profiles.role = 'superadmin'
          OR (profiles.role = 'president' AND profiles.territory_id = territories.id)
        )
    )
  );

CREATE POLICY "registrations_insert_public"
  ON registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "registrations_select_admin"
  ON registrations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND (
          profiles.role = 'superadmin'
          OR (profiles.role = 'president' AND profiles.territory_id = registrations.territory_id)
        )
    )
  );

CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "profiles_select_superadmin"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles AS p
      WHERE p.id = auth.uid() AND p.role = 'superadmin'
    )
  );

-- =========== 004: SEED ===========

INSERT INTO territories (name) VALUES
  ('Barcelona'),
  ('Catalunya Central'),
  ('Girona'),
  ('Lleida'),
  ('Tarragona'),
  ('Baix Camp'),
  ('Baix Llobregat - L''Hospitalet'),
  ('Baix Penedès'),
  ('Conca de Barberà'),
  ('FEB-PIMEC (Badalona)'),
  ('Maresme - Barcelonès Nord'),
  ('Priorat'),
  ('Terres de l''Ebre'),
  ('Vallès Occidental'),
  ('Vallès Oriental')
ON CONFLICT (name) DO NOTHING;

-- =========== ADMIN INICIAL (MANUAL) ===========
-- 1) Crear usuari a Supabase Auth Dashboard (email + password)
-- 2) Copiar el UUID i executar:
--
-- INSERT INTO profiles (id, email, full_name, role)
-- VALUES ('UUID-DEL-USUARI', 'admin@pimec.org', 'Super Admin', 'superadmin');
