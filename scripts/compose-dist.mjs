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

const portalSource = path.join(root, "apps", "portal", "dist");
const landingPages = [
  { slug: "design", source: path.join(root, "apps", "design", "dist") },
  { slug: "consultoria", source: path.join(root, "apps", "consultoria", "dist") },
  { slug: "solar", source: path.join(root, "apps", "solar", "dist") },
  { slug: "eletroposto", source: path.join(root, "apps", "eletroposto", "dist") }
];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

if (!existsSync(portalSource)) {
  throw new Error(`Build ausente para portal: ${portalSource}`);
}

await cp(portalSource, dist, { recursive: true });

for (const page of landingPages) {
  if (!existsSync(page.source)) {
    throw new Error(`Build ausente para ${page.slug}: ${page.source}`);
  }
  await cp(page.source, path.join(dist, page.slug), { recursive: true });
}

const portalIndex = path.join(dist, "index.html");
if (existsSync(portalIndex)) {
  await cp(portalIndex, path.join(dist, "404.html"));
  const portalRoutes = [
    "solucoes",
    "segmentos",
    "cases",
    "insights",
    "blog",
    "blog-direitos-concessionaria",
    "blog-nova-regulamentacao",
    "blog-6-duvidas",
    "blog-aterramento",
    "sobre",
    "contato",
    "politica-de-privacidade",
    "termos-de-uso",
    "canal-de-etica"
  ];
  for (const route of portalRoutes) {
    const routeDir = path.join(dist, route);
    await mkdir(routeDir, { recursive: true });
    await cp(portalIndex, path.join(routeDir, "index.html"));
  }
  const legacyHtmlAliases = [
    "sobre.html",
    "blog.html",
    "contato.html",
    "blog-direitos-concessionaria.html",
    "blog-nova-regulamentacao.html",
    "blog-6-duvidas.html",
    "blog-aterramento.html"
  ];
  for (const alias of legacyHtmlAliases) {
    await cp(portalIndex, path.join(dist, alias));
  }
}


const publicBase = basePrefix || "/renovera-landings-publicas";
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${["", "solucoes", "segmentos", "cases", "insights", "sobre", "contato", "blog-direitos-concessionaria", "blog-nova-regulamentacao", "blog-6-duvidas", "blog-aterramento", "politica-de-privacidade", "termos-de-uso", "canal-de-etica"].map((route) => `<url><loc>https://renovera1.github.io${publicBase}/${route}</loc></url>`).join("\n  ")}
</urlset>`;

await writeFile(path.join(dist, "sitemap.xml"), sitemap, "utf8");

console.log(`Publicacao criada em ${dist}`);
