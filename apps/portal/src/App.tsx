import { FormEvent, ReactElement, useEffect, useMemo, useState } from "react";

const whatsapp = "https://wa.me/5519996514827";
const email = "contato@renovera.com.br";
const address = "Rua Visconde de Rio Branco, 106, São João da Boa Vista - SP";
const assetBase = import.meta.env.BASE_URL || "/";

const landingUrls = {
  solar: "https://renovera1.github.io/renovera-energia-solar/",
  regulatorio: "https://renovera1.github.io/renovera-consultoria-regulatoria/",
  projetos: "https://renovera1.github.io/renovera-projetos-eletricos/",
  eletropostos: "https://renovera1.github.io/renovera-eletroposto/",
};

type IconName = "solar" | "regulatorio" | "projetos" | "eletropostos" | "diagnostico" | "aprovacao" | "performance";

const ctas = {
  solar: "Dimensionar minha usina",
  regulatorio: "Analisar negativa de conexão",
  projetos: "Planejar minha infraestrutura",
  eletropostos: "Simular viabilidade de recarga",
};

const solutions = [
  {
    id: "solar",
    title: "Energia Solar",
    eyebrow: "Geração fotovoltaica",
    problem: "Quero reduzir o custo da minha energia.",
    desc: "Dimensionamento, análise de consumo, projeto, homologação, implantação e viabilidade fotovoltaica.",
    fit: "Empresas, propriedades rurais, condomínios e operações com consumo relevante.",
    scope: ["Análise de consumo e tarifa", "Dimensionamento técnico", "Projeto e homologação", "Implantação e acompanhamento"],
    url: landingUrls.solar,
    cta: ctas.solar,
    icon: "solar" as IconName,
    tone: "gold",
  },
  {
    id: "regulatorio",
    title: "Consultoria Regulatória",
    eyebrow: "Conexão e concessionárias",
    problem: "Meu projeto foi negado pela concessionária.",
    desc: "Defesa técnica, auditoria de estudos, estratégia administrativa, ANEEL, concessionárias e parecer técnico.",
    fit: "Consumidores, integradores, investidores e operações com conexão travada.",
    scope: ["Auditoria técnica", "Parecer regulatório", "Estratégia perante concessionárias", "Documentação de defesa"],
    url: landingUrls.regulatorio,
    cta: ctas.regulatorio,
    icon: "regulatorio" as IconName,
    tone: "forest",
  },
  {
    id: "projetos",
    title: "Projetos Elétricos",
    eyebrow: "Infraestrutura elétrica",
    problem: "Preciso aprovar ou ampliar minha infraestrutura.",
    desc: "Projetos industriais e comerciais, entrada de energia, subestações de consumidor, estudos elétricos e aprovação.",
    fit: "Indústrias, comércios, empreendimentos e operações críticas em expansão.",
    scope: ["Estudos elétricos", "Entrada de energia", "Proteção e seletividade", "Aumento de carga e aprovação"],
    url: landingUrls.projetos,
    cta: ctas.projetos,
    icon: "projetos" as IconName,
    tone: "deep",
  },
  {
    id: "eletropostos",
    title: "Eletropostos",
    eyebrow: "Mobilidade elétrica",
    problem: "Quero avaliar um projeto de recarga veicular.",
    desc: "Estudo de viabilidade, carregadores AC/DC, adequação elétrica, projeto, implantação e expansão.",
    fit: "Postos, estacionamentos, frotas, condomínios, varejo e operadores de ativos.",
    scope: ["Viabilidade técnica e comercial", "Adequação de demanda", "Projeto de infraestrutura", "Implantação e monetização"],
    url: landingUrls.eletropostos,
    cta: ctas.eletropostos,
    icon: "eletropostos" as IconName,
    tone: "green",
  },
];

