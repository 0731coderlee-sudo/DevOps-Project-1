import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const backendUrl = process.env.BACKEND_URL || 'http://backend:5000';
    const response = await fetch(`${backendUrl}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { status: 'offline', message: 'Backend unreachable' },
        { status: 503 }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      status: 'online',
      backend: data,
    });
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      { status: 'offline', message: 'Backend connection failed' },
      { status: 503 }
    );
  }
}
