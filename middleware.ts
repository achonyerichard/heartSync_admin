import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AdminRole, MARKETER_ROUTES } from "./lib/Constants";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loggedIn = request.cookies.has("isLoggedIn");
  let role = request.cookies.get("heartsyncRole");
  console.log(
    "relax",
    role,
    pathname,
    MARKETER_ROUTES.includes(pathname.split("/")[1]),
    role?.value === AdminRole.SUPER_ADMIN,
  );
  const auth = ["/login"];

  if (loggedIn && auth.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/overview", request.url));
  } else if (!loggedIn && !auth.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (!loggedIn && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (loggedIn && request.nextUrl.pathname === "/") {
     if (
       role?.value === AdminRole.MARKETER &&
       !MARKETER_ROUTES.includes(pathname.split("/")[1])
     ) {
       return NextResponse.redirect(new URL("/marketplace", request.url));
     } else return NextResponse.redirect(new URL("/overview", request.url));
  }
  return NextResponse.next();
}
