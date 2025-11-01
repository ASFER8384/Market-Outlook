import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/", "/login", "/signup"];

const isPublicPath = (path) => PUBLIC_PATHS.includes(path);

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("userToken");

  const isPathPublic = isPublicPath(path);

  if (!token) {
    if (!isPathPublic) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (isPathPublic && path !== "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
