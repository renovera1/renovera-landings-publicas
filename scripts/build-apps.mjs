import { spawn } from "node:child_process";

const apps = ["design", "consultoria", "solar", "eletroposto"];
const prefix = normalizePrefix(process.env.PUBLIC_BASE_PREFIX || "");

function normalizePrefix(value) {
  if (!value || value === "/") {
    return "";
  }
  return `/${value.replace(/^\/+|\/+$/g, "")}`;
}

function run(command, args) {
  const executable = process.platform === "win32" && command === "npm" ? "cmd.exe" : command;
  const finalArgs = process.platform === "win32" && command === "npm"
    ? ["/d", "/s", "/c", command, ...args]
    : args;

  return new Promise((resolve, reject) => {
    const child = spawn(executable, finalArgs, { stdio: "inherit" });

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
  const base = `${prefix}/${app}/`.replace(/\/{2,}/g, "/");
  await run("npm", ["--workspace", `apps/${app}`, "run", "build", "--", `--base=${base}`]);
}
