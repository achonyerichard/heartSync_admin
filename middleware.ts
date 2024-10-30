import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export function middleware(request: NextRequest) {
  const loggedIn = request.cookies.has("token");
  const role = request.cookies.get("heartsyncRole")!;


  const auth = ["/login"];

  const ROUTE_PROTECTOR: {
    [key: string]: { routes: string[]; redirect: string };
  } = {
    marketer: {
      routes: [
        "/store",
        "/marketplace",
        "/orders",
        "/marketplace/create-product",
      ],
      redirect: "/marketplace",
    },
    moderator: { routes: ["", ""], redirect: "" },
    admin: { routes: ["", ""], redirect: "" },
    super_admin: {
      routes: [
        "/store",
        "/marketplace",
        "/orders",
        "/marketplace/create-product",
        "/category",
        "/membership",
        "/membership/add",
        "/overview",
        "/reports",
        "/roles",
        "/settings",
        "/store",
        "/users",
      ],
      redirect: "/overview",
    },
  };

  if (loggedIn) {
    if (
      auth.includes(request.nextUrl.pathname) ||
      request.nextUrl.pathname === "/" ||
      (role &&
        !ROUTE_PROTECTOR[role.value].routes.some((route) =>
          request.nextUrl.pathname.includes(route),
        ))
    ) {
      return NextResponse.redirect(
        new URL(ROUTE_PROTECTOR[role?.value!].redirect, request.url),
      );
    }
    return;
  } else if (!loggedIn) {
    if (!auth.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}
