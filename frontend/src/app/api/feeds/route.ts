import { BASE_URL } from '@/lib/constants/service';
import { getAuthCookies } from '@/util/cookies';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const cursorId = req.nextUrl.searchParams.get('cursorId') ?? '';
    const limit = req.nextUrl.searchParams.get('limit') ?? '';

    const params = new URLSearchParams({
      cursorId,
      limit,
    });

    const cookiesHeader = getAuthCookies();
    if (!cookiesHeader) {
      throw new Error('Unauthorized: Missing cookies');
    }

    // TODO: 엔드포인트 변경
    const result = await fetch(`${BASE_URL}/feeds/saved-list?${params}`, {
      headers: {
        Cookie: cookiesHeader,
      },
      cache: 'no-store',
      credentials: 'include',
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}
