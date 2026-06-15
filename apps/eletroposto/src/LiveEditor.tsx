import { useEffect, useMemo, useState } from "react";

type Edits = Record<string, string>;

const EDITABLE_SELECTOR =
  "main h1, main h2, main h3, main p, main a, main button, footer h4, footer p, footer a";

function textKey(element: Element, index: number) {
  const original = element.getAttribute("data-editor-original") || element.textContent?.trim() || "";
  return `${element.tagName.toLowerCase()}:${index}:${original.slice(0, 72)}`;
}

function getEditableElements() {
  return Array.from(document.querySelectorAll(EDITABLE_SELECTOR)).filter((element) => {
    if (element.closest(".live-editor-panel")) return false;
    const text = element.textContent?.trim() || "";
    return text.length > 2 && text.length < 500;
  }) as HTMLElement[];
}

export default function LiveEditor({ namespace }: { namespace: string }) {
  const isEditorRoute = typeof window !== "undefined" && window.location.pathname === "/editor";
  const storageKey = useMemo(() => `renovera-live-editor:${namespace}`, [namespace]);
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState("Editor pronto.");

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    const edits: Edits = stored ? JSON.parse(stored) : {};

    getEditableElements().forEach((element, index) => {
      if (!element.getAttribute("data-editor-original")) {
        element.setAttribute("data-editor-original", element.textContent?.trim() || "");
      }
      const key = textKey(element, index);
      element.setAttribute("data-editor-key", key);
      if (edits[key]) element.textContent = edits[key];
    });
  }, [storageKey]);

  useEffect(() => {
    if (!isEditorRoute) return;
    document.body.classList.toggle("live-editor-active", enabled);
    getEditableElements().forEach((element) => {
      element.contentEditable = enabled ? "true" : "false";
      element.classList.toggle("live-editable", enabled);
      if (enabled) element.setAttribute("spellcheck", "true");
    });
  }, [enabled, isEditorRoute]);

  useEffect(() => {
    return () => document.body.classList.remove("live-editor-active");
  }, []);

  if (!isEditorRoute) return null;

  function save() {
    const edits: Edits = {};
    getEditableElements().forEach((element) => {
      const key = element.getAttribute("data-editor-key");
      const original = element.getAttribute("data-editor-original") || "";
      const current = element.textContent?.trim() || "";
      if (key && current && current !== original) edits[key] = current;
    });
    localStorage.setItem(storageKey, JSON.stringify(edits, null, 2));
    setStatus("Alterações salvas neste navegador.");
  }

  function reset() {
    if (!window.confirm("Restaurar os textos originais desta landing?")) return;
    localStorage.removeItem(storageKey);
    window.location.reload();
  }

  function exportJson() {
    const data = localStorage.getItem(storageKey) || "{}";
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${namespace}-edicoes.json`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Arquivo JSON exportado.");
  }

  return (
    <aside className="live-editor-panel" aria-label="Editor visual Renovera">
      <strong>Editor visual</strong>
      <p>Clique em editar, altere textos direto na página e salve.</p>
      <button type="button" onClick={() => setEnabled((value) => !value)}>
        {enabled ? "Bloquear edição" : "Editar textos"}
      </button>
      <button type="button" onClick={save}>Salvar no navegador</button>
      <button type="button" onClick={exportJson}>Exportar JSON</button>
      <button type="button" onClick={reset}>Restaurar original</button>
      <a href="/" target="_self">Ver página normal</a>
      <small>{status}</small>
    </aside>
  );
}
