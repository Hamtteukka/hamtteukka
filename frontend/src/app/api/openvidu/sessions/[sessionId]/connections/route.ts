import { BASE_URL } from '@/lib/constants/service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ sessionId: string }> }) {
  try {
    const sessionId = (await params).sessionId;
    const response = await fetch(`${BASE_URL}/sessions/${sessionId}/connections`, {
      cache: 'no-store',
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
