import fs from "fs";
import path from "path";

const contentPath = path.join(process.cwd(), "data", "content.json");

export function getContent() {
  if (fs.existsSync(contentPath)) {
    const content = fs.readFileSync(contentPath, "utf8");
    return JSON.parse(content);
  }
  return null;
}

export function saveContent(content: any) {
  fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));
}
