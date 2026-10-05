import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

function redactHost(host?: string) {
  if (!host) {
    return null;
  }

  return host.trim();
}

export async function GET() {
  return NextResponse.json({
    success: true,
    config: {
      host: redactHost(process.env.MYSQL_HOST),
      port: process.env.MYSQL_PORT || null,
      database: process.env.MYSQL_DATABASE || null,
      hasUser: Boolean(process.env.MYSQL_USER),
      hasPassword: Boolean(process.env.MYSQL_PASSWORD),
    },
  });
}
