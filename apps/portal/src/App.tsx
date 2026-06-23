import { FormEvent, useEffect, useMemo, useState } from "react";

const whatsapp = "https://wa.me/5519996514827";
const email = "contato@renovera.com.br";
const address = "Rua Visconde de Rio Branco, 106, São João da Boa Vista - SP";

const landings = {
  solar: "https://renovera1.github.io/renovera-energia-solar/",
  regulatoria: "https://renovera1.github.io/renovera-consultoria-regulatoria/",
  projetos: "https://renovera1.github.io/renovera-projetos-eletricos/",
  eletropostos: "https://renovera1.github.io/renovera-eletroposto/",
};

const solutions = [
  {
    id: "solar",
    title: "Energia Solar",
    problem: "Conta de energia alta, necessidade de previsibilidade e decisão de investimento com base técnica.",
    desc: "Dimensionamento, análise de consumo, projeto, homologação, implantação e viabilidade fotovoltaica.",
    fit: "Empresas, propriedades rurais, condomínios e operações com consumo relevante.",
    scope: ["Análise de consumo e tarifa", "Dimensionamento técnico", "Projeto e homologação", "Implantação e acompanhamento"],
    url: landings.solar,
    icon: "☀",
  },
  {
    id: "regulatoria",
    title: "Consultoria Regulatória",
    problem: "Negativas, inversão de fluxo, estudos inconsistentes ou impasses com concessionárias.",
    desc: "Defesa técnica, auditoria de estudos, estratégia administrativa, ANEEL, concessionárias e parecer técnico.",
    fit: "Consumidores, integradores, investidores e operações com conexão travada.",
    scope: ["Auditoria técnica", "Parecer regulatório", "Estratégia perante concessionárias", "Documentação de defesa"],
    url: landings.regulatoria,
    icon: "§",
  },
  {
    id: "projetos",
    title: "Projetos Elétricos",
    problem: "Ampliação, entrada de energia, proteção, seletividade, demanda ou infraestrutura insuficiente.",
    desc: "Projetos industriais e comerciais, subestações de consumidor, estudos elétricos e aprovação.",
    fit: "Indústrias, comércios, empreendimentos e operações críticas em expansão.",
    scope: ["Estudos elétricos", "Entrada de energia", "Proteção e seletividade", "Aumento de carga e aprovação"],
    url: landings.projetos,
    icon: "⚡",
  },
  {
    id: "eletropostos",
    title: "Eletropostos",
    problem: "Implantação de recarga veicular exige viabilidade, demanda, infraestrutura e operação rentável.",
    desc: "Estudo de viabilidade, carregadores AC/DC, adequação elétrica, projeto, implantação e expansão.",
    fit: "Postos, estacionamentos, frotas, condomínios, varejo e operadores de ativos.",
    scope: ["Viabilidade técnica e comercial", "Adequação de demanda", "Projeto de infraestrutura", "Implantação e monetização"],
    url: landings.eletropostos,
    icon: "↯",
  },
];

const segments = [
  ["Indústrias e plantas produtivas", "Continuidade operacional, demanda contratada, expansão e proteção elétrica.", "Projetos Elétricos, Energia Solar e Consultoria Regulatória"],
  ["Hospitais, clínicas e operações críticas", "Segurança elétrica, redundância, qualidade de energia e risco regulatório.", "Projetos Elétricos e Consultoria Regulatória"],
  ["Comércio, varejo, shoppings e serviços", "Custo de energia, infraestrutura para expansão e recarga veicular.", "Energia Solar, Projetos Elétricos e Eletropostos"],
  ["Agronegócio", "Consumo intensivo, bombeamento, geração própria e conexão em áreas rurais.", "Energia Solar e Projetos Elétricos"],
  ["Condomínios e empreendimentos imobiliários", "Entrada de energia, áreas comuns, usinas, recarga e documentação técnica.", "Projetos Elétricos, Energia Solar e Eletropostos"],
  ["Integradores solares", "Conexões negadas, inversão de fluxo, documentação e defesa técnica.", "Consultoria Regulatória"],
  ["Investidores e operadores de ativos", "Due diligence técnica, viabilidade e performance de ativos energéticos.", "Consultoria Regulatória, Energia Solar e Eletropostos"],
  ["Empresas com frota e mobilidade elétrica", "Demanda elétrica, carregadores, expansão e monetização da recarga.", "Eletropostos e Projetos Elétricos"],
];

