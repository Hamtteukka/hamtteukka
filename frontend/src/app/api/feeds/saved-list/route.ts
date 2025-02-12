import { BASE_URL } from '@/lib/constants/service';
import { getAuthCookies } from '@/util/cookies';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const cursorId = req.nextUrl.searchParams.get('cursorId') ?? '';
    const limit = req.nextUrl.searchParams.get('limit') ?? '';

    const params = new URLSearchParams({
      cursor: cursorId,
      limit,
    });

    const cookiesHeader = getAuthCookies();
    if (!cookiesHeader) {
      throw new Error('Unauthorized: Missing cookies');
    }

    const result = await fetch(`${BASE_URL}/feeds/saved-list?${params}`, {
      headers: {
        Cookie: cookiesHeader,
      },
      cache: 'no-store',
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
