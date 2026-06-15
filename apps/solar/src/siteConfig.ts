export type HeroChip = {
  title: string;
  description: string;
};

export type ApplicationCard = {
  icon: string;
  title: string;
  description: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type FaqItemConfig = {
  question: string;
  answer: string;
};

export type SiteConfig = {
  whatsappNumber: string;
  contactEmail: string;
  visual: {
    heroTitleSize: number;
    heroMaxWidth: number;
    accentColor: string;
    showFloatingWhatsapp: boolean;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryButton: string;
    secondaryButton: string;
    chips: HeroChip[];
  };
  calculator: {
    eyebrow: string;
    title: string;
    subtitle: string;
    formTitle: string;
    formSubtitle: string;
    notePrefix: string;
    noteText: string;
  };
  applications: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: ApplicationCard[];
  };
  process: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: ProcessStep[];
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: FaqItemConfig[];
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryButton: string;
    secondaryButton: string;
  };
  footer: {
    description: string;
    scopeTitle: string;
    scopeText: string;
    copyright: string;
  };
};

export const defaultSiteConfig: SiteConfig = {
  whatsappNumber: "5519996514827",
  contactEmail: "contato@renovera.com.br",
  visual: {
    heroTitleSize: 0.84,
    heroMaxWidth: 760,
    accentColor: "#e9b923",
    showFloatingWhatsapp: true,
  },
  hero: {
    eyebrow: "RENOVERA SOLAR • DIMENSIONAMENTO FOTOVOLTAICO",
    title: "Reduza sua conta de luz com energia solar.",
    subtitle:
      "Simule em poucos segundos a potência em kWp, quantidade de módulos, geração mensal, economia estimada, investimento aproximado e retorno simples. A Renovera transforma a simulação em projeto técnico, homologação e instalação.",
    primaryButton: "Calcule a potência ideal do seu sistema fotovoltaico.",
    secondaryButton: "Falar no WhatsApp",
    chips: [
      { title: "Pré-dimensionamento", description: "kWh → kWp e kWp → kWh" },
      { title: "Projeto completo", description: "homologação e implantação técnica" },
      { title: "Homologação", description: "atuação junto à concessionária" },
    ],
  },
  calculator: {
    eyebrow: "CALCULADORA SOLAR",
    title: "Dimensione o sistema fotovoltaico antes do orçamento.",
    subtitle:
      "Informe seus dados, cidade, consumo ou potência desejada, tensão de atendimento e tipo de telhado. A simulação é preliminar e serve como base comercial para análise técnica da Renovera.",
    formTitle: "Parâmetros do Projeto",
    formSubtitle: "Dados mínimos para pré-dimensionamento fotovoltaico.",
    notePrefix: "Nota técnica:",
    noteText:
      "simulação preliminar. A proposta final depende de vistoria, área útil, sombreamento, estrutura, padrão de entrada e regras da concessionária.",
  },
  applications: {
    eyebrow: "SOLUÇÕES FOTOVOLTAICAS",
    title: "Energia solar para diferentes perfis de consumo.",
    subtitle:
      "A Renovera atua desde o estudo de viabilidade até a entrega técnica do sistema, com foco em economia, segurança elétrica, homologação e performance de geração.",
    cards: [
      { icon: "⌂", title: "Residencial", description: "Projetos para redução da conta de luz familiar, com dimensionamento por consumo e área disponível." },
      { icon: "▣", title: "Comercial", description: "Usinas para empresas, lojas, mercados, escritórios e operações com consumo recorrente." },
      { icon: "⌘", title: "Industrial", description: "Análise de demanda, perfil de carga, conexão, entrada de energia e estratégia de compensação." },
      { icon: "☷", title: "Rural", description: "Soluções para propriedades rurais, irrigação, refrigeração, bombas, galpões e unidades produtivas." },
      { icon: "⚡", title: "Projetos especiais", description: "Ampliações, limite de potência injetável, GD remota, eletropostos e estudos regulatórios." },
    ],
  },
  process: {
    eyebrow: "MÉTODO RENOVERA",
    title: "Da conta de luz à usina conectada.",
    subtitle:
      "Um processo comercial e técnico claro para tirar a decisão do campo da dúvida e levar o projeto até a geração de energia.",
    steps: [
      { number: "01", title: "Diagnóstico", description: "Análise da conta de energia, consumo médio, classe de ligação, tarifa e objetivo de compensação." },
      { number: "02", title: "Dimensionamento", description: "Cálculo da potência em kWp, quantidade de módulos, geração, economia, investimento e retorno." },
      { number: "03", title: "Vistoria técnica", description: "Validação de telhado, estrutura, sombreamento, padrão de entrada, distâncias e pontos de conexão." },
      { number: "04", title: "Projeto elétrico", description: "Elaboração de memorial, diagramas, documentação, ART e adequações técnicas necessárias." },
      { number: "05", title: "Homologação", description: "Protocolo, acompanhamento e respostas técnicas junto à concessionária até a aprovação." },
      { number: "06", title: "Instalação", description: "Execução, comissionamento, troca de medidor, monitoramento e suporte pós-venda." },
    ],
  },
  faq: {
    eyebrow: "DÚVIDAS FREQUENTES",
    title: "Antes de fechar seu sistema solar.",
    subtitle: "Respostas objetivas para quem está avaliando energia solar com segurança técnica.",
    items: [
      { question: "A simulação já é uma proposta final?", answer: "Não. A simulação é um pré-dimensionamento comercial. A proposta final depende de vistoria, equipamentos selecionados, estrutura, distância de cabeamento, adequações elétricas e regras da concessionária." },
      { question: "A Renovera faz homologação na concessionária?", answer: "Sim. A Renovera pode conduzir projeto, ART, memorial, diagramas, solicitação de acesso, acompanhamento junto à concessionária e suporte em exigências técnicas." },
      { question: "É possível reduzir 100% da conta de luz?", answer: "É possível compensar grande parte do consumo, mas a conta normalmente mantém custos mínimos, disponibilidade, iluminação pública ou componentes tarifários aplicáveis. A simulação considera a disponibilidade pela tensão selecionada." },
      { question: "O que preciso enviar para uma análise real?", answer: "Conta de energia recente, endereço da instalação, fotos do padrão de entrada, fotos ou informações do telhado/local, telefone para contato e objetivo de compensação." },
      { question: "A Renovera atende projetos comerciais e rurais?", answer: "Sim. A Renovera atende projetos residenciais, comerciais, industriais, rurais e projetos especiais como ampliações, GD remota, limite de potência injetável e suporte regulatório." },
    ],
  },
  contact: {
    eyebrow: "ANÁLISE COMERCIAL",
    title: "Quer transformar sua conta de energia em economia recorrente?",
    subtitle:
      "Envie a simulação para a equipe Renovera e receba uma análise técnica para implantação do seu sistema fotovoltaico residencial, comercial, rural ou industrial.",
    primaryButton: "Solicitar orçamento",
    secondaryButton: "Copiar resumo técnico",
  },
  footer: {
    description: "Energia solar, infraestrutura elétrica e soluções técnicas para acelerar a transição energética.",
    scopeTitle: "Escopo",
    scopeText: "Dimensionamento, projeto, homologação, instalação, monitoramento e suporte regulatório.",
    copyright: "© 2026 Renovera. Todos os direitos reservados.",
  },
};

