import { BASE_URL } from '@/lib/constants/service';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthCookies } from '@/util/cookies';

export async function POST(request: NextRequest) {
  const cookiesHeader = getAuthCookies();
  if (!cookiesHeader) {
    throw new Error('Unauthorized: Missing cookies');
  }

  try {
    const body = await request.json();

    // 클라이언트에 저장된 쿠키를 가지고 요청
    const response = await fetch(`${BASE_URL}/feeds/pattern`, {
      headers: {
        Cookie: cookiesHeader,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
      credentials: 'include',
    });

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 'fail',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
}
