import fs from "fs";
import path from "path";

const contentPath = path.join(process.cwd(), "data", "content.json");

let cache: { data: any; ts: number } | null = null;
const TTL = 5000; // 5s in-memory cache

export function getContent() {
  if (cache && Date.now() - cache.ts < TTL) return cache.data;
  if (fs.existsSync(contentPath)) {
    const data = JSON.parse(fs.readFileSync(contentPath, "utf8"));
    cache = { data, ts: Date.now() };
    return data;
  }
  return null;
}

export function saveContent(content: any) {
  fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));
  cache = { data: content, ts: Date.now() };
}
