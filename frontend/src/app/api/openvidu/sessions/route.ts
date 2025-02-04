import { BASE_URL } from '@/lib/constants/service';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  try {
    const formData = await request.formData();

    const response = await fetch(`${BASE_URL}/openvidu/sessions`, {
      headers: {
        Cookie: `accessToken=${accessToken};refreshToken=${refreshToken};`,
      },
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}