const caseItems = [
  { tag: "Energia Solar", title: "Case em destaque", label: "Projeto em atualização", context: "Operação com consumo recorrente e necessidade de reduzir exposição tarifária.", challenge: "Estruturar estudo de viabilidade sem assumir premissas comerciais frágeis.", solution: "Análise de consumo, cenário técnico e rota de implantação fotovoltaica.", deliverables: "Diagnóstico, memorial preliminar e próximos passos técnicos." },
  { tag: "Consultoria Regulatória", title: "Caso regulatório", label: "Estudo técnico", context: "Solicitação de conexão com exigências adicionais da concessionária.", challenge: "Avaliar a base técnica da negativa e organizar resposta consistente.", solution: "Auditoria do estudo e construção de argumentação técnica e regulatória.", deliverables: "Parecer técnico, matriz de documentos e estratégia administrativa." },
  { tag: "Projetos Elétricos", title: "Infraestrutura em implantação", label: "Projeto em atualização", context: "Ampliação de carga em unidade comercial ou industrial.", challenge: "Compatibilizar demanda, proteção, entrada de energia e aprovação.", solution: "Projeto elétrico, estudos e interface técnica com a concessionária.", deliverables: "Diagramas, memoriais, estudos e documentação de aprovação." },
  { tag: "Eletropostos", title: "Estudo de recarga veicular", label: "Infraestrutura em implantação", context: "Avaliação de ponto de recarga para operação aberta ou frota própria.", challenge: "Entender demanda, carregadores e adequações antes do investimento.", solution: "Estudo de viabilidade, infraestrutura e expansão por fases.", deliverables: "Mapa de cargas, escopo técnico e plano de implantação." },
];

