import { NextRequest, NextResponse } from "next/server";
import { isValidAdminToken } from "@/lib/adminToken";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
    const token = request.cookies.get("admin_token")?.value;
    const adminKey = process.env.ADMIN_KEY;

    if (!adminKey || !token || !(await isValidAdminToken(token, adminKey))) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
