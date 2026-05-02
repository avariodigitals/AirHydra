// Uses Web Crypto (SubtleCrypto) — compatible with Edge Runtime AND Node.js

async function hmacSign(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacVerify(payload: string, secret: string, sig: string): Promise<boolean> {
  const expected = await hmacSign(payload, secret);
  if (sig.length !== expected.length) return false;
  // Constant-time comparison
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  }
  return diff === 0;
}

export async function createAdminToken(secret: string): Promise<string> {
  const ts = Date.now().toString();
  const sig = await hmacSign(`airhydra-admin:${ts}`, secret);
  return `airhydra-admin:${ts}:${sig}`;
}

export async function isValidAdminToken(token: string, secret: string): Promise<boolean> {
  try {
    const parts = token.split(":");
    if (parts.length !== 3) return false;
    const [prefix, ts, sig] = parts;
    if (prefix !== "airhydra-admin") return false;
    const tsNum = parseInt(ts, 10);
    if (isNaN(tsNum) || Date.now() - tsNum > 8 * 60 * 60 * 1000) return false;
    return await hmacVerify(`airhydra-admin:${ts}`, secret, sig);
  } catch {
    return false;
  }
}
