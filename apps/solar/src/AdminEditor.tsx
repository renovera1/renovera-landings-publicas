import { useMemo, useState } from "react";
import {
  clearStoredSiteConfig,
  defaultSiteConfig,
  saveStoredSiteConfig,
  SiteConfig,
} from "./siteConfig";

type Props = {
  config: SiteConfig;
  setConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
};

type SectionKey = "hero" | "calculator" | "applications" | "process" | "faq" | "contact" | "visual" | "export";

const sections: Array<{ key: SectionKey; label: string }> = [
  { key: "hero", label: "Hero" },
  { key: "calculator", label: "Calculadora" },
  { key: "applications", label: "Soluções" },
  { key: "process", label: "Processo" },
  { key: "faq", label: "Dúvidas" },
  { key: "contact", label: "Contato/Rodapé" },
  { key: "visual", label: "Visual" },
  { key: "export", label: "Exportar" },
];

function updateAtPath<T>(object: T, path: Array<string | number>, value: unknown): T {
  if (path.length === 0) return value as T;
  const [head, ...rest] = path;
  if (Array.isArray(object)) {
    const clone = [...object];
    clone[head as number] = updateAtPath(clone[head as number], rest, value);
    return clone as T;
  }
  return {
    ...(object as Record<string, unknown>),
    [head]: updateAtPath((object as Record<string, unknown>)[head as string], rest, value),
  } as T;
}

