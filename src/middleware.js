import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();

  if (url.pathname === '/') {
    // url.pathname = '/home';
    url.pathname = '/category/see-more';
    return NextResponse.redirect(url);
  }
}
