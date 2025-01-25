import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value; // قراءة التوكين من الكوكيز
  const role = request.cookies.get("role")?.value; // قراءة الرول من الكوكيز

  // إذا كان المستخدم في الصفحة الرئيسية
  if (pathname === "/") {
    if (token) {
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
        /* @ts-ignore */
      } else if (/^user/.test(role)) {
        // التحقق مما إذا كانت الـ role تبدأ بـ "user"
        return NextResponse.redirect(new URL("/user", request.url));
      }
    }
    // إذا لم يكن هناك توكن، يبقى في الصفحة الرئيسية
    return NextResponse.next();
  }

  // إذا لم يكن هناك توكن، إعادة التوجيه للصفحة الرئيسية
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // حماية مسارات admin/*
  if (pathname.startsWith("/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // حماية مسارات user/*
  if (pathname.startsWith("/user")) {
    /* @ts-ignore */
    if (!/^user/.test(role)) {
      // التحقق مما إذا كانت الـ role تبدأ بـ "user"
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next(); // استمر في الطلب إذا كان كل شيء صحيحًا
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/"],
};

