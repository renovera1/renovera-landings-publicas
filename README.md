# Renovera Portal Institucional

Portal institucional da Renovera, criado como hub central da marca e preservando as landing pages comerciais ja publicadas.

## Stack

- React;
- TypeScript;
- Vite;
- CSS por aplicacao;
- npm workspaces;
- GitHub Pages via GitHub Actions.

## Estrutura

```txt
apps/
  portal/        # Site institucional principal
  design/        # Landing de consultoria regulatoria
  consultoria/   # Landing de projetos eletricos
  solar/         # Landing de energia solar
  eletroposto/   # Landing de eletropostos
scripts/
  build-apps.mjs
  compose-dist.mjs
  serve-dist.mjs
```

## Assets visuais do portal

Os assets historicos do site antigo ficam em:

```txt
apps/portal/public/assets/renovera/
```

Arquivos usados no portal:

- `fachada-renovera.jpg`: hero da Home;
- `blog-aterramento.jpg`: Energia Solar, desafios e solucoes;
- `blog-direitos-concessionaria.jpg`: Consultoria Regulatoria;
- `blog-nova-regulamentacao.jpg`: blog legado da Home;
- `blog-6-duvidas.jpg`: artigo principal de Insights;
- `about1.png`: apoio visual para Eletropostos e energia;
- `digital-text.png`: textura tecnica no hero, menu e rodape;
- `logo.png` e `logo-icon-fill.png`: referencias historicas preservadas.
- `parceiros/logo-1.png` a `parceiros/logo-13.png`: distribuidores e marcas parceiras.

A logo oficial em uso no header, hero lateral e rodape vem dos arquivos historicos `logo.png` e `logo-icon-fill.png`.

## Rotas do portal

- `/`
- `/solucoes`
- `/segmentos`
- `/cases`
- `/insights`
- `/sobre`
- `/contato`
- `/politica-de-privacidade`
- `/termos-de-uso`
- `/canal-de-etica`

## Landing pages externas usadas nos CTAs

- Energia Solar: `https://renovera1.github.io/renovera-energia-solar/`
- Consultoria Regulatoria: `https://renovera1.github.io/renovera-consultoria-regulatoria/`
- Projetos Eletricos: `https://renovera1.github.io/renovera-projetos-eletricos/`
- Eletropostos: `https://renovera1.github.io/renovera-eletroposto/`

## Instalar dependencias

```bash
npm install
```

## Rodar localmente

Portal institucional:

```bash
npm run dev
```

URL local:

```txt
http://127.0.0.1:5500/
```

Landings individuais:

```bash
npm run dev:design
npm run dev:consultoria
npm run dev:solar
npm run dev:eletroposto
```

## Build

```bash
npm run build
```

O build final e gerado em `dist/`. Para testar o build composto:

```bash
npm run preview
```

URL do preview:

```txt
http://127.0.0.1:4173/
```

## Publicacao no GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` executa:

```bash
npm ci
npm run build
```

Depois publica a pasta `dist/`.

Para publicar com prefixo de repositorio:

```bash
PUBLIC_BASE_PREFIX=/renovera-landings-publicas npm run build
```

Link publico previsto:

```txt
https://renovera1.github.io/renovera-landings-publicas/
```

## Conteudo pendente para evolucao

Os objetos de cases e artigos iniciais ficam em `apps/portal/src/App.tsx`. Eles usam conteudo institucional neutro para evitar numeros, clientes, certificacoes ou resultados inventados. Ao receber cases e artigos reais, atualize esses objetos com os dados validados.


## Portal unificado

As rotas principais usam um unico header superior, rodape global claro, WhatsApp flutuante e botao de voltar ao topo.

Rotas principais:

- `/`: Inicio;
- `/solucoes`: Solucoes;
- `/cases`: Cases;
- `/insights`: Blog;
- `/sobre`: A Renovera;
- `/contato`: Contato.

Os HTMLs em `apps/portal/public/legacy-pages/` sao usados como fonte de conteudo para Blog, A Renovera, Contato e artigos, sem publicar a barra lateral antiga.