const segments = [
  { title: "Indústrias e plantas produtivas", context: "Operações com alta exigência de continuidade, demanda contratada e expansão de carga.", risks: "Paradas, inadequação de proteção, energia cara e atrasos em aprovação.", solution: "Projetos Elétricos, Energia Solar e Consultoria Regulatória" },
  { title: "Hospitais, clínicas e operações críticas", context: "Ambientes onde segurança elétrica, redundância e previsibilidade importam antes de qualquer intervenção.", risks: "Risco operacional, qualidade de energia e interface regulatória sensível.", solution: "Projetos Elétricos e Consultoria Regulatória" },
  { title: "Comércio, varejo e serviços", context: "Unidades com pressão por redução de custo, expansão de carga e novas demandas de recarga.", risks: "Infraestrutura subdimensionada, consumo elevado e decisões fragmentadas.", solution: "Energia Solar, Projetos Elétricos e Eletropostos" },
  { title: "Agronegócio", context: "Consumo intensivo, bombeamento, geração própria e conexões em áreas rurais.", risks: "Instabilidade de fornecimento, custo tarifário e gargalos de conexão.", solution: "Energia Solar e Projetos Elétricos" },
  { title: "Condomínios e empreendimentos", context: "Projetos com áreas comuns, entrada de energia, recarga e documentação técnica.", risks: "Aprovações lentas, escopo incompleto e infraestrutura sem plano de expansão.", solution: "Projetos Elétricos, Energia Solar e Eletropostos" },
  { title: "Integradores solares", context: "Parceiros que precisam de defesa técnica, apoio regulatório e clareza em conexões.", risks: "Negativas, inversão de fluxo, documentação incompleta e perda de prazo comercial.", solution: "Consultoria Regulatória" },
  { title: "Investidores e operadores de ativos", context: "Decisões que exigem due diligence técnica, viabilidade e leitura de risco.", risks: "Premissas frágeis, CAPEX mal definido e baixa previsibilidade regulatória.", solution: "Consultoria Regulatória, Energia Solar e Eletropostos" },
  { title: "Empresas com frotas elétricas", context: "Operações que precisam transformar recarga em infraestrutura escalável.", risks: "Demanda insuficiente, carregadores sem adequação elétrica e baixa monetização.", solution: "Eletropostos e Projetos Elétricos" },
];

const caseItems = [
  { tag: "Projeto fotovoltaico", segment: "Agronegócio", title: "Estudo técnico fotovoltaico", label: "Em atualização", context: "Operação com consumo recorrente e necessidade de reduzir exposição tarifária.", challenge: "Estruturar estudo de viabilidade sem assumir premissas comerciais frágeis.", strategy: "Análise de consumo, cenário técnico e rota de implantação fotovoltaica.", deliverables: "Diagnóstico, memorial preliminar e próximos passos técnicos." },
  { tag: "Análise regulatória", segment: "Integradores solares", title: "Defesa técnica de conexão", label: "Estudo técnico", context: "Solicitação de conexão com exigências adicionais da concessionária.", challenge: "Avaliar a base técnica da negativa e organizar resposta consistente.", strategy: "Auditoria do estudo e construção de argumentação técnica e regulatória.", deliverables: "Parecer técnico, matriz de documentos e estratégia administrativa." },
  { tag: "Infraestrutura elétrica", segment: "Indústrias", title: "Ampliação de carga", label: "Em atualização", context: "Unidade comercial ou industrial com necessidade de expansão operacional.", challenge: "Compatibilizar demanda, proteção, entrada de energia e aprovação.", strategy: "Projeto elétrico, estudos e interface técnica com a concessionária.", deliverables: "Diagramas, memoriais, estudos e documentação de aprovação." },
  { tag: "Mobilidade elétrica", segment: "Empresas com frotas elétricas", title: "Viabilidade de recarga", label: "Estudo técnico", context: "Avaliação de ponto de recarga para operação aberta ou frota própria.", challenge: "Entender demanda, carregadores e adequações antes do investimento.", strategy: "Estudo de viabilidade, infraestrutura e expansão por fases.", deliverables: "Mapa de cargas, escopo técnico e plano de implantação." },
];

const articles = [
  { category: "Regulação e concessionárias", title: "Como organizar uma defesa técnica em casos de conexão negada", summary: "Critérios, documentos e cuidados para reduzir ruído técnico em tratativas com concessionárias.", read: "6 min" },
  { category: "Energia Solar", title: "O que avaliar antes de investir em geração fotovoltaica", summary: "Consumo, tarifa, área, demanda e homologação vistos como decisão de engenharia.", read: "5 min" },
  { category: "Projetos Elétricos", title: "Aumento de carga: sinais de que a infraestrutura precisa ser revista", summary: "Quando expansão operacional exige estudos, proteção, entrada de energia e nova documentação.", read: "7 min" },
  { category: "Mobilidade Elétrica", title: "Eletropostos: infraestrutura elétrica antes do carregador", summary: "Demanda, ponto de conexão e operação precisam caminhar junto com a escolha dos equipamentos.", read: "5 min" },
  { category: "Mercado Livre", title: "Energia como decisão estratégica para empresas", summary: "Pontos de atenção para avaliar contratação, risco e gestão de energia.", read: "4 min" },
  { category: "Gestão e eficiência de energia", title: "Documentos que aceleram uma análise técnica de energia", summary: "Uma lista prática para iniciar diagnósticos com mais precisão e menos retrabalho.", read: "4 min" },
];

