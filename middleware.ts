import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export function middleware(request: NextRequest) {
  const loggedIn = request.cookies.has("token");
  const role = request.cookies.get("heartsyncRole")!;

  enum AdminRole {
    ADMIN = "admin",
    MODERATOR = "moderator",
    MARKETER = "marketer",
    SUPER_ADMIN = "super_admin",
  }

  const MARKETER_ROUTES = ["/store", "/marketplace", "/orders"];
  const MODERATOR_ROUTES = ["", "", ""];
  const ADMIN_ROUTES = ["", ""];
  const auth = ["/login"];

  const ROUTE_PROTECTOR: {
    [key: string]: { routes: string[]; redirect: string };
  } = {
    marketer: {
      routes: ["/store", "/marketplace", "/orders"],
      redirect: "/marketplace",
    },
    moderator: { routes: ["", ""], redirect: "" },
    admin: { routes: ["", ""], redirect: "" },
    super_admin: { routes: [], redirect: "" },
  };

  if (loggedIn) {
    if (
      auth.includes(request.nextUrl.pathname) ||
      request.nextUrl.pathname === "/" ||
      (role?.value !== AdminRole.SUPER_ADMIN &&
        !ROUTE_PROTECTOR[role?.value!].routes.includes(
          request.nextUrl.pathname,
        ))
    ) {
      return NextResponse.redirect(
        new URL(ROUTE_PROTECTOR[role?.value!].redirect, request.url),
      );
    } else if (
      role?.value === AdminRole.MARKETER &&
      !MARKETER_ROUTES.includes(request.nextUrl.pathname)
    ) {
      return NextResponse.redirect(new URL("/marketplace", request.url));
    }
    return;
  } else if (!loggedIn) {
    if (!auth.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}
