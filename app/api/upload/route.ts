import { NextRequest, NextResponse } from "next/server";

function getImageKitCredentials() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!privateKey) return null;
  return Buffer.from(`${privateKey}:`).toString("base64");
}

function isImageKitUrl(value: string) {
  return value.startsWith("https://ik.imagekit.io/");
}

function getPathFromImageKitUrl(imageUrl: string) {
  try {
    const parsed = new URL(imageUrl);
    return parsed.pathname.replace(/^\/+/, "");
  } catch {
    return "";
  }
}

async function resolveFileIdFromUrl(imageUrl: string, credentials: string) {
  if (!isImageKitUrl(imageUrl)) return null;

  const filePath = getPathFromImageKitUrl(imageUrl);
  if (!filePath) return null;

  const folderPath = `/${filePath.split("/").slice(0, -1).join("/")}`;
  const fileName = filePath.split("/").pop();

  const listRes = await fetch(`https://api.imagekit.io/v1/files?path=${encodeURIComponent(folderPath)}`, {
    headers: { Authorization: `Basic ${credentials}` },
  });

  if (!listRes.ok) return null;

  const files = await listRes.json();
  const match = Array.isArray(files)
    ? files.find((file: any) => file.filePath === `/${filePath}` || file.name === fileName || file.url === imageUrl)
    : null;

  return match?.fileId ?? null;
}

async function deleteImageKitAsset(identifier: string, credentials: string) {
  if (!identifier) return false;

  const res = await fetch(`https://api.imagekit.io/v1/files/${encodeURIComponent(identifier)}`, {
    method: "DELETE",
    headers: { Authorization: `Basic ${credentials}` },
  });

  return res.ok;
}

export async function DELETE(request: NextRequest) {
  try {
    const { fileId } = await request.json();
    if (!fileId) return NextResponse.json({ ok: true });
    const credentials = getImageKitCredentials();
    if (!credentials) return NextResponse.json({ ok: true });
    await deleteImageKitAsset(fileId, credentials);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}

export async function POST(request: NextRequest) {
  try {
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "/airhydra";
    const previousUrl = (formData.get("previousUrl") as string) || "";
    const previousFileId = (formData.get("previousFileId") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const credentials = getImageKitCredentials();
    if (!credentials) {
      return NextResponse.json({ error: "ImageKit not configured" }, { status: 500 });
    }

    const ikForm = new FormData();
    ikForm.append("file", file);
    ikForm.append("fileName", file.name);
    ikForm.append("folder", folder);

    const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
      method: "POST",
      headers: { Authorization: `Basic ${credentials}` },
      body: ikForm,
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message || "Upload failed" }, { status: res.status });
    }

    const uploadedFileId = data.fileId as string | undefined;
    const assetToDelete = previousFileId || (previousUrl ? await resolveFileIdFromUrl(previousUrl, credentials) : null);

    if (assetToDelete && assetToDelete !== uploadedFileId) {
      await deleteImageKitAsset(assetToDelete, credentials);
    }

    return NextResponse.json({ url: data.url, fileId: data.fileId });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
