import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Mock user profile data
    const profile = {
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com',
      phone: '+91 9876543210',
      role: 'lawyer',
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ profile });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    // Mock profile update
    const updatedProfile = {
      id: '1',
      ...body,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({ profile: updatedProfile });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}