import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./helpers/session";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const protectedRoutes = ["/", "/history"];
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentPath);

  // --- Handle guest mode (logout but stay on page)
  const guest = request.nextUrl.searchParams.get("guest");
  if (guest === "true") {
    const response = NextResponse.next();

    // Remove session cookie (logout)
    response.cookies.delete("session");

    return response; // Stay on same page (no redirect)
  }

  // --- Handle protected routes
  if (isProtectedRoute) {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("session")?.value;
    if (!cookie) {
      return NextResponse.redirect(
        new URL("/login", request.nextUrl).toString(),
      );
    }

    const session = await decrypt(cookie);
    if (!session?.user) {
      return NextResponse.redirect(
        new URL("/login", request.nextUrl).toString(),
      );
    }
  }

  // --- Handle login redirect for already-authenticated users
  if (currentPath === "/login") {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("session")?.value;
    if (cookie) {
      const session = await decrypt(cookie);
      if (session?.user) {
        return NextResponse.redirect(new URL("/", request.nextUrl).toString());
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
