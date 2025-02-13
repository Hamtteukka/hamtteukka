import { BASE_URL } from '@/lib/constants/service';
import { getAuthCookies } from '@/util/cookies';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const cookiesHeader = getAuthCookies();
    if (!cookiesHeader) {
      throw new Error('Unauthorized: Missing cookies');
    }

    const response = await fetch(`${BASE_URL}/users/subscribe`, {
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
    return NextResponse.json({
      status: 'fail',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();

    const cookiesHeader = getAuthCookies();
    if (!cookiesHeader) {
      throw new Error('Unauthorized: Missing cookies');
    }

    const response = await fetch(`${BASE_URL}/users/subscribe`, {
      headers: {
        Cookie: cookiesHeader,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify(body),
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