export const SITE_CONFIG_STORAGE_KEY = "renoveraSolarSiteConfig";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function mergeSiteConfig(base: SiteConfig, override: Partial<SiteConfig>): SiteConfig {
  const merge = (target: any, source: any): any => {
    if (Array.isArray(target)) {
      return Array.isArray(source) ? source : target;
    }
    if (isObject(target)) {
      const output: Record<string, unknown> = { ...target };
      if (isObject(source)) {
        Object.keys(source).forEach((key) => {
          output[key] = merge((target as any)[key], (source as any)[key]);
        });
      }
      return output;
    }
    return source === undefined || source === null ? target : source;
  };

  return merge(base, override) as SiteConfig;
}

export function loadStoredSiteConfig(): SiteConfig {
  if (typeof window === "undefined") return defaultSiteConfig;
  try {
    const stored = window.localStorage.getItem(SITE_CONFIG_STORAGE_KEY);
    if (!stored) return defaultSiteConfig;
    return mergeSiteConfig(defaultSiteConfig, JSON.parse(stored));
  } catch {
    return defaultSiteConfig;
  }
}

export function saveStoredSiteConfig(config: SiteConfig) {
  window.localStorage.setItem(SITE_CONFIG_STORAGE_KEY, JSON.stringify(config, null, 2));
}

export function clearStoredSiteConfig() {
  window.localStorage.removeItem(SITE_CONFIG_STORAGE_KEY);
}
