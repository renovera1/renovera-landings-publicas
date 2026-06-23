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
