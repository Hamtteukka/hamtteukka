import { NextRequest } from 'next/server';
import { BASE_URL } from '@/lib/constants/service';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.code) {
      return new Response('카카오 인가 코드가 필요합니다.', {
        status: 400,
      });
    }

    const result = await fetch(`${BASE_URL}/auth/kakao`, {
      method: 'POST',
      body,
    }).then((res) => res.json());

    revalidatePath(result.url);
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}
