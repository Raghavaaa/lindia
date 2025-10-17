import { NextRequest, NextResponse } from 'next/server';

// Logging utility
function logRequest(method: string, path: string, status: number, duration: number) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${method} ${path} - ${status} - ${duration}ms`);
}

async function callDeepSeek(query: string) {
  const key = process.env.DEEPSEEK_API_KEY;
  
  if (!key) {
    console.error('[DeepSeek] API key not configured');
    throw new Error('DeepSeek API key not configured');
  }
  
  try {
    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { 
            role: "system", 
            content: `You are an expert Indian legal research assistant. Provide comprehensive, accurate, and practical legal guidance for Indian law.

For any legal query, include:
1. Relevant Indian laws, acts, and sections
2. Recent case law and precedents
3. Practical steps and procedures
4. Important considerations and warnings
5. References to specific legal provisions

Be specific, cite relevant laws, and provide actionable advice. Focus on Indian legal system, courts, and procedures.` 
          },
          { role: "user", content: query },
        ],
        temperature: 0.3,
        max_tokens: 4000,
      }),
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[DeepSeek] API error: ${res.status} - ${errorText}`);
      throw new Error(`DeepSeek API returned ${res.status}`);
    }
    
    const data: any = await res.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content || "";
    }
    
    console.error('[DeepSeek] Unexpected response format:', data);
    throw new Error('Unexpected response format from DeepSeek');
    
  } catch (error) {
    console.error("[DeepSeek] Error:", error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  
  try {
    const body = await req.json();
    const { query } = body;

    // Validation
    if (!query || typeof query !== 'string') {
      logRequest('POST', '/api/simple-research', 400, Date.now() - startTime);
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      );
    }

    if (query.trim().length === 0) {
      logRequest('POST', '/api/simple-research', 400, Date.now() - startTime);
      return NextResponse.json(
        { error: 'Query cannot be empty' },
        { status: 400 }
      );
    }

    if (query.length > 5000) {
      logRequest('POST', '/api/simple-research', 400, Date.now() - startTime);
      return NextResponse.json(
        { error: 'Query too long (max 5000 characters)' },
        { status: 400 }
      );
    }

    console.log(`[Simple Research] Processing query (${query.length} chars)`);

    const result = await callDeepSeek(query.trim());
    
    if (!result) {
      logRequest('POST', '/api/simple-research', 500, Date.now() - startTime);
      return NextResponse.json(
        { error: 'Failed to generate response - empty result' },
        { status: 500 }
      );
    }

    logRequest('POST', '/api/simple-research', 200, Date.now() - startTime);
    return NextResponse.json({ 
      result: result.trim(),
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('[Simple Research] Error:', error);
    logRequest('POST', '/api/simple-research', 500, duration);
    
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    const isConfigError = errorMessage.includes('not configured');
    
    return NextResponse.json(
      { 
        error: isConfigError ? 'Service not properly configured' : 'Failed to process request',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}
