import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";

export async function GET() {
  const content = getContent();
  return NextResponse.json(content);
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.NEXT_PUBLIC_ADMIN_KEY}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await request.json();
    saveContent(json);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
