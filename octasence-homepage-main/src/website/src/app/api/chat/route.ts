import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required.' },
        { status: 400 },
      );
    }

    const apiKey = process.env.VECTORSHIFT_API_KEY;
    if (!apiKey) {
      console.error('VECTORSHIFT_API_KEY is not set');
      return NextResponse.json(
        { error: 'Server configuration error.' },
        { status: 500 },
      );
    }

    // VectorShift requires multipart/form-data.
    // Use FormData so the runtime sets the correct Content-Type + boundary.
    const formData = new FormData();
    formData.append('inputs', JSON.stringify({ input_0: message }));

    const vsResponse = await fetch(
      'https://api.vectorshift.ai/v1/pipeline/69b92bdfb48bbfced70c0fac/run',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
      },
    );

    if (!vsResponse.ok) {
      const errorText = await vsResponse.text();
      console.error('VectorShift API error:', vsResponse.status, errorText);
      return NextResponse.json(
        { error: `Pipeline error: ${vsResponse.status}` },
        { status: vsResponse.status },
      );
    }

    const data = await vsResponse.json();

    // VectorShift returns { outputs: { output_0: "...", ... } }
    const outputText: string =
      data?.outputs?.output_0 ??
      (Object.values(data?.outputs ?? {}) as string[])[0] ??
      data?.output ??
      data?.result ??
      "I'm sorry, I couldn't generate a response. Please try again.";

    return NextResponse.json({ reply: String(outputText) });
  } catch (err) {
    console.error('Chat API route error:', err);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 },
    );
  }
}
