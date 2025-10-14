import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Return mock clients data for now
    const clients = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91 9876543210',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Jane Smith', 
        email: 'jane@example.com',
        phone: '+91 9876543211',
        createdAt: new Date().toISOString()
      }
    ];

    return NextResponse.json({ clients });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone } = body;

    // Mock client creation
    const newClient = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      phone,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ client: newClient }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create client' },
      { status: 500 }
    );
  }
}