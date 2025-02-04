import { BASE_URL } from '@/lib/constants/service';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ sessionId: string }> }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  try {
    const sessionId = (await params).sessionId;

    const response = await fetch(`${BASE_URL}/openvidu/sessions/${sessionId}/connections`, {
      headers: {
        Cookie: `accessToken=${accessToken};refreshToken=${refreshToken};`,
      },
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
