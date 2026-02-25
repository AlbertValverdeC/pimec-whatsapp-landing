-- 004: Seed — Territoris inicials
-- ================================
-- Idempotent: no duplica si ja existeixen.

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
