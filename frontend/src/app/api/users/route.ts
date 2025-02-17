import { BASE_URL } from '@/lib/constants/service';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthCookies } from '@/util/cookies';

export async function PUT(request: NextRequest) {
  const cookiesHeader = getAuthCookies();
  if (!cookiesHeader) {
    throw new Error('Unauthorized: Missing cookies');
  }

  try {
    const formData = await request.formData();

    // 클라이언트에 저장된 쿠키를 가지고 요청
    const response = await fetch(`${BASE_URL}/users`, {
      headers: {
        Cookie: cookiesHeader,
      },
      method: 'PUT',
      body: formData,
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
    console.error(error);
    return NextResponse.json({
      status: 'fail',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
}
