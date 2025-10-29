/*
  # Fix RLS Policies for Public Access

  ## Changes
  - Allow unauthenticated (anon) users to read doctors, medicines, and diagnostic tests
  - Keep booking and order features restricted to authenticated users only
  
  ## Security
  - Public data: doctors, medicines, diagnostic_tests (read-only)
  - Protected data: appointments, orders, notifications (authenticated users only)
*/

-- Drop existing policies for public tables
DROP POLICY IF EXISTS "Anyone can read doctors" ON doctors;
DROP POLICY IF EXISTS "Anyone can read medicines" ON medicines;
DROP POLICY IF EXISTS "Anyone can read diagnostic tests" ON diagnostic_tests;

-- Create new policies that allow anon role to read public data
CREATE POLICY "Public can read doctors"
  ON doctors FOR SELECT
  USING (true);

CREATE POLICY "Public can read medicines"
  ON medicines FOR SELECT
  USING (true);

CREATE POLICY "Public can read diagnostic tests"
  ON diagnostic_tests FOR SELECT
  USING (true);
