import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  if (pathname === "/") {
    if (token) {
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
        /* @ts-ignore */
      } else if (/^user/.test(role)) {
        return NextResponse.redirect(new URL("/user", request.url));
      }
    }

    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/user")) {
    /* @ts-ignore */
    if (!/^user/.test(role)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/"],
};
