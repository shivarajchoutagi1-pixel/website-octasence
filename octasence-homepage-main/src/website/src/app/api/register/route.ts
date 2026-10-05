import { NextRequest, NextResponse } from 'next/server';
import { getContactDbPool, ensureEventRegistrationsTable } from '@/lib/contactDb';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      eventName,
      eventDate,
      fullName,
      email,
      phone,
      status,
      orgName,
      roleOrJob,
      specialization,
      collegeName,
      passOutYear,
      city,
      state
    } = data;

    const pool = getContactDbPool();
    await ensureEventRegistrationsTable(pool);

    const id = crypto.randomUUID();

    const [result] = await pool.execute(
      `INSERT INTO event_registrations (
        id, event_name, event_date, full_name, email, phone, status, org_name, role_or_job, specialization, college_name, pass_out_year, city, state
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        eventName,
        eventDate,
        fullName,
        email,
        phone,
        status,
        orgName,
        roleOrJob,
        specialization || null,
        collegeName || null,
        passOutYear || null,
        city,
        state
      ]
    );

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
