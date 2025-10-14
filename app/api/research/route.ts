import { NextRequest, NextResponse } from 'next/server';

async function callDeepSeek(query: string) {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) return "";
  
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
      }),
    });
    
    if (!res.ok) return "";
    const data: any = await res.json().catch(() => ({}));
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content || "";
    }
    return "";
  } catch (error) {
    console.error("DeepSeek API error:", error);
    return "";
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, clientName, save } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const result = await callDeepSeek(query.trim());
    
    if (!result) {
      return NextResponse.json(
        { error: 'Failed to generate response' },
        { status: 500 }
      );
    }

    // For now, just return the result without saving
    // TODO: Implement saving functionality when database is set up
    if (save && clientName) {
      console.log(`Would save research for client: ${clientName}`);
    }

    return NextResponse.json({ 
      result: result.trim(),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Research API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}