import { BASE_URL } from '@/lib/constants/service';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const idToken = cookieStore.get('idToken')?.value;

  try {
    const formData = await req.formData();

    const response = await fetch(`${BASE_URL}/users`, {
      headers: {
        Cookie: `idToken=${idToken};`,
      },
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    const setCookieHeader = response.headers.get('set-cookie');

    const result = await response.json();

    const resWithCookie = NextResponse.json(result);
    if (setCookieHeader) {
      resWithCookie.headers.set('Set-Cookie', setCookieHeader);
    }

    return resWithCookie;
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}
