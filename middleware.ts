import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export function middleware(request: NextRequest) {
  const loggedIn = request.cookies.has("isLoggedIn");

  const auth = ["/login"];

  if (loggedIn && auth.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/overview", request.url));
  } else if (!loggedIn && !auth.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (!loggedIn && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (loggedIn && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/overview", request.url));
  }
  return NextResponse.next();
}
