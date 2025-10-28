/*
  # Healthcare Platform Database Schema

  ## Overview
  This migration creates the complete database schema for a healthcare platform with appointment booking,
  medicine ordering, diagnostic tests, and notification features.

  ## Tables Created
  
  1. **profiles** - User profiles extending Supabase auth
     - id (uuid, references auth.users)
     - first_name (text)
     - last_name (text)
     - phone (text)
     - date_of_birth (date)
     - gender (text)
     - address (text)
     - city (text)
     - zip_code (text)
     - user_type (text) - patient, doctor, admin
     - created_at (timestamp)
     - updated_at (timestamp)

  2. **doctors** - Doctor information
     - id (uuid, primary key)
     - user_id (uuid, references profiles)
     - specialty (text)
     - experience_years (integer)
     - rating (decimal)
     - review_count (integer)
     - fee (decimal)
     - location (text)
     - available (boolean)
     - next_slot (text)
     - created_at (timestamp)

  3. **appointments** - All types of appointments
     - id (uuid, primary key)
     - patient_id (uuid, references profiles)
     - doctor_id (uuid, references doctors, nullable)
     - appointment_type (text) - doctor, home_visit, diagnostic
     - appointment_date (date)
     - appointment_time (text)
     - status (text) - pending, confirmed, completed, cancelled
     - patient_name (text)
     - patient_age (integer)
     - patient_gender (text)
     - patient_phone (text)
     - patient_email (text)
     - address (text)
     - specialty (text)
     - reason (text)
     - created_at (timestamp)
     - updated_at (timestamp)

  4. **medicines** - Medicine inventory
     - id (uuid, primary key)
     - name (text)
     - category (text)
     - price (decimal)
     - in_stock (boolean)
     - description (text)
     - created_at (timestamp)

  5. **orders** - Medicine orders
     - id (uuid, primary key)
     - user_id (uuid, references profiles)
     - order_type (text) - prescription, direct
     - total_amount (decimal)
     - delivery_address (text)
     - status (text) - pending, processing, delivered, cancelled
     - prescription_url (text, nullable)
     - created_at (timestamp)
     - updated_at (timestamp)

  6. **order_items** - Individual items in orders
     - id (uuid, primary key)
     - order_id (uuid, references orders)
     - medicine_id (uuid, references medicines)
     - quantity (integer)
     - price (decimal)
     - created_at (timestamp)

  7. **diagnostic_tests** - Diagnostic test catalog
     - id (uuid, primary key)
     - name (text)
     - category (text)
     - price (decimal)
     - report_time (text)
     - preparation (text)
     - popular (boolean)
     - created_at (timestamp)

  8. **notifications** - User notifications
     - id (uuid, primary key)
     - user_id (uuid, references profiles)
     - title (text)
     - message (text)
     - type (text) - appointment, order, general
     - reference_id (uuid, nullable)
     - read (boolean)
     - created_at (timestamp)

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Users can read their own data
  - Users can insert their own bookings and orders
  - Users can update their own profile
  - Public read access for doctors, medicines, and diagnostic tests

  ## Indexes
  - Indexes on foreign keys for performance
  - Indexes on commonly queried fields (status, dates, etc.)
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text,
  date_of_birth date,
  gender text,
  address text,
  city text,
  zip_code text,
  user_type text NOT NULL DEFAULT 'patient',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  specialty text NOT NULL,
  experience_years integer DEFAULT 0,
  rating decimal(3,2) DEFAULT 0.0,
  review_count integer DEFAULT 0,
  fee decimal(10,2) NOT NULL,
  location text NOT NULL,
  available boolean DEFAULT true,
  next_slot text,
  created_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES doctors(id) ON DELETE SET NULL,
  appointment_type text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time text NOT NULL,
  status text DEFAULT 'pending',
  patient_name text NOT NULL,
  patient_age integer,
  patient_gender text,
  patient_phone text NOT NULL,
  patient_email text,
  address text,
  specialty text,
  reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create medicines table
CREATE TABLE IF NOT EXISTS medicines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  price decimal(10,2) NOT NULL,
  in_stock boolean DEFAULT true,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  order_type text NOT NULL,
  total_amount decimal(10,2) NOT NULL,
  delivery_address text NOT NULL,
  status text DEFAULT 'pending',
  prescription_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  medicine_id uuid REFERENCES medicines(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create diagnostic_tests table
CREATE TABLE IF NOT EXISTS diagnostic_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  price decimal(10,2) NOT NULL,
  report_time text NOT NULL,
  preparation text,
  popular boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL,
  reference_id uuid,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Doctors policies (public read access)
CREATE POLICY "Anyone can read doctors"
  ON doctors FOR SELECT
  TO authenticated
  USING (true);

-- Appointments policies
CREATE POLICY "Users can read own appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (patient_id = auth.uid());

CREATE POLICY "Users can create appointments"
  ON appointments FOR INSERT
  TO authenticated
  WITH CHECK (patient_id = auth.uid());

CREATE POLICY "Users can update own appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING (patient_id = auth.uid())
  WITH CHECK (patient_id = auth.uid());

-- Medicines policies (public read access)
CREATE POLICY "Anyone can read medicines"
  ON medicines FOR SELECT
  TO authenticated
  USING (true);

-- Orders policies
CREATE POLICY "Users can read own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Order items policies
CREATE POLICY "Users can read own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create order items"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Diagnostic tests policies (public read access)
CREATE POLICY "Anyone can read diagnostic tests"
  ON diagnostic_tests FOR SELECT
  TO authenticated
  USING (true);

-- Notifications policies
CREATE POLICY "Users can read own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);

-- Insert sample doctors
INSERT INTO doctors (specialty, experience_years, rating, review_count, fee, location, available, next_slot)
VALUES
  ('Cardiologist', 15, 4.9, 342, 800, 'Downtown', true, '2:30 PM'),
  ('Pediatrician', 12, 4.8, 298, 600, 'North Area', true, '4:00 PM'),
  ('Dermatologist', 10, 4.9, 256, 750, 'South Area', true, '10:00 AM'),
  ('Orthopedic', 18, 4.7, 412, 900, 'East District', true, '6:30 PM'),
  ('Gynecologist', 14, 4.8, 389, 850, 'West District', true, '3:15 PM'),
  ('Neurologist', 20, 4.9, 456, 1000, 'Downtown', true, '11:30 AM')
ON CONFLICT DO NOTHING;

-- Insert sample medicines
INSERT INTO medicines (name, category, price, in_stock, description)
VALUES
  ('Paracetamol 500mg', 'Pain Relief', 25, true, 'For fever and pain relief'),
  ('Crocin Advance', 'Fever', 45, true, 'Fast acting fever relief'),
  ('Vitamin D3', 'Supplements', 150, true, 'Daily vitamin supplement'),
  ('Cough Syrup', 'Cold & Cough', 85, true, 'Relief from cough and cold'),
  ('Antiseptic Cream', 'First Aid', 60, true, 'Wound care cream'),
  ('Multivitamin', 'Supplements', 200, false, 'Complete multivitamin formula')
ON CONFLICT DO NOTHING;

-- Insert sample diagnostic tests
INSERT INTO diagnostic_tests (name, category, price, report_time, preparation, popular)
VALUES
  ('Complete Blood Count (CBC)', 'Blood Tests', 400, '2-4 hours', 'No fasting required', true),
  ('Lipid Profile', 'Blood Tests', 800, '4-6 hours', '12 hours fasting required', true),
  ('Thyroid Function Test', 'Blood Tests', 650, '6-8 hours', 'No fasting required', true),
  ('X-Ray Chest', 'Radiology', 500, '1-2 hours', 'No preparation needed', false),
  ('ECG', 'Cardiology', 300, '30 minutes', 'Wear loose clothing', true),
  ('Diabetes Profile', 'Blood Tests', 1200, '4-6 hours', '12 hours fasting required', true)
ON CONFLICT DO NOTHING;

-- Function to create notification when appointment is created
CREATE OR REPLACE FUNCTION notify_appointment_created()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notifications (user_id, title, message, type, reference_id)
  VALUES (
    NEW.patient_id,
    'Appointment Booked Successfully',
    'Your appointment for ' || NEW.appointment_date || ' at ' || NEW.appointment_time || ' has been confirmed.',
    'appointment',
    NEW.id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to create notification when order is created
CREATE OR REPLACE FUNCTION notify_order_created()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notifications (user_id, title, message, type, reference_id)
  VALUES (
    NEW.user_id,
    'Order Placed Successfully',
    'Your medicine order of ₹' || NEW.total_amount || ' has been placed and will be delivered soon.',
    'order',
    NEW.id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
DROP TRIGGER IF EXISTS appointment_notification_trigger ON appointments;
CREATE TRIGGER appointment_notification_trigger
  AFTER INSERT ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION notify_appointment_created();

DROP TRIGGER IF EXISTS order_notification_trigger ON orders;
CREATE TRIGGER order_notification_trigger
  AFTER INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION notify_order_created();
