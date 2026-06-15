import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, "dist");
const port = Number(process.env.PORT || 4173);

const types = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
  [".ico", "image/x-icon"]
]);

function resolveRequest(url) {
  const decoded = decodeURIComponent(new URL(url, `http://127.0.0.1:${port}`).pathname);
  const normalized = path.normalize(decoded).replace(/^([/\\])+/, "");
  const route = normalized.replace(/\\/g, "/");
  let candidate = path.join(dist, normalized);

  if (!candidate.startsWith(dist)) {
    return path.join(dist, "404.html");
  }

  if (existsSync(candidate) && !path.extname(candidate)) {
    candidate = path.join(candidate, "index.html");
  }

  if (existsSync(candidate)) {
    return candidate;
  }

  const appMatch = route.match(/^(design|consultoria|solar|eletroposto)\//);
  if (appMatch) {
    return path.join(dist, appMatch[1], "index.html");
  }

  return path.join(dist, "404.html");
}

createServer(async (req, res) => {
  try {
    const filePath = resolveRequest(req.url || "/");
    const body = await readFile(filePath);
    const type = types.get(path.extname(filePath)) || "application/octet-stream";
    res.writeHead(filePath.endsWith("404.html") ? 404 : 200, { "Content-Type": type });
    res.end(body);
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`Erro ao servir o build: ${error.message}`);
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Preview Renovera: http://127.0.0.1:${port}/`);
});
