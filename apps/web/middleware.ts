import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Strip port for subdomain detection
  const hostWithoutPort = hostname.split(':')[0];

  // Detect if host starts with "doc." — handles:
  //   doc.localhost:30000, doc.stelltask.io, doc.192.168.1.100:30000
  const isDocSubdomain = hostWithoutPort.startsWith('doc.');

  if (isDocSubdomain) {
    url.pathname = `/docs${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
