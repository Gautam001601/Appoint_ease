import 'dotenv/config';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupDatabase() {
  const dbName = process.env.DB_NAME || 'appointease';
  
  // This pool is to connect to the 'postgres' database to create 'appointease'
  const pool = new Pool({
    user: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: 'postgres',
    password: '@project2025',
    port: process.env.DB_PORT || 5432,
  });

  try {
    console.log('Setting up Appoint Ease database...');

    // We only create the database if it doesn't already exist
    const client = await pool.connect();
    const result = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
    
    if (result.rowCount === 0) {
      console.log(`Creating database '${dbName}'...`);
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database '${dbName}' created successfully.`);
    } else {
      console.log(`Database '${dbName}' already exists. Skipping creation.`);
    }

    client.release();
    await pool.end();

    // Now, connect to the new database to set up the schema
    const appPool = new Pool({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: dbName,
      password: process.env.DB_PASSWORD || 'password',
      port: process.env.DB_PORT || 5432,
    });
    
    const appClient = await appPool.connect();
    
    // Read and execute schema
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    await appClient.query(schema);
    console.log('Database schema created successfully.');
    
    appClient.release();
    await appPool.end();
    
    console.log('Database setup completed!');
    
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();