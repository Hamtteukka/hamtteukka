import { BASE_URL } from '@/lib/constants/service';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const response = await fetch(`${BASE_URL}/ai/dot`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}
