# Renovera Landings Publicas

Portal publico com quatro landing pages da Renovera para teste, revisao e coleta de sugestoes:

- Consultoria Regulatoria;
- Projetos Eletricos;
- Energia Solar;
- Eletropostos.

Cada landing mantem a identidade visual da Renovera, com logo institucional, cores em verde, branco, cinza e dourado, botoes de WhatsApp e pagina de editor em `/editor`.

## Tecnologias

- React;
- TypeScript;
- Vite;
- CSS por aplicacao;
- npm workspaces.

## Estrutura

```txt
apps/
  design/        # Landing de consultoria regulatoria
  consultoria/   # Landing de projetos eletricos
  solar/         # Landing solar com editor visual
  eletroposto/   # Landing de eletropostos
scripts/
  compose-dist.mjs
  serve-dist.mjs
```

## Instalar dependencias

```bash
npm install
```

## Rodar localmente

Cada landing roda em uma porta propria:

```bash
npm run dev:design
npm run dev:consultoria
npm run dev:solar
npm run dev:eletroposto
```

URLs locais sugeridas:

- `http://127.0.0.1:5501/`
- `http://127.0.0.1:5502/`
- `http://127.0.0.1:5503/`
- `http://127.0.0.1:5504/`

Editores:

- `http://127.0.0.1:5501/editor`
- `http://127.0.0.1:5502/editor`
- `http://127.0.0.1:5503/editor`
- `http://127.0.0.1:5504/editor`

## Build

```bash
npm run build
```

O build final e gerado em:

```txt
dist/
```

Para testar o portal final localmente:

```bash
npm run preview
```

URL do preview:

```txt
http://127.0.0.1:4173/
```

Rotas de publicacao:

- `/design/`
- `/consultoria/`
- `/solar/`
- `/eletroposto/`
- `/editores.html`

## Publicacao online

Opcao configurada: GitHub Pages com GitHub Actions.

O workflow `.github/workflows/deploy-pages.yml` executa:

```bash
npm ci
npm run build
```

Depois publica a pasta:

```txt
dist/
```

Link publico previsto:

```txt
https://renovera1.github.io/renovera-landings-publicas/
```

O arquivo `vercel.json` tambem foi mantido para permitir publicacao futura na Vercel, se desejado.

## GitHub

Repositorio planejado:

```txt
https://github.com/Renovera1/renovera-landings-publicas
```

Link publico previsto:

```txt
https://renovera1.github.io/renovera-landings-publicas/
```

## Seguranca

Este projeto nao deve conter:

- senhas;
- tokens;
- chaves de API;
- arquivos `.env`;
- credenciais do GitHub;
- credenciais de banco de dados.

Autenticacao com GitHub deve ser feita apenas por fluxo oficial, como GitHub CLI, OAuth ou Personal Access Token com permissoes limitadas.

## Proximos passos

1. Instalar Git e GitHub CLI, se ainda nao estiverem disponiveis.
2. Autenticar com `gh auth login`.
3. Criar o repositorio na conta `Renovera1`.
4. Fazer commit e push.
5. Conectar o repositorio na Vercel e publicar.
