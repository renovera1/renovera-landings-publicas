# Renovera Solar - Landing com Editor Visual

Projeto React + TypeScript + Vite da landing page de dimensionamento fotovoltaico da Renovera.

## Rodar o projeto

```powershell
npm install
npm run dev
```

Depois acesse a URL informada pelo Vite, normalmente:

```text
http://localhost:5173/
```

## Editor visual

Acesse:

```text
http://localhost:5173/editor
```

ou:

```text
http://localhost:5173/#editor
```

No editor é possível alterar:

- título e subtítulo do hero;
- textos dos botões;
- cards principais;
- textos da calculadora;
- seção de soluções;
- etapas do processo;
- FAQ;
- CTA final;
- telefone do WhatsApp;
- e-mail;
- textos do rodapé;
- escala do título;
- largura máxima do título;
- cor de destaque;
- exibição do botão flutuante do WhatsApp.

## Como salvar

O botão **Salvar no navegador** grava as alterações no `localStorage` do navegador. Isso atualiza a página localmente, mas não altera automaticamente os arquivos físicos do projeto.

Para transformar os ajustes em código definitivo, abra a aba **Exportar** no editor e use uma das opções:

- baixar `renovera-site-config.json`;
- copiar JSON;
- copiar arquivo TypeScript.

## Arquivos principais

```text
src/App.tsx          # landing page e calculadora
src/AdminEditor.tsx  # painel visual de edição
src/siteConfig.ts    # configuração padrão e funções de salvar/carregar
src/index.css        # estilo da landing e do editor
```

## Build

```powershell
npm run build
```

A pasta `dist/` será gerada para publicação.