const meta: Record<string, { title: string; description: string }> = {
  "/": { title: "Renovera | Engenharia, energia e regulação", description: "Portal institucional da Renovera para soluções de energia, engenharia elétrica, regulação e mobilidade elétrica." },
  "/solucoes": { title: "Soluções Renovera", description: "Energia solar, consultoria regulatória, projetos elétricos e eletropostos com escopo técnico claro." },
  "/segmentos": { title: "Segmentos atendidos | Renovera", description: "Soluções de energia para indústrias, comércios, agronegócio, condomínios, integradores e operadores." },
  "/cases": { title: "Cases e projetos | Renovera", description: "Estrutura preparada para cases técnicos da Renovera, sem dados comerciais inventados." },
  "/insights": { title: "Renovera Insights", description: "Central de conteúdos sobre regulação, energia solar, projetos elétricos e mobilidade elétrica." },
  "/sobre": { title: "Sobre a Renovera", description: "Conheça a atuação técnica da Renovera em engenharia, energia e regulação." },
  "/contato": { title: "Contato | Renovera", description: "Triagem comercial da Renovera via WhatsApp e e-mail." },
};

function routePath() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const base = "/renovera-landings-publicas";
  return path.startsWith(base) ? path.slice(base.length) || "/" : path;
}

function wa(message: string) {
  return `${whatsapp}?text=${encodeURIComponent(message)}`;
}

function localHref(path: string) {
  return path === "/" ? "./" : path.replace(/^\//, "");
}

function Icon({ name }: { name: IconName }) {
  const common = { viewBox: "0 0 48 48", "aria-hidden": true, focusable: false } as const;
  const icons: Record<IconName, ReactElement> = {
    solar: <svg {...common}><circle cx="24" cy="19" r="7" /><path d="M24 5v5M24 28v5M10 19H5M43 19h-5M14 9l3 3M34 9l-3 3M14 29l3-3M34 29l-3-3M9 40h30M14 34h20" /></svg>,
    regulatorio: <svg {...common}><path d="M13 11h22v26H13zM18 17h12M18 23h12M18 29h7M34 16l5 5-12 12-6 1 1-6z" /></svg>,
    projetos: <svg {...common}><path d="M8 34h32M12 34V14l12-6 12 6v20M18 34V20h12v14M8 20h8M32 20h8M24 8v8" /></svg>,
    eletropostos: <svg {...common}><path d="M15 38V10h15l4 5v23M19 17h8M30 21h4c3 0 5 2 5 5v6c0 3-2 5-5 5M19 38h15M22 25h5l-4 8h6" /></svg>,
    diagnostico: <svg {...common}><path d="M8 34l10-10 7 6 15-17M8 40h32M12 14h10M12 20h6" /></svg>,
    aprovacao: <svg {...common}><path d="M12 9h19l5 5v25H12zM30 9v7h6M18 27l4 4 9-11" /></svg>,
    performance: <svg {...common}><path d="M24 6v8M24 34v8M6 24h8M34 24h8M12 12l6 6M30 30l6 6M36 12l-6 6M18 30l-6 6M24 16a8 8 0 1 1 0 16 8 8 0 0 1 0-16z" /></svg>,
  };
  return icons[name];
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M24 7a16.9 16.9 0 0 0-14.3 26L8 41l8.2-1.8A17 17 0 1 0 24 7z" />
      <path d="M18.4 16.8c-.4-.9-.8-.9-1.2-.9h-1c-.4 0-1 .1-1.5.7s-2 1.9-2 4.7 2.1 5.5 2.4 5.9c.3.4 4.1 6.3 10.2 8.6 5 1.9 6.1 1.1 7.2 1s3.6-1.5 4.1-2.9.5-2.6.3-2.9-.5-.4-1.1-.7-3.6-1.8-4.2-2-1-.3-1.4.3-1.6 2-2 2.4-.7.4-1.3.1a13.7 13.7 0 0 1-4.1-2.5 15.2 15.2 0 0 1-2.8-3.5c-.3-.6 0-.9.2-1.2.3-.3.6-.7.9-1 .3-.4.4-.6.6-1 .2-.4.1-.8 0-1.1s-1.4-3.4-1.9-4.7" />
    </svg>
  );
}

