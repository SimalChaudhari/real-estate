import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl; // Get the current pathname
  const token = req.cookies.get("token"); // Get auth token from cookies


  // Routes accessible only to unauthenticated users
  const publicRoutes = ["/login", "/register"];

  // Check if the user is authenticated
  if (token) {
    // Redirect logged-in users trying to access public routes
    if (publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard-home", req.url));
    }
  } else {
    // Redirect unauthenticated users trying to access protected routes
    if (!publicRoutes.includes(pathname) && pathname.startsWith("/dashboard-")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next(); // Allow the request to proceed
}

export const config = {
    matcher: [
        "/:path*", // Apply middleware to all routes
        "/dashboard-user-view/:id*", // Allow dynamic routes for user view
      ],
};