const articles = [
  { category: "Regulação e concessionárias", title: "Como organizar uma defesa técnica em casos de conexão negada", summary: "Critérios, documentos e cuidados para reduzir ruído técnico em tratativas com concessionárias." },
  { category: "Energia solar", title: "O que avaliar antes de investir em geração fotovoltaica", summary: "Consumo, tarifa, área, demanda e homologação vistos como decisão de engenharia." },
  { category: "Projetos elétricos", title: "Aumento de carga: sinais de que a infraestrutura precisa ser revista", summary: "Quando expansão operacional exige estudos, proteção, entrada de energia e nova documentação." },
  { category: "Mobilidade elétrica", title: "Eletropostos: infraestrutura elétrica antes do carregador", summary: "Demanda, ponto de conexão e operação precisam caminhar junto com a escolha dos equipamentos." },
  { category: "Mercado Livre", title: "Energia como decisão estratégica para empresas", summary: "Pontos de atenção para avaliar contratação, risco e gestão de energia." },
  { category: "Guias técnicos", title: "Documentos que aceleram uma análise técnica de energia", summary: "Uma lista prática para iniciar diagnósticos com mais precisão e menos retrabalho." },
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

function NavLink({ href, children }: { href: string; children: string }) {
  return <a href={href} className={routePath() === href ? "active" : ""}>{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="brand" href="./">
        <img src="/logo-renovera.png" alt="Renovera" />
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
        <div>
          <img src="/logo-renovera.png" alt="Renovera" />
          <p>Engenharia, energia e regulação para decisões técnicas, comerciais e operacionais que exigem clareza.</p>
        </div>
        <div><h3>Soluções</h3>{solutions.map((s) => <a key={s.id} href={s.url}>{s.title}</a>)}</div>
        <div><h3>Institucional</h3><a href="sobre">Sobre</a><a href="cases">Cases</a><a href="insights">Insights</a><a href="contato">Contato</a><a href="canal-de-etica">Canal de Ética</a></div>
        <div><h3>Contato</h3><a href={whatsapp}>WhatsApp comercial</a><a href={`mailto:${email}`}>{email}</a><p>{address}</p></div>
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
    <div className="intelligence-panel" aria-label="Central visual de inteligência energética">
      <div className="panel-top"><span>Renovera Energy OS</span><b>online</b></div>
      <div className="energy-map">
        <i className="node solar">SOL</i><i className="node grid">REDE</i><i className="node law">REG</i><i className="node ev">EV</i>
        <span className="flow f1" /><span className="flow f2" /><span className="flow f3" />
      </div>
      <div className="metrics">
        <span><b>Risco</b><em>mapeado</em></span>
        <span><b>Conexão</b><em>em análise</em></span>
        <span><b>Ativo</b><em>planejado</em></span>
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Hub institucional Renovera</p>
          <h1>Engenharia, energia e regulação para decisões que não podem parar.</h1>
          <p>A Renovera une engenharia elétrica, energia solar, regulação e infraestrutura para reduzir custos, destravar projetos e estruturar operações mais seguras, eficientes e rentáveis.</p>
          <div className="actions"><a className="btn gold" href="#seletor">Encontrar minha solução</a><a className="btn ghost" href={wa("Olá, Renovera. Quero entender qual solução de energia faz sentido para minha operação.")}>Falar com a Renovera</a></div>
        </div>
        <HeroVisual />
      </section>
      <section className="authority">
        {["Engenharia aplicada", "Regulação e concessionárias", "Viabilidade e implantação", "Projetos para crescimento operacional"].map((item) => <span key={item}>{item}</span>)}
      </section>
      <section className="section" id="seletor">
        <SectionHead title="Qual desafio você precisa resolver?" text="Escolha o ponto de partida e avance para a página comercial correta." />
        <div className="challenge-grid">
          {[
            ["Quero reduzir minha conta de energia", "Energia solar com análise técnica e viabilidade.", landings.solar],
            ["Meu projeto foi negado pela concessionária", "Defesa técnica e estratégia regulatória.", landings.regulatoria],
            ["Preciso aprovar ou ampliar minha infraestrutura elétrica", "Projetos, estudos e interface técnica.", landings.projetos],
            ["Quero implantar um eletroposto", "Viabilidade, carregadores e infraestrutura.", landings.eletropostos],
          ].map(([title, text, url], index) => <a className="challenge-card" href={url} key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{text}</p><span>Ver solução</span></a>)}
        </div>
      </section>
      <Method />
      <SolutionBlocks />
      <SegmentPreview />
      <CasesPreview />
      <section className="section">
        <SectionHead title="Renovera Insights" text="Conteúdos para apoiar decisões técnicas, regulatórias e comerciais." />
        <div className="cards three">{articles.slice(0, 3).map((a) => <ArticleCard key={a.title} article={a} />)}</div>
      </section>
      <FinalCta />
    </>
  );
}

function SectionHead({ title, text }: { title: string; text: string }) {
  return <div className="section-head"><p className="eyebrow">Renovera</p><h2>{title}</h2><p>{text}</p></div>;
}

function Method() {
  return (
    <section className="section band">
      <SectionHead title="Da decisão ao ativo em operação." text="Um método para transformar diagnóstico técnico em avanço real." />
      <div className="cards three">
        {["Estratégia e viabilidade|Diagnóstico técnico, comercial e regulatório antes do investimento.", "Engenharia e aprovação|Projetos, documentação, interface com concessionárias e validação técnica.", "Implantação e performance|Execução, comissionamento, acompanhamento e expansão futura."].map((item, i) => {
          const [title, text] = item.split("|");
          return <article className="card" key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>;
        })}
      </div>
    </section>
  );
}

function SolutionBlocks() {
  return (
    <section className="section">
      <SectionHead title="Soluções principais" text="Quatro frentes conectadas por engenharia, regulação e visão de operação." />
      <div className="solution-grid">
        {solutions.map((s) => <article className="solution-card" key={s.id}><div className="icon">{s.icon}</div><h3>{s.title}</h3><p>{s.desc}</p><ul>{s.scope.map((x) => <li key={x}>{x}</li>)}</ul><a className="btn small" href={s.url}>Conhecer landing</a></article>)}
      </div>
    </section>
  );
}

function SegmentPreview() {
  return <section className="section band"><SectionHead title="Segmentos atendidos" text="Soluções orientadas ao contexto operacional de cada cliente." /><div className="cards three">{segments.slice(0, 6).map(([title, text]) => <a className="card link-card" href="segmentos" key={title}><h3>{title}</h3><p>{text}</p></a>)}</div></section>;
}

function CasesPreview() {
  return <section className="section"><SectionHead title="Cases e resultados" text="Estrutura pronta para receber cases reais, sem números ou clientes inventados." /><div className="filters">{["Energia Solar", "Consultoria Regulatória", "Projetos Elétricos", "Eletropostos", "Indústria", "Comércio", "Agronegócio", "Residencial"].map((x) => <span key={x}>{x}</span>)}</div><div className="cards two">{caseItems.slice(0, 2).map((item) => <CaseCard key={item.title + item.tag} item={item} />)}</div></section>;
}

function CaseCard({ item }: { item: typeof caseItems[number] }) {
  return <article className="case-card"><span>{item.label}</span><h3>{item.title}</h3><p><b>Contexto:</b> {item.context}</p><p><b>Desafio:</b> {item.challenge}</p><p><b>Solução:</b> {item.solution}</p><a href="cases">Ver case</a></article>;
}

function ArticleCard({ article }: { article: typeof articles[number] }) {
  return <article className="card article"><span>{article.category}</span><h3>{article.title}</h3><p>{article.summary}</p><a href={`insights?article=${encodeURIComponent(article.title)}`}>Ler estrutura</a></article>;
}

function FinalCta() {
  return <section className="final-cta"><h2>Seu desafio de energia precisa de uma resposta técnica.</h2><p>Converse com a Renovera e identifique a solução mais adequada para reduzir custos, proteger ativos, aprovar infraestrutura ou destravar sua conexão.</p><div className="actions"><a className="btn gold" href={wa("Olá, Renovera. Quero conversar sobre um desafio técnico de energia.")}>Falar no WhatsApp</a><a className="btn ghost" href="solucoes">Conhecer soluções</a></div></section>;
}

function SolutionsPage() {
  return <main className="page-main"><PageHero title="Soluções Renovera" text="Engenharia elétrica, energia solar, regulação e mobilidade elétrica com escopo claro e encaminhamento para a landing certa." /><div className="stack">{solutions.map((s) => <section className="detail-block" key={s.id}><div><span className="icon">{s.icon}</span><h2>{s.title}</h2><p>{s.problem}</p></div><div className="detail-grid"><p><b>Para quem é indicado:</b> {s.fit}</p><p><b>Escopo:</b> {s.desc}</p><ul>{s.scope.map((x) => <li key={x}>{x}</li>)}</ul><div className="actions"><a className="btn gold small" href={s.url}>Acessar landing</a><a className="btn ghost small" href={wa(`Olá, Renovera. Gostaria de falar sobre ${s.title}.`)}>WhatsApp</a></div></div></section>)}</div></main>;
}

function SegmentsPage() {
  return <main className="page-main"><PageHero title="Segmentos atendidos" text="A Renovera adapta a análise ao risco, à operação e ao tipo de decisão energética de cada segmento." /><div className="cards two">{segments.map(([title, challenge, solution]) => <article className="card" key={title}><h3>{title}</h3><p><b>Principais desafios:</b> {challenge}</p><p><b>Soluções recomendadas:</b> {solution}</p><a href={wa(`Olá, Renovera. Quero avaliar soluções para ${title}.`)}>Conversar sobre este segmento</a></article>)}</div></main>;
}

function CasesPage() {
  const [filter, setFilter] = useState("Todos");
  const options = ["Todos", ...solutions.map((s) => s.title)];
  const shown = filter === "Todos" ? caseItems : caseItems.filter((c) => c.tag === filter);
  return <main className="page-main"><PageHero title="Cases e projetos" text="Biblioteca visual preparada para receber projetos reais, com campos editáveis e sem dados comerciais fictícios." /><div className="filters">{options.map((o) => <button className={filter === o ? "selected" : ""} onClick={() => setFilter(o)} key={o}>{o}</button>)}</div><div className="cards two">{shown.map((item) => <CaseCard key={item.title + item.tag} item={item} />)}</div><FinalCta /></main>;
}

function InsightsPage() {
  const params = new URLSearchParams(window.location.search);
  const articleTitle = params.get("article");
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("Todos");
  const categories = ["Todos", ...Array.from(new Set(articles.map((a) => a.category)))];
  const shown = articles.filter((a) => (cat === "Todos" || a.category === cat) && `${a.title} ${a.summary}`.toLowerCase().includes(query.toLowerCase()));
  const article = articles.find((a) => a.title === articleTitle);
  if (article) return <main className="page-main"><PageHero title={article.title} text={article.summary} /><article className="article-body"><p>Este conteúdo inicial é uma estrutura institucional para cadastro editorial. Ele delimita tema, intenção e abordagem, sem afirmar publicação externa, resultados ou dados não validados.</p><p>Novos artigos podem ser cadastrados no objeto <code>articles</code> do app institucional.</p><a href="insights">Voltar para Insights</a></article></main>;
  return <main className="page-main"><PageHero title="Renovera Insights" text="Central de conteúdos sobre regulação, energia solar, projetos elétricos, mobilidade elétrica, Mercado Livre, eficiência e guias técnicos." /><div className="search-row"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar artigos" /><select value={cat} onChange={(e) => setCat(e.target.value)}>{categories.map((c) => <option key={c}>{c}</option>)}</select></div><div className="cards three">{shown.map((a) => <ArticleCard article={a} key={a.title} />)}</div><FinalCta /></main>;
}

function AboutPage() {
  return <main className="page-main"><PageHero title="Sobre a Renovera" text="Engenharia, energia e regulação aplicadas a decisões que exigem segurança técnica e clareza comercial." /><div className="cards two">{["Quem é a Renovera|Uma empresa voltada a estruturar projetos, destravar conexões, reduzir riscos técnicos e transformar energia em resultado operacional.", "Propósito|Apoiar decisões energéticas com engenharia aplicada, visão regulatória e linguagem comercial clara.", "Como trabalhamos|Diagnóstico, viabilidade, projeto, documentação, interface técnica, implantação e acompanhamento.", "Nossos pilares|Autoridade técnica, segurança, clareza, inovação, proximidade e capacidade de resolver problemas complexos.", "Atuação nacional|Atendimento técnico a demandas de energia e infraestrutura em diferentes contextos operacionais do Brasil.", "Ética e transparência|Conduta responsável, documentação clara e comunicação sem promessas de aprovação garantida."].map((x) => { const [t, p] = x.split("|"); return <article className="card" key={t}><h3>{t}</h3><p>{p}</p></article>; })}</div><FinalCta /></main>;
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
    const message = `Olá, Renovera. Vamos entender o meu desafio de energia.\nNome: ${form.nome}\nEmpresa: ${form.empresa || "Não informado"}\nE-mail: ${form.email}\nWhatsApp: ${form.whats}\nCidade/UF: ${form.cidade}\nSegmento: ${form.segmento}\nSolução de interesse: ${form.solucao}\nDesafio: ${form.desafio}`;
    window.open(wa(message), "_blank", "noopener,noreferrer");
  }
  return <main className="page-main"><PageHero title="Vamos entender o seu desafio de energia." text="Preencha a triagem e envie uma mensagem estruturada para o WhatsApp comercial da Renovera." /><form className="contact-form" onSubmit={submit}>{Object.entries({ nome: "Nome*", empresa: "Empresa", email: "E-mail*", whats: "WhatsApp*", cidade: "Cidade/UF*", segmento: "Segmento*", solucao: "Solução de interesse*", desafio: "Descrição do desafio*" }).map(([key, label]) => key === "desafio" ? <label key={key}>{label}<textarea value={form[key as keyof typeof form]} onChange={(e) => set(key as keyof typeof form, e.target.value)} /></label> : <label key={key}>{label}<input value={form[key as keyof typeof form]} onChange={(e) => set(key as keyof typeof form, e.target.value)} /></label>)}<button className="btn gold" type="submit">Abrir WhatsApp com mensagem</button></form><div className="contact-cards"><a href={whatsapp}>WhatsApp comercial</a><a href={`mailto:${email}`}>{email}</a><span>{address}</span></div></main>;
}

