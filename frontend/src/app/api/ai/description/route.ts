import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const body = await req.json();

  try {
    const response = await fetch(`${baseUrl}/ai/description`, {
      headers: {
        'Content-Type': `application/json`,
      },
      method: 'POST',
      body: JSON.stringify(body),
    });

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}
