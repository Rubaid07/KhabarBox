import { NextRequest, NextResponse } from "next/server";

export function proxyLogic(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken =
    request.cookies.get("__Secure-better-auth.session_token")?.value ||
    request.cookies.get("better-auth.session_token")?.value;

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup");
  const protectedRoutes = ["/orders", "/cart", "/provider/dashboard", "/admin/dashboard"];
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (sessionToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!sessionToken && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}