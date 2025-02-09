import { BASE_URL } from '@/lib/constants/service';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthCookies } from '@/util/cookies';

/**
 * 방 생성 API 요청
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // 쿠키 헤더 가져오기
    const cookiesHeader = getAuthCookies();
    if (!cookiesHeader) {
      throw new Error('Unauthorized: Missing cookies');
    }

    const response = await fetch(`${BASE_URL}/openvidu/sessions`, {
      headers: {
        Cookie: cookiesHeader,
      },
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({
      status: 'fail',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
}

/**
 * 방 목록 조회 API 요청
 */
export async function GET() {
  try {
    // 쿠키 헤더 가져오기
    const cookiesHeader = getAuthCookies();
    if (!cookiesHeader) {
      throw new Error('Unauthorized: Missing cookies');
    }

    const response = await fetch(`${BASE_URL}/openvidu/sessions`, {
      headers: {
        Cookie: cookiesHeader,
      },
      cache: 'no-store',
    });

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}
