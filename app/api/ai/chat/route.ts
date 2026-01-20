import { NextResponse } from 'next/server';

export const maxDuration = 60; // Allow longer timeout for AI generation

const SYSTEM_PROMPT = `
You are an expert DevOps engineer specializing in Oracle Cloud Infrastructure on ARM64 servers.
Generate production-ready, efficient, well-commented Python/bash code.
Use OCI SDK best practices, error handling, logging.
Output ONLY the code + minimal inline comments/explanation. No chit-chat.
Respond in English only.
`;

export async function POST(req: Request) {
  try {
    const { message, model } = await req.json();
    const ollamaUrl = process.env.OLLAMA_API_BASE || 'http://172.17.0.1:11434';

    // Format for Ollama /api/chat
    const payload = {
      model: model || "qwen2.5-coder:7b-instruct-q5_K_M",
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message }
      ],
      stream: false,
      options: {
        temperature: 0.2 // Low temp for code precision
      }
    };

    const res = await fetch(`${ollamaUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
        throw new Error(`Ollama API error: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json({ response: data.message?.content || "" });

  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
