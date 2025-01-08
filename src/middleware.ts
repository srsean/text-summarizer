import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./helpers/session";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const protectedRoutes = ["/", "/history"];
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentPath);

  if (isProtectedRoute) {
    const cookie = cookies().get("session")?.value;
    if (!cookie) {
      return NextResponse.redirect(new URL("/login", request.nextUrl).toString());
    }
    const session = await decrypt(cookie);

    if (!session?.user) {
      return NextResponse.redirect(new URL("/login", request.nextUrl).toString());
    }
  } else if (currentPath === "/login") {
    const cookie = cookies().get("session")?.value;
    if (cookie) {
      const session = await decrypt(cookie);
      if (session?.user) {
        return NextResponse.redirect(new URL("/", request.nextUrl).toString());
      }
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