function LegalPage({ type }: { type: "privacy" | "terms" | "ethics" }) {
  const content = {
    privacy: ["Política de Privacidade", "A Renovera utiliza os dados enviados em formulários apenas para contato comercial, triagem técnica e retorno sobre solicitações feitas pelo próprio usuário."],
    terms: ["Termos de Uso", "As informações deste site têm caráter institucional e não substituem análise técnica, regulatória ou comercial específica para cada projeto."],
    ethics: ["Canal de Ética", "Use este canal para relatar situações que exijam análise ética, transparência ou integridade. O contato inicial pode ser feito pelo e-mail oficial da Renovera."],
  }[type];
  return <main className="page-main"><PageHero title={content[0]} text={content[1]} /><article className="article-body"><p>Contato oficial: <a href={`mailto:${email}`}>{email}</a>.</p><p>Endereço: {address}.</p></article></main>;
}

function PageHero({ title, text }: { title: string; text: string }) {
  return <section className="page-hero"><p className="eyebrow">Renovera</p><h1>{title}</h1><p>{text}</p></section>;
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
  return <><Header /><main>{page}</main><Footer /><a className="whatsapp-float" href={wa("Olá, Renovera. Gostaria de falar com um especialista.")} aria-label="Falar no WhatsApp">W</a></>;
}

export default App;


