# Appoint Ease - Healthcare Platform

A comprehensive healthcare platform built with React, TypeScript, Node.js, Express, and PostgreSQL.

## Features

- **User Authentication**: Login/Register for patients, doctors, and admins
- **Doctor Appointments**: Search and book appointments with doctors
- **Home Visits**: Request doctor home visits
- **Pharmacy**: Order medicines with fast delivery
- **Diagnostic Tests**: Book tests and get reports
- **Dashboard**: Role-based dashboards for different user types
- **Senior Citizen Discounts**: Special pricing for users 65+

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons
- Vite for build tooling

### Backend
- Node.js with Express
- PostgreSQL database
- JWT authentication
- bcryptjs for password hashing
- CORS enabled

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Clone and Install Dependencies
```bash
cd project
npm install
```

### 2. Database Setup
1. Make sure PostgreSQL is running on your system
2. Create a PostgreSQL user and database (or use existing ones)
3. Update the `.env` file with your database credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=appointease
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

4. Run the database setup script:
```bash
node server/setup-database.js
```

### 3. Start the Application

#### Development Mode (Frontend + Backend)
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend development server on http://localhost:5173

#### Backend Only
```bash
npm run server
```

#### Frontend Only
```bash
vite
```

### 4. Build for Production
```bash
npm run build
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Doctors
- `GET /api/doctors` - Get doctors list with filters
- `GET /api/doctors/:id` - Get doctor details

### Appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments/:userId` - Get user appointments

### Medicines & Orders
- `GET /api/medicines` - Get medicines list
- `POST /api/orders` - Place medicine order

### Reports
- `GET /api/reports/:userId` - Get user test reports

### Dashboard
- `GET /api/dashboard/stats/:userId` - Get dashboard statistics

## Database Schema

The application uses PostgreSQL with the following main tables:
- `users` - User accounts (patients, doctors, admins)
- `doctors` - Doctor-specific information
- `appointments` - Appointment bookings
- `medicines` - Medicine catalog
- `orders` - Medicine and test orders
- `test_reports` - Medical test reports
- `reviews` - Doctor reviews and ratings

## Features in Detail

### User Roles
1. **Patient**: Book appointments, order medicines, view reports
2. **Doctor**: Manage schedule, view patient appointments, earnings
3. **Admin**: System management (coming soon)

### Authentication System
- JWT-based authentication
- Role-based access control
- Secure password hashing with bcrypt
- Email and phone number login options

### Senior Citizen Benefits
- Automatic 20% discount for users 65+
- Special discount code: SENIOR20
- Priority booking and dedicated support

### Search & Filtering
- Doctor search by name, specialty, location
- Medicine search by name and category
- Advanced filtering options

## Environment Variables

Create a `.env` file in the project root:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=appointease
DB_USER=postgres
DB_PASSWORD=password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@appointease.com or call our 24/7 helpline: 1-800-EMERGENCY