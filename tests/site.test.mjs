import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");

test("keeps a semantic page with one primary heading", async () => {
  const html = await readFile(resolve(ROOT, "public/index.html"), "utf8");
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /<html lang="pt-BR">/);
  assert.match(html, /<nav aria-label="Navegação principal">/);
});

test("does not publish unverified commercial terms", async () => {
  const html = await readFile(resolve(ROOT, "public/index.html"), "utf8");
  assert.match(html, /Oferta piloto em validação/);
  assert.doesNotMatch(html, /R\$\s*\d|clientes atendidos/i);
});

test("exposes health and security configuration", async () => {
  const nginx = await readFile(resolve(ROOT, "nginx.conf"), "utf8");
  const headers = await readFile(resolve(ROOT, "security-headers.conf"), "utf8");
  assert.match(nginx, /location = \/healthz/);
  assert.match(nginx, /return 200 "ok\\n"/);
  assert.match(headers, /Content-Security-Policy/);
});
