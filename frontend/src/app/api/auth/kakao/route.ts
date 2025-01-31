import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/constants/service';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(`${BASE_URL}/auth/kakao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });

    const setCookieHeader = response.headers.get('set-cookie');

    const result = await response.json();

    const resWithCookie = NextResponse.json(result);
    if (setCookieHeader) {
      resWithCookie.headers.set('Set-Cookie', setCookieHeader);
    }

    return resWithCookie;
  } catch (error) {
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}
