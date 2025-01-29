import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/constants/service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = await fetch(`${BASE_URL}/auth/kakao`, {
      method: 'POST',
      body,
    });

    const redirectUrl = result.headers.get('Location')!;

    return NextResponse.redirect(redirectUrl, { status: result.status });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}
