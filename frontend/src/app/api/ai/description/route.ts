import { BASE_URL } from '@/lib/constants/service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const response = await fetch(`${BASE_URL}/ai/description`, {
      headers: {
        'Content-Type': `application/json`,
      },
      method: 'POST',
      body: JSON.stringify(body),
    });

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}
