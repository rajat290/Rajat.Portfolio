import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export default auth((req: NextRequest) => {
  const isAuthenticated = !!req.auth;
  const { pathname } = req.nextUrl;

  const isPublicRoute =
    pathname.startsWith("/auth") ||
    pathname.startsWith("/api/health") ||
    pathname === "/";

  if (!isAuthenticated && !isPublicRoute) {
    const signInUrl = new URL("/auth/sign-in", req.url);
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (isAuthenticated && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/builder/:path*",
    "/settings/:path*",
    "/auth/:path*"
  ]
};


