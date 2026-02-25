-- 003: Row Level Security — NOMÉS per a Supabase
-- ================================================
-- Saltar aquest fitxer si s'usa una altra BBDD.
-- En un backend tradicional, la lògica d'autorització
-- es gestiona a l'aplicació (middleware, guards, etc.).

ALTER TABLE territories ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- territories: tothom pot llegir (dropdown públic + link WhatsApp)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'territories_select_public') THEN
    CREATE POLICY "territories_select_public"
      ON territories FOR SELECT
      USING (true);
  END IF;
END $$;

-- territories: president del territori o superadmin pot actualitzar
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'territories_update_admin') THEN
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
  END IF;
END $$;

-- registrations: qualsevol pot inserir (registre públic)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'registrations_insert_public') THEN
    CREATE POLICY "registrations_insert_public"
      ON registrations FOR INSERT
      WITH CHECK (true);
  END IF;
END $$;

-- registrations: president veu el seu territori, superadmin veu tot
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'registrations_select_admin') THEN
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
  END IF;
END $$;

-- profiles: veure el propi perfil
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'profiles_select_own') THEN
    CREATE POLICY "profiles_select_own"
      ON profiles FOR SELECT
      USING (id = auth.uid());
  END IF;
END $$;

-- profiles: superadmin veu tots els perfils
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'profiles_select_superadmin') THEN
    CREATE POLICY "profiles_select_superadmin"
      ON profiles FOR SELECT
      USING (
        EXISTS (
          SELECT 1 FROM profiles AS p
          WHERE p.id = auth.uid() AND p.role = 'superadmin'
        )
      );
  END IF;
END $$;
