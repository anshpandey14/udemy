import {
  clerkMiddleware,
  createRouteMatcher,
  clerkClient,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in",
  "/sign-up",
  "/api/webhook/register",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const { pathname } = req.nextUrl;

  // Redirect unauthenticated users
  if (!userId && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Authenticated user
  if (userId) {
    try {
      // ✅ Important: your version returns a function, so we must await it first
      const clerk = await clerkClient(); // <-- FIXED
      const user = await clerk.users.getUser(userId);

      const role = user.publicMetadata?.role as string | undefined;

      // Admin redirection
      if (role === "admin" && pathname === "/dashboard") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }

      // Block non-admins from admin routes
      if (role !== "admin" && pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      // Redirect logged-in users from public pages
      if (isPublicRoute(req)) {
        const redirectPath =
          role === "admin" ? "/admin/dashboard" : "/dashboard";
        return NextResponse.redirect(new URL(redirectPath, req.url));
      }
    } catch (error) {
      console.error("Error fetching Clerk user:", error);
      return NextResponse.redirect(new URL("/error", req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
