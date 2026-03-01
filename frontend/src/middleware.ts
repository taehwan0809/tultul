// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';



export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  if (!token) {
    // 주소 뒤에 메시지 정보를 붙여서 보냅니다.
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('message', 'login_required'); 
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/post/:path*','/select/:path*','/chat/:path*','/garden/:path*'],
};