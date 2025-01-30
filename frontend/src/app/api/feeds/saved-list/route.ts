import { BASE_URL } from '@/lib/constants/service';
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

    const result = await fetch(`${BASE_URL}/feeds/saved-list?${params}`, {
      cache: 'no-store',
      credentials: 'same-origin',
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}