function NavLink({ href, children }: { href: string; children: string }) {
  const current = routePath();
  const normalized = href === "./" ? "/" : `/${href.replace(/^\/+/, "")}`;
  return <a href={href} className={current === normalized ? "active" : ""}>{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled || open ? "solid" : ""}`}>
      <a className="brand" href="./" aria-label="Renovera">
        <img src={`${assetBase}logo-renovera.png`} alt="Renovera" />
      </a>
      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Abrir menu">
        <span />
      </button>
      <nav className={open ? "open" : ""} aria-label="Menu principal">
        <NavLink href="./">Início</NavLink>
        <div className="mega-trigger">
          <a href="solucoes">Soluções</a>
          <div className="mega-menu">
            {solutions.map((item) => (
              <a key={item.id} href={item.url}>
                <Icon name={item.icon} />
                <strong>{item.title}</strong>
                <span>{item.desc}</span>
              </a>
            ))}
          </div>
        </div>
        <NavLink href="segmentos">Segmentos</NavLink>
        <NavLink href="cases">Cases</NavLink>
        <NavLink href="insights">Insights</NavLink>
        <NavLink href="sobre">A Renovera</NavLink>
        <NavLink href="contato">Contato</NavLink>
      </nav>
      <a className="nav-cta" href={wa("Olá, Renovera. Gostaria de conversar com um especialista sobre uma solução de energia para minha operação.")}>Falar com um especialista</a>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src={`${assetBase}logo-renovera.png`} alt="Renovera" />
          <p>Engenharia, energia e regulação para decisões técnicas, comerciais e operacionais que exigem clareza.</p>
        </div>
        <div><h3>Soluções</h3>{solutions.map((s) => <a key={s.id} href={s.url}>{s.title}</a>)}</div>
        <div><h3>Institucional</h3><a href="sobre">Sobre</a><a href="cases">Cases</a><a href="insights">Insights</a><a href="contato">Contato</a><a href="canal-de-etica">Canal de Ética</a></div>
        <div><h3>Contato</h3><a href={whatsapp}>+55 19 99651-4827</a><a href={`mailto:${email}`}>{email}</a><p>{address}</p></div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Renovera. Todos os direitos reservados.</span>
        <a href="politica-de-privacidade">Política de Privacidade</a>
        <a href="termos-de-uso">Termos de Uso</a>
        <a href="canal-de-etica">Canal de Ética</a>
      </div>
    </footer>
  );
}

function HeroVisual() {
  return (
    <div className="engineering-visual" aria-label="Composição visual de engenharia energética">
      <div className="perspective-grid" />
      <div className="unifilar-line line-a" />
      <div className="unifilar-line line-b" />
      <div className="visual-core core-solar"><Icon name="solar" /><span>Solar</span></div>
      <div className="visual-core core-grid"><Icon name="projetos" /><span>Infraestrutura</span></div>
      <div className="visual-core core-reg"><Icon name="regulatorio" /><span>Regulação</span></div>
      <div className="visual-core core-ev"><Icon name="eletropostos" /><span>Mobilidade</span></div>
      <div className="editorial-panel">
        <span>Rota técnica</span>
        <strong>Viabilidade</strong>
        <strong>Engenharia</strong>
        <strong>Regulação</strong>
        <strong>Implantação</strong>
      </div>
    </div>
  );
}

function SectionHead({ kicker, title, text }: { kicker?: string; title: string; text: string }) {
  return <div className="section-head">{kicker && <p className="kicker">{kicker}</p>}<h2>{title}</h2><p>{text}</p></div>;
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="kicker">Engenharia, energia e regulação</p>
          <h1>Decisões de energia exigem clareza técnica antes do investimento.</h1>
          <p>A Renovera estrutura projetos, reduz riscos regulatórios, viabiliza infraestrutura e transforma desafios de energia em decisões mais seguras, eficientes e rentáveis.</p>
          <div className="actions"><a className="btn gold" href="#seletor">Encontrar a solução ideal</a><a className="btn ghost" href={wa("Olá, Renovera. Quero entender qual solução de energia faz sentido para minha operação.")}>Falar com a Renovera</a></div>
        </div>
        <HeroVisual />
      </section>
      <AuthorityBand />
      <ChallengeSelector />
      <Method />
      <SolutionBlocks />
      <SegmentPreview />
      <CasesPreview />
      <InsightsPreview />
      <FinalCta />
    </>
  );
}

function AuthorityBand() {
  const items = [
    ["Diagnóstico técnico", "diagnostico" as IconName],
    ["Engenharia e aprovação", "aprovacao" as IconName],
    ["Regulação e concessionárias", "regulatorio" as IconName],
    ["Implantação e performance", "performance" as IconName],
  ];
  return <section className="authority-band">{items.map(([label, icon]) => <div key={label}><Icon name={icon as IconName} /><span>{label}</span></div>)}</section>;
}

function ChallengeSelector() {
  return (
    <section className="section challenges" id="seletor">
      <SectionHead title="Qual decisão de energia está na sua frente?" text="Escolha o desafio principal e siga para a solução técnica mais adequada." />
      <div className="challenge-layout">
        {solutions.map((s, index) => (
          <a className={`challenge-card ${index === 0 ? "featured" : ""} tone-${s.tone}`} href={s.url} key={s.id}>
            <span className="card-number">0{index + 1}</span>
            <Icon name={s.icon} />
            <small>{s.title}</small>
            <h3>{s.problem}</h3>
            <p>{s.desc}</p>
            <strong>{s.id === "solar" ? "Simular sistema solar" : s.id === "regulatorio" ? "Enviar parecer para análise" : s.id === "projetos" ? "Solicitar diagnóstico elétrico" : "Avaliar meu eletroposto"}</strong>
          </a>
        ))}
      </div>
    </section>
  );
}

function Method() {
  const steps = [
    ["01", "Diagnóstico e viabilidade", "Leitura técnica, comercial e regulatória antes de comprometer CAPEX."],
    ["02", "Engenharia e aprovação", "Projetos, estudos, documentação e interface com concessionárias."],
    ["03", "Implantação e performance", "Execução, comissionamento, acompanhamento e expansão futura."],
  ];
  return (
    <section className="section method-section">
      <SectionHead title="Da análise inicial ao ativo em operação." text="Um fluxo de decisão para transformar diagnóstico em projeto defensável." />
      <div className="method-flow">
        {steps.map(([number, title, text]) => (
          <article key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SolutionBlocks() {
  return (
    <section className="section solutions-editorial">
      <SectionHead title="Soluções principais" text="Cada frente resolve uma parte da cadeia de decisão energética: viabilidade, conexão, projeto, implantação e operação." />
      <div className="solution-bento">
        {solutions.map((s, index) => (
          <article className={`solution-panel tone-${s.tone} ${index === 1 ? "wide" : ""}`} key={s.id}>
            <Icon name={s.icon} />
            <small>{s.eyebrow}</small>
            <h3>{s.title}</h3>
            <p>{s.problem}</p>
            <ul>{s.scope.map((x) => <li key={x}>{x}</li>)}</ul>
            <a className="text-cta" href={s.url}>{s.cta}</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function SegmentPreview() {
  return (
    <section className="section segment-preview">
      <div className="split-head">
        <SectionHead title="Segmentos atendidos" text="Contextos diferentes exigem rotas técnicas diferentes. A Renovera conecta engenharia e regulação ao risco de cada operação." />
        <a className="btn dark" href="segmentos">Ver soluções por segmento</a>
      </div>
      <div className="segment-strip">
        {segments.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.context}</p><span>{item.solution}</span></article>)}
      </div>
    </section>
  );
}

function CasesPreview() {
  return (
    <section className="section cases-preview">
      <SectionHead title="Projetos técnicos em análise" text="Estrutura pronta para receber cases reais, sem números, clientes ou indicadores inventados." />
      <div className="case-ledger">
        {caseItems.slice(0, 3).map((item) => <CaseCard key={item.title + item.tag} item={item} />)}
      </div>
    </section>
  );
}

function CaseCard({ item }: { item: typeof caseItems[number] }) {
  return (
    <article className="case-card">
      <div className="case-meta"><span>{item.tag}</span><span>{item.label}</span></div>
      <h3>{item.title}</h3>
      <dl>
        <div><dt>Contexto</dt><dd>{item.context}</dd></div>
        <div><dt>Desafio</dt><dd>{item.challenge}</dd></div>
        <div><dt>Estratégia aplicada</dt><dd>{item.strategy}</dd></div>
        <div><dt>Entregáveis</dt><dd>{item.deliverables}</dd></div>
      </dl>
      <a className="text-cta" href="cases">Explorar case</a>
    </article>
  );
}

function InsightsPreview() {
  return (
    <section className="section insights-preview">
      <SectionHead title="Inteligência aplicada ao setor elétrico." text="Conteúdo técnico como apoio para decisões de investimento, conexão, infraestrutura e operação." />
      <div className="magazine-grid">
        <ArticleCard article={articles[0]} featured />
        <div className="magazine-side">
          {articles.slice(1, 3).map((article) => <ArticleCard article={article} key={article.title} />)}
        </div>
      </div>
    </section>
  );
}

function ArticleCard({ article, featured = false }: { article: typeof articles[number]; featured?: boolean }) {
  return (
    <article className={`article-card ${featured ? "featured" : ""}`}>
      <span>{article.category}</span>
      <h3>{article.title}</h3>
      <p>{article.summary}</p>
      <div><small>{article.read}</small><a href={`insights?article=${encodeURIComponent(article.title)}`}>Ler análise</a></div>
    </article>
  );
}

function FinalCta() {
  return (
    <section className="final-cta">
      <div>
        <h2>Seu desafio de energia precisa de uma resposta tecnicamente defensável.</h2>
        <p>Converse com a Renovera para estruturar uma rota segura de redução de custos, aprovação de infraestrutura, conexão, implantação ou expansão.</p>
      </div>
      <div className="actions"><a className="btn gold" href={wa("Olá, Renovera. Quero estruturar uma rota técnica para meu desafio de energia.")}>Falar no WhatsApp</a><a className="btn ghost" href="solucoes">Conhecer todas as soluções</a></div>
    </section>
  );
}

function PageHero({ title, text, variant = "default" }: { title: string; text: string; variant?: string }) {
  return <section className={`page-hero ${variant}`}><div><p className="kicker">Renovera</p><h1>{title}</h1><p>{text}</p></div><div className="page-hero-mark" /></section>;
}

function SolutionsPage() {
  return (
    <main className="page-main">
      <PageHero title="Soluções Renovera" text="Um mapa de decisões para energia solar, regulação, infraestrutura elétrica e mobilidade." variant="decision-map" />
      <div className="solution-detail-list">
        {solutions.map((s) => (
          <section className="solution-detail" key={s.id}>
            <div><Icon name={s.icon} /><small>{s.eyebrow}</small><h2>{s.title}</h2><p>{s.problem}</p></div>
            <div className="detail-grid">
              <p><b>Para quem é indicada:</b> {s.fit}</p>
              <p><b>Escopo:</b> {s.desc}</p>
              <ul>{s.scope.map((x) => <li key={x}>{x}</li>)}</ul>
              <div className="actions"><a className="btn gold small" href={s.url}>{s.cta}</a><a className="btn light small" href={wa(`Olá, Renovera. Gostaria de falar sobre ${s.title}.`)}>Conversar no WhatsApp</a></div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

function SegmentsPage() {
  const [filter, setFilter] = useState(segments[0].title);
  const active = segments.find((item) => item.title === filter) || segments[0];
  return (
    <main className="page-main">
      <PageHero title="Soluções por contexto operacional" text="A Renovera adapta a análise ao risco, à operação e à decisão energética de cada segmento." />
      <div className="segment-page">
        <aside>{segments.map((item) => <button className={active.title === item.title ? "selected" : ""} onClick={() => setFilter(item.title)} key={item.title}>{item.title}</button>)}</aside>
        <article>
          <h2>{active.title}</h2>
          <p><b>Contexto operacional:</b> {active.context}</p>
          <p><b>Riscos comuns:</b> {active.risks}</p>
          <p><b>Soluções Renovera:</b> {active.solution}</p>
          <a className="btn gold" href={wa(`Olá, Renovera. Quero avaliar soluções para ${active.title}.`)}>Solicitar análise contextual</a>
        </article>
      </div>
    </main>
  );
}

function CasesPage() {
  const [solutionFilter, setSolutionFilter] = useState("Todos");
  const [segmentFilter, setSegmentFilter] = useState("Todos");
  const solutionOptions = ["Todos", ...Array.from(new Set(caseItems.map((c) => c.tag)))];
  const segmentOptions = ["Todos", ...Array.from(new Set(caseItems.map((c) => c.segment)))];
  const shown = caseItems.filter((c) => (solutionFilter === "Todos" || c.tag === solutionFilter) && (segmentFilter === "Todos" || c.segment === segmentFilter));
  return (
    <main className="page-main">
      <PageHero title="Cases e projetos" text="Uma biblioteca visual preparada para receber projetos reais, mantendo estrutura técnica e campos editáveis." />
      <div className="filter-panel"><select value={solutionFilter} onChange={(e) => setSolutionFilter(e.target.value)}>{solutionOptions.map((o) => <option key={o}>{o}</option>)}</select><select value={segmentFilter} onChange={(e) => setSegmentFilter(e.target.value)}>{segmentOptions.map((o) => <option key={o}>{o}</option>)}</select></div>
      <div className="case-ledger">{shown.map((item) => <CaseCard key={item.title + item.tag} item={item} />)}</div>
      <FinalCta />
    </main>
  );
}

function InsightsPage() {
  const params = new URLSearchParams(window.location.search);
  const articleTitle = params.get("article");
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("Todos");
  const categories = ["Todos", ...Array.from(new Set(articles.map((a) => a.category)))];
  const shown = articles.filter((a) => (cat === "Todos" || a.category === cat) && `${a.title} ${a.summary}`.toLowerCase().includes(query.toLowerCase()));
  const article = articles.find((a) => a.title === articleTitle);
  if (article) {
    return <main className="page-main"><PageHero title={article.title} text={article.summary} /><article className="article-body"><span>{article.category} - {article.read}</span><p>Este conteúdo inicial é uma estrutura institucional para cadastro editorial. Ele delimita tema, intenção e abordagem, sem afirmar publicação externa, resultados ou dados não validados.</p><p>Novos artigos podem ser cadastrados no objeto <code>articles</code> do app institucional.</p><a className="text-cta" href="insights">Voltar para Insights</a></article></main>;
  }
  return (
    <main className="page-main">
      <PageHero title="Renovera Insights" text="Central editorial sobre regulação, energia solar, projetos elétricos, mobilidade elétrica, Mercado Livre e gestão de energia." />
      <div className="search-row"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar análise técnica" /><select value={cat} onChange={(e) => setCat(e.target.value)}>{categories.map((c) => <option key={c}>{c}</option>)}</select></div>
      <div className="magazine-grid">{shown[0] && <ArticleCard article={shown[0]} featured />}<div className="magazine-side">{shown.slice(1).map((a) => <ArticleCard article={a} key={a.title} />)}</div></div>
      <FinalCta />
    </main>
  );
}

function AboutPage() {
  const items = [
    ["Propósito", "Apoiar decisões energéticas com engenharia aplicada, visão regulatória e linguagem comercial clara."],
    ["Forma de atuação", "Diagnóstico, viabilidade, projeto, documentação, interface técnica, implantação e acompanhamento."],
    ["Compromisso técnico", "Escopos defensáveis, documentação clara e comunicação sem promessas de aprovação garantida."],
    ["Ética", "Atuação responsável, transparência nas premissas e respeito aos limites de cada análise."],
    ["Visão de longo prazo", "Projetos pensados para operação, expansão, proteção de ativos e resiliência."],
    ["Engenharia e regulação", "Integração entre infraestrutura, concessionárias, normas e estratégia de investimento."],
  ];
  return <main className="page-main"><PageHero title="Engenharia que conecta estratégia, energia e execução." text="A Renovera estrutura projetos, destrava conexões, reduz riscos técnicos e transforma energia em resultado operacional." /><div className="narrative-grid">{items.map(([title, text]) => <article key={title}><span>{title}</span><p>{text}</p></article>)}</div><FinalCta /></main>;
}

function ContactPage() {
  const [form, setForm] = useState({ nome: "", empresa: "", email: "", whats: "", cidade: "", segmento: "", solucao: "", desafio: "" });
  const set = (key: keyof typeof form, value: string) => setForm((old) => ({ ...old, [key]: value }));
  function submit(event: FormEvent) {
    event.preventDefault();
    const required = ["nome", "email", "whats", "cidade", "segmento", "solucao", "desafio"] as const;
    const missing = required.filter((key) => !form[key].trim());
    if (missing.length) {
      alert("Preencha os campos obrigatórios antes de abrir o WhatsApp.");
      return;
    }
    const message = `Olá, Renovera. Quero enviar meu desafio para análise.\nNome: ${form.nome}\nEmpresa: ${form.empresa || "Não informado"}\nE-mail: ${form.email}\nWhatsApp: ${form.whats}\nCidade/UF: ${form.cidade}\nSegmento: ${form.segmento}\nSolução de interesse: ${form.solucao}\nDescrição do desafio: ${form.desafio}`;
    window.open(wa(message), "_blank", "noopener,noreferrer");
  }
  return (
    <main className="page-main">
      <PageHero title="Conte qual decisão de energia você precisa tomar." text="A triagem organiza as informações iniciais e abre uma mensagem estruturada para o WhatsApp comercial da Renovera." />
      <div className="contact-layout">
        <form className="contact-form" onSubmit={submit}>
          <label>Nome*<input value={form.nome} onChange={(e) => set("nome", e.target.value)} /></label>
          <label>Empresa<input value={form.empresa} onChange={(e) => set("empresa", e.target.value)} /></label>
          <label>E-mail*<input value={form.email} onChange={(e) => set("email", e.target.value)} /></label>
          <label>WhatsApp*<input value={form.whats} onChange={(e) => set("whats", e.target.value)} /></label>
          <label>Cidade e UF*<input value={form.cidade} onChange={(e) => set("cidade", e.target.value)} /></label>
          <label>Segmento*<select value={form.segmento} onChange={(e) => set("segmento", e.target.value)}><option value="">Selecione</option>{segments.map((s) => <option key={s.title}>{s.title}</option>)}</select></label>
          <label>Solução de interesse*<select value={form.solucao} onChange={(e) => set("solucao", e.target.value)}><option value="">Selecione</option>{solutions.map((s) => <option key={s.id}>{s.title}</option>)}</select></label>
          <label>Descrição do desafio*<textarea value={form.desafio} onChange={(e) => set("desafio", e.target.value)} /></label>
          <button className="btn gold" type="submit">Enviar meu desafio para análise</button>
        </form>
        <aside className="contact-aside"><h2>Contato oficial</h2><a href={whatsapp}>+55 19 99651-4827</a><a href={`mailto:${email}`}>{email}</a><p>{address}</p></aside>
      </div>
    </main>
  );
}

function LegalPage({ type }: { type: "privacy" | "terms" | "ethics" }) {
  const content = {
    privacy: ["Política de Privacidade", "A Renovera utiliza os dados enviados em formulários apenas para contato comercial, triagem técnica e retorno sobre solicitações feitas pelo próprio usuário."],
    terms: ["Termos de Uso", "As informações deste site têm caráter institucional e não substituem análise técnica, regulatória ou comercial específica para cada projeto."],
    ethics: ["Canal de Ética", "Use este canal para relatar situações que exijam análise ética, transparência ou integridade. O contato inicial pode ser feito pelo e-mail oficial da Renovera."],
  }[type];
  return <main className="page-main"><PageHero title={content[0]} text={content[1]} /><article className="article-body"><p>Contato oficial: <a href={`mailto:${email}`}>{email}</a>.</p><p>Endereço: {address}.</p></article></main>;
}

function App() {
  const [path, setPath] = useState(routePath());
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) return;
      event.preventDefault();
      const nextUrl = new URL(href, window.location.href);
      window.history.pushState({}, "", nextUrl.pathname + nextUrl.search);
      setPath(routePath());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const onPop = () => setPath(routePath());
    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPop);
    return () => { document.removeEventListener("click", onClick); window.removeEventListener("popstate", onPop); };
  }, []);
  useEffect(() => {
    const data = meta[path] || meta["/"];
    document.title = data.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", data.description);
  }, [path]);
  const page = useMemo(() => {
    if (path === "/solucoes") return <SolutionsPage />;
    if (path === "/segmentos") return <SegmentsPage />;
    if (path === "/cases") return <CasesPage />;
    if (path === "/insights") return <InsightsPage />;
    if (path === "/sobre") return <AboutPage />;
    if (path === "/contato") return <ContactPage />;
    if (path === "/politica-de-privacidade") return <LegalPage type="privacy" />;
    if (path === "/termos-de-uso") return <LegalPage type="terms" />;
    if (path === "/canal-de-etica") return <LegalPage type="ethics" />;
    return <Home />;
  }, [path]);
  return <><Header />{page}<Footer /><a className="whatsapp-float" href={wa("Olá, Renovera. Gostaria de falar com um especialista.")} aria-label="Falar no WhatsApp"><WhatsAppIcon /></a></>;
}

export default App;
