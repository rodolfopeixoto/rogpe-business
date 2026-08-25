import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const FILES = ["Dockerfile", "nginx.conf", "security-headers.conf", "public/index.html", "public/styles.css"];
const HTML_MARKERS = ["<main id=\"conteudo\">", "<h1 id=\"hero-title\">", "id=\"ofertas\"", "id=\"metodo\"", "id=\"governanca\"", "mailto:rodolfo@rogpe.tech"];
const NGINX_MARKERS = ["listen 8080", "location = /healthz", "security-headers.conf"];
const HEADER_MARKERS = ["Content-Security-Policy", "X-Content-Type-Options", "Referrer-Policy"];

async function assertMarkers(path, markers) {
  const contents = await readFile(resolve(ROOT, path), "utf8");
  const missing = markers.filter((marker) => !contents.includes(marker));
  if (missing.length) throw new Error(`${path} missing ${missing.join(", ")}`);
}

await Promise.all(FILES.map((path) => readFile(resolve(ROOT, path))));
await assertMarkers("public/index.html", HTML_MARKERS);
await assertMarkers("nginx.conf", NGINX_MARKERS);
await assertMarkers("security-headers.conf", HEADER_MARKERS);
console.log("rogpe-business static validation passed");
