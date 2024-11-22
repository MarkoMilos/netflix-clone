import {NextRequest, NextResponse} from 'next/server';
import {getToken} from 'next-auth/jwt';

// Public route, all other routes are protected
const publicRoute = '/auth';

// TODO refactor this to handle protected api routes as well
export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // 1. Use getToken to retrieve and verify the session JWT from cookies
    const session = await getToken({req});

    // 2. Redirect to /auth if the user is not authenticated and is trying to access any protected route
    if (path !== publicRoute && !session) {
        return NextResponse.redirect(new URL('/auth', req.nextUrl));
    }

    // 3. Redirect to root ("/") if the user is authenticated and tries to access the /auth page
    if (path === publicRoute && session) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
