import { BASE_URL } from '@/lib/constants/service';
import { getAuthCookies } from '@/util/cookies';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const cookiesHeader = getAuthCookies();
    if (!cookiesHeader) {
      throw new Error('Unauthorized: Missing cookies');
    }

    const response = await fetch(`${BASE_URL}/users/subscription`, {
      headers: {
        Cookie: cookiesHeader,
      },
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
