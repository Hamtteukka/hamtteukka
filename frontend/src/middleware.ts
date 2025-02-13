import { KAKAO_AUTHORIZE_URL } from '@/lib/constants/service';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const currentUrl = request.nextUrl.href;

  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  // KAKAO_AUTHORIZE_URL로 리디렉션 중일 경우 리디렉션을 피함
  if (currentUrl.includes(KAKAO_AUTHORIZE_URL)) {
    return NextResponse.next();
  }

  // '/auth' 또는 '/' 경로는 리디렉션하지 않음
  if (request.nextUrl.pathname === '/' || request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.next();
  }

  // 액세스 토큰이 없고, 경로가 '/' 또는 '/auth'가 아닌 경우 리디렉션
  if (!accessToken) {
    return NextResponse.redirect(new URL(KAKAO_AUTHORIZE_URL, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 다음으로 시작하는 경로를 제외한 모든 요청 경로를 매칭합니다:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     * - mockServiceWorker, image, logo, svg
     */
    '/((?!api|_next/static|_next/image|favicon.ico|mockServiceWorker|image|logo|svg).*)',
  ],
};
