import { BASE_URL } from '@/lib/constants/service';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const cursorId = req.nextUrl.searchParams.get('cursorId') ?? '';
    const limit = req.nextUrl.searchParams.get('limit') ?? '';
    const keyword = req.nextUrl.searchParams.get('keyword') ?? '';
    const categoryIds = req.nextUrl.searchParams.get('categoryIds') ?? '';

    const params = new URLSearchParams({
      cursor: cursorId,
      limit,
    });

    if (keyword) {
      params.set('keyword', keyword);
    }

    if (categoryIds) {
      params.set('categoryIds', categoryIds);
    }

    const response = await fetch(`${BASE_URL}/feeds/search?${params}`, {
      cache: 'no-store',
      credentials: 'include',
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
