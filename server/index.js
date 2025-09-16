import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';


// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Tell dotenv to look for the .env file in the project's root folder
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// This middleware must be last
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message
  });
});

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Test database connection
pool.connect()
  .then(client => {
    console.log('Server running on port 5000');
    console.log('Successfully connected to PostgreSQL!');
    client.release();
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL:', err.message);
  });

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const {
      userType, firstName, lastName, email, phone, dateOfBirth,
      gender, address, city, zipCode, password
    } = req.body;

    // Check if user already exists
    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR phone = $2',
      [email, phone]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists with this email or phone' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const newUser = await pool.query(
      `INSERT INTO users (user_type, first_name, last_name, email, phone, date_of_birth, 
       gender, address, city, zip_code, password_hash, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW()) 
       RETURNING user_id, email, first_name, last_name, user_type`,
      [userType, firstName, lastName, email, phone, dateOfBirth, gender, address, city, zipCode, hashedPassword]
    );

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.rows[0].user_id, userType: newUser.rows[0].user_type },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser.rows[0],
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, phone, password, userType } = req.body;

    // Find user by email or phone
    const user = await pool.query(
      'SELECT * FROM users WHERE (email = $1 OR phone = $2) AND user_type = $3',
      [email || '', phone || '', userType]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.rows[0].user_id, userType: user.rows[0].user_type },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      user: {
        user_id: user.rows[0].user_id,
        email: user.rows[0].email,
        first_name: user.rows[0].first_name,
        last_name: user.rows[0].last_name,
        user_type: user.rows[0].user_type
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Doctor Routes
app.get('/api/doctors', async (req, res) => {
  try {
    const { specialty, location, search } = req.query;
    
    let query = `
      SELECT d.*, u.first_name, u.last_name, u.email, u.phone 
      FROM doctors d 
      JOIN users u ON d.user_id = u.user_id 
      WHERE u.user_type = 'doctor'
    `;
    const params = [];
    let paramCount = 0;

    if (specialty && specialty !== 'All Specialties') {
      paramCount++;
      query += ` AND d.specialty = $${paramCount}`;
      params.push(specialty);
    }

    if (location && location !== 'All Locations') {
      paramCount++;
      query += ` AND d.location = $${paramCount}`;
      params.push(location);
    }

    if (search) {
      paramCount++;
      query += ` AND (u.first_name ILIKE $${paramCount} OR u.last_name ILIKE $${paramCount} OR d.specialty ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }

    query += ' ORDER BY d.rating DESC';

    const doctors = await pool.query(query, params);
    res.json(doctors.rows);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Server error fetching doctors' });
  }
});

// Appointment Routes
app.post('/api/appointments', authenticateToken, async (req, res) => {
  try {
    const { doctorId, appointmentDate, appointmentTime, appointmentType, symptoms } = req.body;
    const patientId = req.user.userId;

    const newAppointment = await pool.query(
      `INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, 
       appointment_type, symptoms, status, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, 'scheduled', NOW()) 
       RETURNING *`,
      [patientId, doctorId, appointmentDate, appointmentTime, appointmentType, symptoms]
    );

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment: newAppointment.rows[0]
    });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Server error booking appointment' });
  }
});

app.get('/api/appointments/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const userType = req.user.userType;

    let query;
    if (userType === 'patient') {
      query = `
        SELECT a.*, d.specialty, d.fee, u.first_name as doctor_first_name, u.last_name as doctor_last_name
        FROM appointments a
        JOIN doctors d ON a.doctor_id = d.doctor_id
        JOIN users u ON d.user_id = u.user_id
        WHERE a.patient_id = $1
        ORDER BY a.appointment_date DESC, a.appointment_time DESC
      `;
    } else if (userType === 'doctor') {
      query = `
        SELECT a.*, u.first_name as patient_first_name, u.last_name as patient_last_name, u.phone as patient_phone
        FROM appointments a
        JOIN users u ON a.patient_id = u.user_id
        JOIN doctors d ON a.doctor_id = d.doctor_id
        WHERE d.user_id = $1
        ORDER BY a.appointment_date ASC, a.appointment_time ASC
      `;
    }

    const appointments = await pool.query(query, [userId]);
    res.json(appointments.rows);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error fetching appointments' });
  }
});

// Medicine/Pharmacy Routes
app.get('/api/medicines', async (req, res) => {
  try {
    const { search, category } = req.query;
    
    let query = 'SELECT * FROM medicines WHERE stock_quantity > 0';
    const params = [];
    let paramCount = 0;

    if (category && category !== 'All Categories') {
      paramCount++;
      query += ` AND category = $${paramCount}`;
      params.push(category);
    }

    if (search) {
      paramCount++;
      query += ` AND (name ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }

    query += ' ORDER BY name ASC';

    const medicines = await pool.query(query, params);
    res.json(medicines.rows);
  } catch (error) {
    console.error('Error fetching medicines:', error);
    res.status(500).json({ message: 'Server error fetching medicines' });
  }
});

app.post('/api/orders', authenticateToken, async (req, res) => {
  try {
    const { items, totalAmount, deliveryAddress, orderType } = req.body;
    const userId = req.user.userId;

    // Insert order
    const newOrder = await pool.query(
      `INSERT INTO orders (user_id, order_type, total_amount, delivery_address, status, created_at) 
       VALUES ($1, $2, $3, $4, 'processing', NOW()) 
       RETURNING *`,
      [userId, orderType, totalAmount, deliveryAddress]
    );

    const orderId = newOrder.rows[0].order_id;

    // Insert order items
    for (const item of items) {
      await pool.query(
        'INSERT INTO order_items (order_id, medicine_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [orderId, item.medicineId, item.quantity, item.price]
      );
    }

    res.status(201).json({
      message: 'Order placed successfully',
      order: newOrder.rows[0]
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Server error placing order' });
  }
});

// Test Reports Routes
app.get('/api/reports/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    const reports = await pool.query(
      `SELECT tr.*, u.first_name as doctor_first_name, u.last_name as doctor_last_name
       FROM test_reports tr
       LEFT JOIN users u ON tr.doctor_id = u.user_id
       WHERE tr.patient_id = $1
       ORDER BY tr.test_date DESC`,
      [userId]
    );

    res.json(reports.rows);
  } catch (error) {
    console.error('Error fetching test reports:', error);
    res.status(500).json({ message: 'Server error fetching test reports' });
  }
});

