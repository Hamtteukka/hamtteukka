import { BASE_URL } from '@/lib/constants/service';
import { getAuthCookies } from '@/util/cookies';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

/**
 * 특정 게시물 조회
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const feedId = params.id;

    const cookiesHeader = getAuthCookies();
    if (!cookiesHeader) {
      throw new Error('Unauthorized: Missing cookies');
    }

    const result = await fetch(`${BASE_URL}/feeds/${feedId}`, {
      headers: {
        Cookie: cookiesHeader,
      },
      credentials: 'same-origin',
    });

    const data = await result.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      status: 'fail',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
}

/**
 * 특정 게시물 삭제
 */
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ feedId: string }> }) {
  try {
    const feedId = (await params).feedId;

    // 쿠키 헤더 가져오기
    const cookiesHeader = getAuthCookies();
    if (!cookiesHeader) {
      throw new Error('Unauthorized: Missing cookies');
    }

    const response = await fetch(`${BASE_URL}/feeds/${feedId}`, {
      headers: {
        Cookie: cookiesHeader,
      },
      method: 'DELETE',
      credentials: 'same-origin',
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
