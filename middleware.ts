import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_PAGE_ROUTES = ["/auth"];
const PUBLIC_API_ROUTES = ["/api/auth/:path*"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Use getToken to retrieve and verify the token JWT from cookies
  const token = await getToken({ req });

  // Check if the route is a public api route
  if (PUBLIC_API_ROUTES.some(route => path.startsWith(route.replace(":path*", "")))) {
    return NextResponse.next();
  }

  // Check if the route is a public page route
  if (PUBLIC_PAGE_ROUTES.includes(path)) {
    // Redirect authenticated users away from the /auth page
    if (token) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
    return NextResponse.next();
  }

  // Protected API routes
  if (path.startsWith("/api") && !token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Protected page routes
  if (!path.startsWith("/api") && !token) {
    return NextResponse.redirect(new URL("/auth", req.nextUrl));
  }

  return NextResponse.next();
}

// Config defines the routes that the middleware should run on
export const config = {
  matcher: [
    // Match all API routes
    "/api/:path*",
    // Match all page routes except for static assets, public files, and favicon
    "/((?!_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.ico$).*)",
  ],
};
