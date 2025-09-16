-- Create database schema for Appoint Ease Healthcare Platform

-- Users table (patients, doctors, admins)
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('patient', 'doctor', 'admin')),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    zip_code VARCHAR(10),
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Doctors table (additional doctor-specific information)
CREATE TABLE doctors (
    doctor_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    specialty VARCHAR(100) NOT NULL,
    experience_years INTEGER,
    qualification TEXT,
    license_number VARCHAR(100) UNIQUE,
    fee DECIMAL(10,2) NOT NULL,
    location VARCHAR(100),
    availability_schedule JSONB, -- Store weekly schedule as JSON
    rating DECIMAL(3,2) DEFAULT 0.0,
    total_reviews INTEGER DEFAULT 0,
    bio TEXT,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments table
CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    doctor_id INTEGER REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    appointment_type VARCHAR(50) NOT NULL CHECK (appointment_type IN ('consultation', 'home_visit', 'follow_up')),
    symptoms TEXT,
    diagnosis TEXT,
    prescription TEXT,
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Medicines table
CREATE TABLE medicines (
    medicine_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    manufacturer VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    requires_prescription BOOLEAN DEFAULT false,
    dosage_form VARCHAR(50), -- tablet, capsule, syrup, etc.
    strength VARCHAR(50),
    expiry_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table (for medicines and tests)
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    order_type VARCHAR(20) NOT NULL CHECK (order_type IN ('medicine', 'test')),
    total_amount DECIMAL(10,2) NOT NULL,
    delivery_address TEXT,
    status VARCHAR(20) DEFAULT 'processing' CHECK (status IN ('processing', 'confirmed', 'shipped', 'delivered', 'cancelled')),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    delivery_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table (for medicine orders)
CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(order_id) ON DELETE CASCADE,
    medicine_id INTEGER REFERENCES medicines(medicine_id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test reports table
CREATE TABLE test_reports (
    report_id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    doctor_id INTEGER REFERENCES users(user_id),
    test_name VARCHAR(255) NOT NULL,
    test_type VARCHAR(100),
    test_date DATE NOT NULL,
    report_date DATE,
    results JSONB, -- Store test results as JSON
    report_file_url TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    lab_name VARCHAR(255),
    technician_name VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Medical records table
CREATE TABLE medical_records (
    record_id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    doctor_id INTEGER REFERENCES users(user_id),
    appointment_id INTEGER REFERENCES appointments(appointment_id),
    record_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table (for doctor ratings)
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    doctor_id INTEGER REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    appointment_id INTEGER REFERENCES appointments(appointment_id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_type ON users(user_type);
CREATE INDEX idx_doctors_specialty ON doctors(specialty);
CREATE INDEX idx_doctors_location ON doctors(location);
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_test_reports_patient ON test_reports(patient_id);

-- Insert sample data

-- Sample medicines
INSERT INTO medicines (name, description, category, manufacturer, price, stock_quantity, requires_prescription, dosage_form, strength) VALUES
('Paracetamol', 'Pain reliever and fever reducer', 'Pain Relief', 'PharmaCorp', 25.00, 500, false, 'Tablet', '500mg'),
('Amoxicillin', 'Antibiotic for bacterial infections', 'Antibiotics', 'MediLab', 120.00, 200, true, 'Capsule', '250mg'),
('Vitamin D3', 'Vitamin D supplement', 'Vitamins', 'HealthPlus', 180.00, 300, false, 'Tablet', '1000 IU'),
('Omeprazole', 'Proton pump inhibitor for acid reflux', 'Gastro', 'PharmaCorp', 85.00, 150, true, 'Capsule', '20mg'),
('Cetirizine', 'Antihistamine for allergies', 'Allergy', 'AllerCare', 45.00, 400, false, 'Tablet', '10mg'),
('Metformin', 'Diabetes medication', 'Diabetes', 'DiabCare', 95.00, 250, true, 'Tablet', '500mg'),
('Aspirin', 'Blood thinner and pain reliever', 'Cardio', 'HeartCare', 35.00, 600, false, 'Tablet', '75mg'),
('Losartan', 'Blood pressure medication', 'Hypertension', 'BPCare', 110.00, 180, true, 'Tablet', '50mg');

-- Sample doctors (first create user accounts for doctors)
INSERT INTO users (user_type, first_name, last_name, email, phone, date_of_birth, gender, address, city, zip_code, password_hash) VALUES
('doctor', 'Sarah', 'Johnson', 'sarah.johnson@appointease.com', '+1-555-0101', '1980-05-15', 'female', '123 Medical Center Dr', 'Downtown', '10001', '$2a$10$example_hash_1'),
('doctor', 'Michael', 'Chen', 'michael.chen@appointease.com', '+1-555-0102', '1975-08-22', 'male', '456 Pediatric Ave', 'North Area', '10002', '$2a$10$example_hash_2'),
('doctor', 'Emily', 'Rodriguez', 'emily.rodriguez@appointease.com', '+1-555-0103', '1985-12-03', 'female', '789 Skin Care Blvd', 'South Area', '10003', '$2a$10$example_hash_3'),
('doctor', 'David', 'Kumar', 'david.kumar@appointease.com', '+1-555-0104', '1970-03-18', 'male', '321 Orthopedic St', 'East District', '10004', '$2a$10$example_hash_4'),
('doctor', 'Lisa', 'Thompson', 'lisa.thompson@appointease.com', '+1-555-0105', '1978-11-27', 'female', '654 Women Health Dr', 'West District', '10005', '$2a$10$example_hash_5'),
('doctor', 'James', 'Wilson', 'james.wilson@appointease.com', '+1-555-0106', '1965-07-09', 'male', '987 Neuro Center Ave', 'Downtown', '10006', '$2a$10$example_hash_6');

-- Sample doctors details
INSERT INTO doctors (user_id, specialty, experience_years, qualification, license_number, fee, location, rating, total_reviews, bio, availability_schedule) VALUES
(1, 'Cardiologist', 15, 'MD, DM Cardiology', 'LIC001', 800.00, 'Downtown', 4.9, 342, 'Experienced cardiologist specializing in heart disease prevention and treatment.', '{"monday": "9:00-17:00", "tuesday": "9:00-17:00", "wednesday": "9:00-17:00", "thursday": "9:00-17:00", "friday": "9:00-15:00"}'),
(2, 'Pediatrician', 12, 'MD, DCH Pediatrics', 'LIC002', 600.00, 'North Area', 4.8, 298, 'Caring pediatrician with expertise in child healthcare and development.', '{"monday": "8:00-16:00", "tuesday": "8:00-16:00", "wednesday": "8:00-16:00", "thursday": "8:00-16:00", "friday": "8:00-14:00", "saturday": "9:00-13:00"}'),
(3, 'Dermatologist', 10, 'MD, DVD Dermatology', 'LIC003', 750.00, 'South Area', 4.9, 256, 'Skin specialist with focus on cosmetic and medical dermatology.', '{"monday": "10:00-18:00", "tuesday": "10:00-18:00", "wednesday": "10:00-18:00", "thursday": "10:00-18:00", "friday": "10:00-16:00"}'),
(4, 'Orthopedic', 18, 'MS Orthopedics', 'LIC004', 900.00, 'East District', 4.7, 412, 'Orthopedic surgeon specializing in joint replacement and sports injuries.', '{"monday": "7:00-15:00", "tuesday": "7:00-15:00", "wednesday": "7:00-15:00", "thursday": "7:00-15:00", "friday": "7:00-13:00"}'),
(5, 'Gynecologist', 14, 'MD, DGO Gynecology', 'LIC005', 850.00, 'West District', 4.8, 389, 'Women''s health specialist with expertise in reproductive health.', '{"monday": "9:00-17:00", "tuesday": "9:00-17:00", "wednesday": "9:00-17:00", "thursday": "9:00-17:00", "friday": "9:00-15:00", "saturday": "10:00-14:00"}'),
(6, 'Neurologist', 20, 'DM Neurology', 'LIC006', 1000.00, 'Downtown', 4.9, 456, 'Neurologist with extensive experience in treating neurological disorders.', '{"monday": "8:00-16:00", "tuesday": "8:00-16:00", "wednesday": "8:00-16:00", "thursday": "8:00-16:00", "friday": "8:00-14:00"}');