function TextField({ label, value, onChange, textarea = false }: { label: string; value: string; onChange: (value: string) => void; textarea?: boolean }) {
  return (
    <label className="editor-field">
      <span>{label}</span>
      {textarea ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={4} />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

function NumberField({ label, value, onChange, step = 0.01 }: { label: string; value: number; onChange: (value: number) => void; step?: number }) {
  return (
    <label className="editor-field">
      <span>{label}</span>
      <input type="number" step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

export default function AdminEditor({ config, setConfig }: Props) {
  const [active, setActive] = useState<SectionKey>("hero");
  const [copyStatus, setCopyStatus] = useState("");

  const update = (path: Array<string | number>, value: unknown) => {
    setConfig((current) => updateAtPath(current, path, value));
  };

  const configJson = useMemo(() => JSON.stringify(config, null, 2), [config]);
  const siteConfigTs = useMemo(() => `import { SiteConfig } from "./siteConfig";\n\nexport const customSiteConfig: SiteConfig = ${configJson};\n`, [configJson]);

  const save = () => {
    saveStoredSiteConfig(config);
    setCopyStatus("Alterações salvas no navegador.");
  };

  const reset = () => {
    if (!window.confirm("Restaurar o padrão da Renovera? Isso apaga as edições salvas neste navegador.")) return;
    clearStoredSiteConfig();
    setConfig(defaultSiteConfig);
    setCopyStatus("Configuração padrão restaurada.");
  };

  const copy = async (content: string, message: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopyStatus(message);
    } catch {
      setCopyStatus("Não foi possível copiar automaticamente. Selecione o texto manualmente.");
    }
  };

  const downloadJson = () => {
    const blob = new Blob([configJson], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "renovera-site-config.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="editor-page">
      <aside className="editor-sidebar">
        <a className="editor-logo" href="/">
          <img src="/logo-renovera.png" alt="Renovera" />
        </a>
        <strong>Painel visual</strong>
        <p>Edite textos, CTAs e ajustes visuais sem mexer direto no App.tsx.</p>

        <nav>
          {sections.map((section) => (
            <button key={section.key} className={active === section.key ? "active" : ""} onClick={() => setActive(section.key)} type="button">
              {section.label}
            </button>
          ))}
        </nav>

        <div className="editor-actions-stack">
          <button className="editor-save" type="button" onClick={save}>Salvar no navegador</button>
          <a className="editor-preview" href="/" target="_blank" rel="noreferrer">Abrir página</a>
          <button className="editor-reset" type="button" onClick={reset}>Restaurar padrão</button>
        </div>
      </aside>

      <main className="editor-main">
        <div className="editor-topbar">
          <div>
            <span>Renovera Solar</span>
            <h1>Editor da landing page</h1>
          </div>
          <p>As alterações ficam salvas no navegador. Para transformar em código definitivo, use a aba Exportar.</p>
        </div>

        {copyStatus && <div className="editor-status">{copyStatus}</div>}

        {active === "hero" && (
          <section className="editor-card">
            <h2>Hero principal</h2>
            <TextField label="Selo superior" value={config.hero.eyebrow} onChange={(value) => update(["hero", "eyebrow"], value)} />
            <TextField label="Título principal" value={config.hero.title} onChange={(value) => update(["hero", "title"], value)} textarea />
            <TextField label="Subtítulo" value={config.hero.subtitle} onChange={(value) => update(["hero", "subtitle"], value)} textarea />
            <div className="editor-two-cols">
              <TextField label="Botão principal" value={config.hero.primaryButton} onChange={(value) => update(["hero", "primaryButton"], value)} />
              <TextField label="Botão WhatsApp" value={config.hero.secondaryButton} onChange={(value) => update(["hero", "secondaryButton"], value)} />
            </div>
            <h3>Cards do hero</h3>
            {config.hero.chips.map((chip, index) => (
              <div className="editor-repeat" key={index}>
                <TextField label={`Card ${index + 1} - título`} value={chip.title} onChange={(value) => update(["hero", "chips", index, "title"], value)} />
                <TextField label={`Card ${index + 1} - descrição`} value={chip.description} onChange={(value) => update(["hero", "chips", index, "description"], value)} />
              </div>
            ))}
          </section>
        )}

        {active === "calculator" && (
          <section className="editor-card">
            <h2>Calculadora</h2>
            <TextField label="Selo" value={config.calculator.eyebrow} onChange={(value) => update(["calculator", "eyebrow"], value)} />
            <TextField label="Título" value={config.calculator.title} onChange={(value) => update(["calculator", "title"], value)} textarea />
            <TextField label="Subtítulo" value={config.calculator.subtitle} onChange={(value) => update(["calculator", "subtitle"], value)} textarea />
            <TextField label="Título do formulário" value={config.calculator.formTitle} onChange={(value) => update(["calculator", "formTitle"], value)} />
            <TextField label="Subtítulo do formulário" value={config.calculator.formSubtitle} onChange={(value) => update(["calculator", "formSubtitle"], value)} />
            <TextField label="Prefixo da nota técnica" value={config.calculator.notePrefix} onChange={(value) => update(["calculator", "notePrefix"], value)} />
            <TextField label="Texto da nota técnica" value={config.calculator.noteText} onChange={(value) => update(["calculator", "noteText"], value)} textarea />
          </section>
        )}

        {active === "applications" && (
          <section className="editor-card">
            <h2>Soluções</h2>
            <TextField label="Selo" value={config.applications.eyebrow} onChange={(value) => update(["applications", "eyebrow"], value)} />
            <TextField label="Título" value={config.applications.title} onChange={(value) => update(["applications", "title"], value)} textarea />
            <TextField label="Subtítulo" value={config.applications.subtitle} onChange={(value) => update(["applications", "subtitle"], value)} textarea />
            <h3>Cards</h3>
            {config.applications.cards.map((card, index) => (
              <div className="editor-repeat" key={index}>
                <div className="editor-three-cols">
                  <TextField label="Ícone" value={card.icon} onChange={(value) => update(["applications", "cards", index, "icon"], value)} />
                  <TextField label="Título" value={card.title} onChange={(value) => update(["applications", "cards", index, "title"], value)} />
                </div>
                <TextField label="Descrição" value={card.description} onChange={(value) => update(["applications", "cards", index, "description"], value)} textarea />
              </div>
            ))}
          </section>
        )}

        {active === "process" && (
          <section className="editor-card">
            <h2>Processo</h2>
            <TextField label="Selo" value={config.process.eyebrow} onChange={(value) => update(["process", "eyebrow"], value)} />
            <TextField label="Título" value={config.process.title} onChange={(value) => update(["process", "title"], value)} textarea />
            <TextField label="Subtítulo" value={config.process.subtitle} onChange={(value) => update(["process", "subtitle"], value)} textarea />
            <h3>Etapas</h3>
            {config.process.steps.map((step, index) => (
              <div className="editor-repeat" key={index}>
                <div className="editor-three-cols">
                  <TextField label="Número" value={step.number} onChange={(value) => update(["process", "steps", index, "number"], value)} />
                  <TextField label="Título" value={step.title} onChange={(value) => update(["process", "steps", index, "title"], value)} />
                </div>
                <TextField label="Descrição" value={step.description} onChange={(value) => update(["process", "steps", index, "description"], value)} textarea />
              </div>
            ))}
          </section>
        )}

        {active === "faq" && (
          <section className="editor-card">
            <h2>Dúvidas frequentes</h2>
            <TextField label="Selo" value={config.faq.eyebrow} onChange={(value) => update(["faq", "eyebrow"], value)} />
            <TextField label="Título" value={config.faq.title} onChange={(value) => update(["faq", "title"], value)} textarea />
            <TextField label="Subtítulo" value={config.faq.subtitle} onChange={(value) => update(["faq", "subtitle"], value)} textarea />
            <h3>Perguntas</h3>
            {config.faq.items.map((item, index) => (
              <div className="editor-repeat" key={index}>
                <TextField label={`Pergunta ${index + 1}`} value={item.question} onChange={(value) => update(["faq", "items", index, "question"], value)} />
                <TextField label="Resposta" value={item.answer} onChange={(value) => update(["faq", "items", index, "answer"], value)} textarea />
              </div>
            ))}
          </section>
        )}

        {active === "contact" && (
          <section className="editor-card">
            <h2>Contato e rodapé</h2>
            <div className="editor-two-cols">
              <TextField label="WhatsApp com DDI/DDD" value={config.whatsappNumber} onChange={(value) => update(["whatsappNumber"], value.replace(/\D/g, ""))} />
              <TextField label="E-mail" value={config.contactEmail} onChange={(value) => update(["contactEmail"], value)} />
            </div>
            <TextField label="Selo do CTA final" value={config.contact.eyebrow} onChange={(value) => update(["contact", "eyebrow"], value)} />
            <TextField label="Título do CTA final" value={config.contact.title} onChange={(value) => update(["contact", "title"], value)} textarea />
            <TextField label="Texto do CTA final" value={config.contact.subtitle} onChange={(value) => update(["contact", "subtitle"], value)} textarea />
            <div className="editor-two-cols">
              <TextField label="Botão solicitar" value={config.contact.primaryButton} onChange={(value) => update(["contact", "primaryButton"], value)} />
              <TextField label="Botão copiar" value={config.contact.secondaryButton} onChange={(value) => update(["contact", "secondaryButton"], value)} />
            </div>
            <TextField label="Texto do rodapé" value={config.footer.description} onChange={(value) => update(["footer", "description"], value)} textarea />
            <TextField label="Título de escopo" value={config.footer.scopeTitle} onChange={(value) => update(["footer", "scopeTitle"], value)} />
            <TextField label="Escopo" value={config.footer.scopeText} onChange={(value) => update(["footer", "scopeText"], value)} textarea />
            <TextField label="Copyright" value={config.footer.copyright} onChange={(value) => update(["footer", "copyright"], value)} />
          </section>
        )}

        {active === "visual" && (
          <section className="editor-card">
            <h2>Ajustes visuais</h2>
            <div className="editor-two-cols">
              <NumberField label="Escala do título do hero" value={config.visual.heroTitleSize} step={0.01} onChange={(value) => update(["visual", "heroTitleSize"], value)} />
              <NumberField label="Largura máxima do título do hero" value={config.visual.heroMaxWidth} step={10} onChange={(value) => update(["visual", "heroMaxWidth"], value)} />
            </div>
            <label className="editor-field">
              <span>Cor de destaque</span>
              <input type="color" value={config.visual.accentColor} onChange={(event) => update(["visual", "accentColor"], event.target.value)} />
            </label>
            <label className="editor-check">
              <input type="checkbox" checked={config.visual.showFloatingWhatsapp} onChange={(event) => update(["visual", "showFloatingWhatsapp"], event.target.checked)} />
              <span>Mostrar botão flutuante do WhatsApp</span>
            </label>
          </section>
        )}

        {active === "export" && (
          <section className="editor-card">
            <h2>Exportar configuração</h2>
            <p className="editor-help">
              O navegador não consegue alterar os arquivos físicos do VS Code sozinho. Use uma das opções abaixo para transformar os ajustes em arquivo definitivo.
            </p>
            <div className="editor-export-actions">
              <button type="button" onClick={downloadJson}>Baixar config JSON</button>
              <button type="button" onClick={() => copy(configJson, "JSON copiado.")}>Copiar JSON</button>
              <button type="button" onClick={() => copy(siteConfigTs, "Arquivo TypeScript copiado.")}>Copiar arquivo TS</button>
            </div>
            <h3>JSON atual</h3>
            <textarea className="editor-code" value={configJson} readOnly rows={18} />
          </section>
        )}
      </main>
    </div>
  );
}
