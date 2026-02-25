-- 002: Integració amb Supabase Auth — NOMÉS per a Supabase
-- ========================================================
-- Saltar aquest fitxer si s'usa una altra BBDD/auth provider.

-- FK cap a auth.users (taula gestionada per Supabase Auth)
ALTER TABLE profiles
  ADD CONSTRAINT profiles_auth_user_fk
  FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
