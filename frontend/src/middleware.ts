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

// 4. 이 미들웨어를 적용할 경로 설정
export const config = {
  // 글쓰기 페이지(/post), 마이페이지(/mypage) 등 로그인이 필요한 경로만 지정
  matcher: ['/post/:path*','/select/:path*','/chat/:path*','/garden/:path*'],
};