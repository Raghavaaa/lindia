import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Return mock cases data for now
    const cases = [
      {
        id: '1',
        title: 'Property Dispute Case',
        status: 'active',
        clientName: 'John Doe',
        createdAt: new Date().toISOString()
      },
      {
        id: '2', 
        title: 'Contract Breach Case',
        status: 'pending',
        clientName: 'Jane Smith',
        createdAt: new Date().toISOString()
      }
    ];

    return NextResponse.json({ cases });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cases' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, clientName } = body;

    // Mock case creation
    const newCase = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      clientName,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ case: newCase }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create case' },
      { status: 500 }
    );
  }
}