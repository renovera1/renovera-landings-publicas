import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, "dist");
const basePrefix = normalizePrefix(process.env.PUBLIC_BASE_PREFIX || "");

function normalizePrefix(value) {
  if (!value || value === "/") {
    return "";
  }
  return `/${value.replace(/^\/+|\/+$/g, "")}`;
}

function publicPath(value) {
  return `${basePrefix}/${value.replace(/^\/+/, "")}`.replace(/\/{2,}/g, "/");
}

const pages = [
  {
    slug: "design",
    title: "Consultoria Regulatória",
    description: "Defesa técnica e regulatória para casos de conexão, inversão de fluxo e concessionárias.",
    source: path.join(root, "apps", "design", "dist")
  },
  {
    slug: "consultoria",
    title: "Projetos Elétricos",
    description: "Projetos elétricos, subestações, proteção, entrada de energia e ACL.",
    source: path.join(root, "apps", "consultoria", "dist")
  },
  {
    slug: "solar",
    title: "Energia Solar",
    description: "Calculadora fotovoltaica, dimensionamento, economia estimada e editor visual.",
    source: path.join(root, "apps", "solar", "dist")
  },
  {
    slug: "eletroposto",
    title: "Eletropostos",
    description: "Simulação de receita, margem, payback e infraestrutura de recarga elétrica.",
    source: path.join(root, "apps", "eletroposto", "dist")
  }
];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const page of pages) {
  if (!existsSync(page.source)) {
    throw new Error(`Build ausente para ${page.slug}: ${page.source}`);
  }
  await cp(page.source, path.join(dist, page.slug), { recursive: true });
}

const logoPath = path.join(root, "apps", "design", "public", "logo-renovera.png");
if (existsSync(logoPath)) {
  await cp(logoPath, path.join(dist, "logo-renovera.png"));
}

const cardMarkup = pages.map((page) => `
  <article class="card">
    <span>${page.title}</span>
    <h2>${page.description}</h2>
    <div class="actions">
      <a class="primary" href="${publicPath(`${page.slug}/`)}">Abrir página</a>
      <a class="secondary" href="${publicPath(`${page.slug}/editor`)}">Abrir editor</a>
    </div>
  </article>
`).join("");

const indexHtml = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Renovera | Landings públicas</title>
    <meta name="description" content="Portal público das landing pages Renovera para testes, revisão e sugestões de melhoria." />
    <style>
      :root {
        --green: #004225;
        --green-2: #0b5a37;
        --gold: #ffc53d;
        --bg: #eef6ef;
        --text: #10251c;
        --muted: rgba(16, 37, 28, 0.7);
        --line: rgba(0, 66, 37, 0.14);
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: var(--text);
        background: var(--bg);
      }
      header {
        min-height: 44vh;
        display: grid;
        align-items: end;
        padding: 34px 20px;
        color: white;
        background:
          linear-gradient(135deg, rgba(0, 66, 37, 0.96), rgba(11, 90, 55, 0.9)),
          radial-gradient(circle at 20% 20%, rgba(255, 197, 61, 0.28), transparent 32%);
      }
      .hero, main, footer {
        width: min(calc(100% - 36px), 1160px);
        margin: 0 auto;
      }
      img { width: 168px; height: auto; object-fit: contain; }
      h1 {
        max-width: 760px;
        margin: 34px 0 12px;
        font-size: clamp(2.8rem, 7vw, 5.8rem);
        line-height: 0.92;
        letter-spacing: -0.045em;
      }
      p {
        max-width: 680px;
        margin: 0;
        color: rgba(255, 255, 255, 0.78);
        font-size: 1.08rem;
        line-height: 1.7;
      }
      main {
        padding: 34px 0 54px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
      }
      .card {
        min-height: 245px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 22px;
        padding: 26px;
        border: 1px solid var(--line);
        border-radius: 18px;
        background: white;
        box-shadow: 0 20px 48px rgba(0, 66, 37, 0.08);
      }
      .card span {
        width: fit-content;
        padding: 7px 10px;
        border-radius: 999px;
        background: rgba(255, 197, 61, 0.22);
        color: #6a5200;
        font-weight: 900;
        font-size: 0.78rem;
      }
      h2 {
        margin: 0;
        color: var(--green);
        font-size: clamp(1.35rem, 2.6vw, 2.05rem);
        line-height: 1.08;
        letter-spacing: -0.03em;
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      a {
        min-height: 42px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        padding: 0 16px;
        font-weight: 900;
        text-decoration: none;
      }
      .primary {
        background: var(--green);
        color: white;
      }
      .secondary {
        background: var(--gold);
        color: #322800;
      }
      footer {
        padding: 0 0 30px;
        color: var(--muted);
        font-size: 0.92rem;
      }
      @media (max-width: 760px) {
        header { min-height: 54vh; }
        .grid { grid-template-columns: 1fr; }
        .actions { flex-direction: column; }
      }
    </style>
  </head>
  <body>
    <header>
      <div class="hero">
        <img src="${publicPath("logo-renovera.png")}" alt="Renovera" />
        <h1>Landings públicas da Renovera</h1>
        <p>Portal para acessar, testar e revisar as páginas comerciais da Renovera. Cada landing também possui uma versão de editor para ajustes rápidos de texto.</p>
      </div>
    </header>
    <main>
      <section class="grid" aria-label="Landing pages disponíveis">
        ${cardMarkup}
      </section>
    </main>
    <footer>© 2026 Renovera. Projeto público para testes e sugestões de melhoria.</footer>
  </body>
</html>`;

await writeFile(path.join(dist, "index.html"), indexHtml, "utf8");

const editorsHtml = indexHtml
  .replace("Landings públicas da Renovera", "Editores das landings Renovera")
  .replace("Portal para acessar, testar e revisar as páginas comerciais da Renovera. Cada landing também possui uma versão de editor para ajustes rápidos de texto.", "Abra o editor de cada landing para alterar textos de forma visual e salvar as mudanças no navegador.")
  .replaceAll("Abrir página", "Ver página")
  .replaceAll("Abrir editor", "Editar");

await writeFile(path.join(dist, "editores.html"), editorsHtml, "utf8");
await writeFile(path.join(dist, "404.html"), indexHtml, "utf8");

console.log(`Publicação criada em ${dist}`);
