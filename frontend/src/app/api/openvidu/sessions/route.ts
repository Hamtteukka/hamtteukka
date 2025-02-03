import { BASE_URL } from '@/lib/constants/service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const response = await fetch(`${BASE_URL}/openvidu/sessions`, {
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