// Dashboard Stats Routes
app.get('/api/dashboard/stats/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const userType = req.user.userType;

    if (userType === 'patient') {
      const stats = await pool.query(`
        SELECT 
          (SELECT COUNT(*) FROM appointments WHERE patient_id = $1 AND appointment_date >= CURRENT_DATE) as upcoming_appointments,
          (SELECT COUNT(*) FROM orders WHERE user_id = $1 AND status = 'active') as active_prescriptions,
          (SELECT COUNT(*) FROM test_reports WHERE patient_id = $1) as total_reports,
          (SELECT COUNT(*) FROM appointments WHERE patient_id = $1 AND appointment_type = 'home_visit') as home_visits
      `, [userId]);
      
      res.json(stats.rows[0]);
    } else if (userType === 'doctor') {
      const stats = await pool.query(`
        SELECT 
          (SELECT COUNT(*) FROM appointments a JOIN doctors d ON a.doctor_id = d.doctor_id WHERE d.user_id = $1 AND a.appointment_date = CURRENT_DATE) as today_appointments,
          (SELECT COUNT(DISTINCT a.patient_id) FROM appointments a JOIN doctors d ON a.doctor_id = d.doctor_id WHERE d.user_id = $1) as total_patients,
          (SELECT COALESCE(SUM(d.fee), 0) FROM appointments a JOIN doctors d ON a.doctor_id = d.doctor_id WHERE d.user_id = $1 AND EXTRACT(MONTH FROM a.appointment_date) = EXTRACT(MONTH FROM CURRENT_DATE)) as monthly_earnings,
          (SELECT COALESCE(AVG(d.rating), 0) FROM doctors d WHERE d.user_id = $1) as rating
      `, [userId]);
      
      res.json(stats.rows[0]);
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error fetching dashboard stats' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});