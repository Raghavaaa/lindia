import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Mock client data
    const client = {
      id,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      address: '123 Main Street, Mumbai, Maharashtra',
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ client });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch client' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Mock client update
    const updatedClient = {
      id,
      ...body,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({ client: updatedClient });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update client' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Mock client deletion
    return NextResponse.json({ 
      message: 'Client deleted successfully',
      id 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete client' },
      { status: 500 }
    );
  }
}