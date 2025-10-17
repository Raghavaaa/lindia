import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const timestamp = new Date().toISOString();
    const uptime = process.uptime();
    
    // Check critical environment variables
    const hasDeepSeekKey = !!process.env.DEEPSEEK_API_KEY;
    
    const health = {
      status: 'healthy',
      timestamp,
      uptime: Math.floor(uptime),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      services: {
        deepseek: hasDeepSeekKey ? 'configured' : 'not-configured',
      },
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        unit: 'MB'
      }
    };

    console.log(`[Health Check] Status: ${health.status}, Uptime: ${uptime}s`);
    
    return NextResponse.json(health, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    });
  } catch (error) {
    console.error('[Health Check] Error:', error);
    return NextResponse.json(
      { 
        status: 'unhealthy',
        error: 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
