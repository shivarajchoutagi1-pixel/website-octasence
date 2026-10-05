import mysql, { Pool } from 'mysql2/promise';

const DEFAULT_MYSQL_PORT = 3306;

declare global {
  var contactDbPool: Pool | undefined;
}

export class ContactDbConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContactDbConfigError';
  }
}

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new ContactDbConfigError(
      `Missing required environment variable: ${name}`,
    );
  }

  return value;
}

export function getContactDbPool(): Pool {
  if (global.contactDbPool) {
    return global.contactDbPool;
  }

  global.contactDbPool = mysql.createPool({
    host: getRequiredEnv('MYSQL_HOST'),
    port: Number(process.env.MYSQL_PORT || DEFAULT_MYSQL_PORT),
    user: getRequiredEnv('MYSQL_USER'),
    password: getRequiredEnv('MYSQL_PASSWORD'),
    database: getRequiredEnv('MYSQL_DATABASE'),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return global.contactDbPool;
}

export async function ensureContactSubmissionsTable(pool: Pool) {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id CHAR(36) NOT NULL PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NULL,
      message TEXT NOT NULL,
      category VARCHAR(100) NOT NULL DEFAULT 'general',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export async function ensureEventRegistrationsTable(pool: Pool) {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS event_registrations (
      id CHAR(36) NOT NULL PRIMARY KEY,
      event_name VARCHAR(255) NOT NULL,
      event_date VARCHAR(100) NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      status ENUM('Student', 'Employee') NOT NULL,
      org_name VARCHAR(255) NOT NULL,
      role_or_job VARCHAR(255) NOT NULL,
      specialization VARCHAR(255) NULL,
      college_name VARCHAR(255) NULL,
      pass_out_year VARCHAR(50) NULL,
      city VARCHAR(100) NOT NULL,
      state VARCHAR(100) NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
}
