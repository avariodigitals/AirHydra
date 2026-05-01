import { NextRequest, NextResponse } from "next/server";
import { isValidAdminToken } from "@/lib/adminToken";
import { getContent, saveContent } from "@/lib/content";

export async function GET() {
  const content = getContent();
  return NextResponse.json(content);
}

export async function POST(request: NextRequest) {
  const adminKey = process.env.ADMIN_KEY;
  const token = request.cookies.get("admin_token")?.value;

  if (!adminKey || !token || !(await isValidAdminToken(token, adminKey))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await request.json();
    const required = ["hero", "productGallery", "problem", "benefits", "howItWorks", "lifestyle", "testimonials", "stores", "faqs", "finalCta", "settings"];
    if (!json || typeof json !== "object" || required.some((k) => !(k in json))) {
      return NextResponse.json({ error: "Invalid content shape" }, { status: 400 });
    }
    saveContent(json);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
