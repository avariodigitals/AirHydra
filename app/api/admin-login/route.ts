import { NextRequest, NextResponse } from "next/server";
import { createAdminToken } from "@/lib/adminToken";

export async function POST(request: NextRequest) {
  const { password } = await request.json().catch(() => ({}));

  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminKey = process.env.ADMIN_KEY;

  if (!adminPassword || !adminKey) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  if (password !== adminPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = await createAdminToken(adminKey);

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
