import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const apps = ["portal", "design", "consultoria", "solar", "eletroposto"];
const prefix = normalizePrefix(process.env.PUBLIC_BASE_PREFIX || "");
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const viteBin = path.join(root, "node_modules", "vite", "bin", "vite.js");

function normalizePrefix(value) {
  if (!value || value === "/") {
    return "";
  }
  return `/${value.replace(/^\/+|\/+$/g, "")}`;
}

function run(command, args, options = {}) {
  const executable = process.platform === "win32" && command === "npm" ? "cmd.exe" : command;
  const finalArgs = process.platform === "win32" && command === "npm"
    ? ["/d", "/s", "/c", command, ...args]
    : args;

  return new Promise((resolve, reject) => {
    const child = spawn(executable, finalArgs, { stdio: "inherit", ...options });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${command} ${args.join(" ")} saiu com codigo ${code}`));
    });
  });
}

for (const app of apps) {
  const base = app === "portal" ? `${prefix}/`.replace(/\/{2,}/g, "/") : `${prefix}/${app}/`.replace(/\/{2,}/g, "/");
  await run(process.execPath, [viteBin, "build", `--base=${base}`], {
    cwd: path.join(root, "apps", app),
    env: { ...process.env, NODE_PATH: path.join(root, "node_modules") }
  });
}
