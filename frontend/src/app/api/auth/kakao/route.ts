import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/constants/service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${BASE_URL}/auth/kakao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });

    // 쿠키를 꺼내서 클라이언트로 보내는 응답에 다시 삽입
    const cookieHeader = response.headers.get('set-cookie');

    const result = await response.json();

    const resWithCookie = NextResponse.json(result);

    if (cookieHeader) {
      resWithCookie.headers.set('Set-Cookie', cookieHeader);
    }

    return resWithCookie;
  } catch (error) {
    return NextResponse.json({
      status: 'fail',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
}
