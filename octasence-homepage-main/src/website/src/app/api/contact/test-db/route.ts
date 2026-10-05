import { NextResponse } from 'next/server';

import {
  ContactDbConfigError,
  ensureContactSubmissionsTable,
  getContactDbPool,
} from '@/lib/contactDb';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const pool = getContactDbPool();
    await pool.query('SELECT 1 AS connection_ok');
    await ensureContactSubmissionsTable(pool);

    return NextResponse.json({
      success: true,
      message: 'Database connection is healthy.',
      table: 'contact_submissions',
    });
  } catch (error) {
    console.error('Contact DB health check error:', error);

    if (error instanceof ContactDbConfigError) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Missing MySQL environment variables. Add MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, and MYSQL_DATABASE.',
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Database connection failed.',
      },
      { status: 500 },
    );
  }
}
