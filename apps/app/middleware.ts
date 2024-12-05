import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "@repo/auth";
import { NextResponse, type NextRequest } from "next/server";
const baseDomain =
  process.env.NODE_ENV === "production"
    ? "https://api.plura.pro"
    : "http://localhost:3001";
const redirectUrl =
  process.env.NODE_ENV === "production"
    ? "https://www.plura.pro/auth"
    : "http://localhost:3003/auth";
const appDomain = process.env.NODE_ENV === "production" ? "https://app.plura.pro" : "http://localhost:3002";

export default async function authMiddleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    `${baseDomain}/api/auth/get-session`,
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );
  // console.log("seesion mid", session);

  if (!session) {
    console.log("redirecting to sign in");
    return NextResponse.redirect(redirectUrl);
  }
  const currentPath = request.nextUrl.pathname;


  if (!currentPath.startsWith("/onboarding") && !session.user.isOnboarding) {
    return NextResponse.redirect(`${appDomain}/onboarding`);
  }
  if (currentPath.startsWith("/onboarding") && session.user.isOnboarding) {
    return NextResponse.redirect(`${appDomain}/home`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
};
