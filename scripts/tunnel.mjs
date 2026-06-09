#!/usr/bin/env node
/**
 * Expõe localhost:3000 via localtunnel com instruções em PT-BR.
 * Uso: node scripts/tunnel.mjs [--port 3000]
 */

import { createRequire } from "node:module";
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

async function getPublicIp() {
  try {
    const res = await fetch("https://api.ipify.org?format=json", { signal: AbortSignal.timeout(5000) });
    const data = await res.json();
    return typeof data.ip === "string" ? data.ip : null;
  } catch {
    return null;
  }
}

const running = await checkDevServer();
if (!running) {
  console.error("\n❌ Nenhum servidor respondendo em http://localhost:" + port);
  console.error("\n   Suba o dev antes do túnel:");
  console.error("   cd web && pnpm dev");
  console.error("   — ou, na raiz do projeto: pnpm dev\n");
  process.exit(1);
}

const publicIp = await getPublicIp();
const require = createRequire(import.meta.url);
const localtunnel = require("localtunnel");

console.log("\n🔗 Abrindo túnel público para http://localhost:" + port + " …\n");

const tunnel = await localtunnel({ port, local_host: "127.0.0.1" });

console.log("══════════════════════════════════════════════════════════");
console.log("  URL pública (compartilhe com o cliente):");
console.log("  " + tunnel.url);
console.log("══════════════════════════════════════════════════════════");

if (publicIp) {
  console.log("\n⚠️  Na 1ª visita, o localtunnel pode pedir “Tunnel Password”.");
  console.log("    Informe ao cliente este IP: " + publicIp);
  console.log("    (é o IP público desta máquina — clique Continue depois)\n");
} else {
  console.log("\n⚠️  Na 1ª visita, clique em Continue na tela do localtunnel.");
  console.log("    Se pedir senha, use o IP público desta máquina (google: meu ip).\n");
}

console.log("Pressione Ctrl+C para encerrar o túnel.\n");

tunnel.on("error", (err) => {
  console.error("Erro no túnel:", err.message);
  process.exit(1);
});

process.on("SIGINT", () => {
  tunnel.close();
  process.exit(0);
});
