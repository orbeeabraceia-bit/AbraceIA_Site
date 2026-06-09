#!/usr/bin/env node
/**
 * Expõe localhost via Cloudflare Tunnel (sem senha na 1ª visita).
 * Requer: brew install cloudflared
 * Uso: node scripts/tunnel-cloudflare.mjs [--port=3000]
 */

import { spawn } from "node:child_process";
import http from "node:http";

const port = Number(process.argv.find((a) => a.startsWith("--port="))?.split("=")[1] ?? 3000);

function checkDevServer() {
  return new Promise((resolve) => {
    const req = http.get(`http://127.0.0.1:${port}`, (res) => {
      res.resume();
      resolve(res.statusCode !== undefined && res.statusCode < 500);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(3000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

const running = await checkDevServer();
if (!running) {
  console.error("\n❌ Nenhum servidor respondendo em http://localhost:" + port);
  console.error("\n   Suba o dev antes do túnel:");
  console.error("   pnpm dev   (na raiz ou em web/)\n");
  process.exit(1);
}

console.log("\n🔗 Abrindo túnel Cloudflare para http://localhost:" + port + " …\n");

const bin = process.env.CLOUDFLARED_BIN ?? "cloudflared";
const child = spawn(
  bin,
  ["tunnel", "--url", `http://127.0.0.1:${port}`, "--no-autoupdate"],
  { stdio: ["ignore", "pipe", "pipe"] },
);

let urlPrinted = false;

function maybePrintUrl(line) {
  const match = line.match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/i);
  if (match && !urlPrinted) {
    urlPrinted = true;
    console.log("══════════════════════════════════════════════════════════");
    console.log("  URL pública (compartilhe com o cliente):");
    console.log("  " + match[0]);
    console.log("══════════════════════════════════════════════════════════");
    console.log("\n✅ Sem senha na 1ª visita (Cloudflare Tunnel).");
    console.log("   Pressione Ctrl+C para encerrar.\n");
  }
}

child.stdout.on("data", (chunk) => {
  const text = chunk.toString();
  for (const line of text.split("\n")) {
    maybePrintUrl(line);
  }
});

child.stderr.on("data", (chunk) => {
  const text = chunk.toString();
  for (const line of text.split("\n")) {
    maybePrintUrl(line);
    if (/ERR|error/i.test(line) && !/ERROR: Allow outbound/i.test(line)) {
      process.stderr.write(line + "\n");
    }
  }
});

child.on("error", (err) => {
  if (err.code === "ENOENT") {
    console.error("\n❌ cloudflared não encontrado.");
    console.error("   Instale: brew install cloudflared");
    console.error("   Ou use fallback: pnpm run link:lt\n");
  } else {
    console.error("Erro:", err.message);
  }
  process.exit(1);
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});

process.on("SIGINT", () => {
  child.kill("SIGINT");
});
