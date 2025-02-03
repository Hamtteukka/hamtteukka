import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const formData = await req.formData();

    const response = await fetch(`${baseUrl}/ai/dot`, {
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
