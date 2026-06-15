import { useMemo, useState } from "react";
import LiveEditor from "./LiveEditor";

const whatsappLink =
  "https://wa.me/5500000000000?text=Ol%C3%A1%2C%20quero%20uma%20an%C3%A1lise%20regulat%C3%B3ria%20da%20Renovera%20sobre%20um%20caso%20de%20energia.";

const services = [
  {
    number: "01",
    title: "Defesa Contra Inversão de Fluxo de Potência",
    text: "Pareceres técnicos e contestações jurídicas fundamentadas para reverter reprovações de microgeração e minigeração indeferidas sem demonstração técnica suficiente.",
    cta: "Quero reverter uma negativa"
  },
  {
    number: "02",
    title: "Parecer Independente e Auditoria de Rede",
    text: "Auditoria de estudos de fluxo, curvas de carga, ponto de análise, memória de cálculo e premissas utilizadas pela distribuidora no parecer técnico.",
    cta: "Auditar estudo da concessionária"
  },
  {
    number: "03",
    title: "Engenharia Consultiva e Regulação ANEEL",
    text: "Interpretação estratégica da REN 1000/2021, REN 1098/2024, PRODIST e procedimentos aplicáveis para sustentar defesas administrativas robustas.",
    cta: "Validar enquadramento regulatório"
  },
  {
    number: "04",
    title: "Riscos Operacionais e Contratos de Energia",
    text: "Análise técnica e jurídica de contratos do Grupo A, demanda contratada, exposição tarifária, multas, energia reativa e riscos de infraestrutura.",
    cta: "Mapear risco do contrato"
  }
];

const sectors = [
  "Geradores e Desenvolvedores de Projetos",
  "Hospitais, Clínicas e Casas de Saúde",
  "Indústrias e Plantas de Grande Porte",
  "Fundos de Investimento e Operadores de Ativos"
];

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M16 3.2A12.7 12.7 0 0 0 5.1 22.4L3.6 28.8l6.6-1.5A12.7 12.7 0 1 0 16 3.2Zm0 22.9c-2 0-3.9-.6-5.6-1.7l-.4-.2-3.9.9.9-3.8-.2-.4a10.2 10.2 0 1 1 9.2 5.2Zm5.7-7.6c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-.9 1.2-.3.2-.6.1a8.4 8.4 0 0 1-2.5-1.6 9.4 9.4 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.8-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.2-.2-.4-.3-.7-.5Z" />
    </svg>
  );
}


function App() {
  const [utility, setUtility] = useState("CPFL");
  const [restriction, setRestriction] = useState("Inversão de Fluxo");
  const [power, setPower] = useState(75);
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const diagnostic = useMemo(() => {
    let score = 42;
    if (restriction === "Inversão de Fluxo") score += 24;
    if (restriction === "Demanda Incompatível") score += 16;
    if (power >= 75) score += 18;
    if (["CPFL", "Neoenergia Elektro", "Cemig", "Energisa"].includes(utility)) score += 8;

    const capped = Math.min(score, 96);
    const level = capped >= 76 ? "alto" : capped >= 58 ? "moderado" : "inicial";
    const thesis =
      restriction === "Inversão de Fluxo"
        ? "verificar nexo causal, ponto correto de análise, curvas utilizadas e transparência do estudo"
        : restriction === "Reprovação de Padrão"
        ? "avaliar aderência normativa, exigências técnicas e proporcionalidade da reprovação"
        : restriction === "Demanda Incompatível"
        ? "revisar demanda contratada, premissas de carga e impactos financeiros"
        : "identificar a natureza regulatória da restrição e a estratégia de contestação";

    return { score: capped, level, thesis };
  }, [utility, restriction, power]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const payload = {
      utility,
      restriction,
      power,
      email,
      cnpj,
      phone,
      diagnostic,
      createdAt: new Date().toISOString()
    };

    console.log("Triagem regulatória Renovera", payload);
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container headerInner">
          <a href="#inicio" className="brand" aria-label="Renovera Consultoria Regulatória">
            <img src="/logo-renovera.png" alt="Renovera" />
            <span>Consultoria Regulatória</span>
          </a>

          <nav className="nav">
            <a href="#atuacao">Áreas de Atuação</a>
            <a href="#atuacao">Defesa Regulatória</a>
            <a href="#legislacao">Legislação</a>
            <a href="#triagem">Diagnóstico</a>
          </nav>

          <a className="headerButton" href="#triagem">Agendar Consulta Estratégica</a>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="heroAura" />
          <div className="container heroGrid">
            <div className="heroContent">
              <span className="eyebrow">Inteligência técnica e segurança jurídica no setor elétrico</span>
              <h1>Não aceite uma negativa de conexão sem uma defesa técnica.</h1>
              <p>
                A Renovera atua na fronteira entre engenharia elétrica, regulação ANEEL e estratégia jurídica para proteger
                ativos, destravar acessos e confrontar decisões arbitrárias de concessionárias.
              </p>

              <div className="heroActions">
                <a className="primaryButton" href="#triagem">Analisar meu caso regulatório</a>
                <a className="secondaryButton" href="#atuacao">Ver linhas de defesa</a>
              </div>

              <div className="heroStats">
                <div>
                  <strong>REN 1000/2021</strong>
                  <span>fundamentação regulatória e contestação administrativa</span>
                </div>
                <div>
                  <strong>Fluxo de potência</strong>
                  <span>auditoria técnica de curvas, premissas e ponto de análise</span>
                </div>
                <div>
                  <strong>ART / CREA</strong>
                  <span>parecer independente com rastreabilidade técnica</span>
                </div>
              </div>
            </div>

            <div className="heroVisual" aria-label="Interface abstrata de defesa regulatória">
              <div className="regCard">
                <div className="regTop">
                  <span>Renovera Defense Hub</span>
                  <strong>Ativo</strong>
                </div>

                <div className="gridMap">
                  <div className="node nodeA">ANEEL</div>
                  <div className="node nodeB">ART</div>
                  <div className="node nodeC">PRODIST</div>
                  <div className="node nodeD">REN 1000</div>
                  <div className="node nodeE">CREA</div>
                  <span className="line l1" />
                  <span className="line l2" />
                  <span className="line l3" />
                  <span className="line l4" />
                </div>

                <div className="casePanel">
                  <span>Status preliminar</span>
                  <strong>Negativa contestável</strong>
                  <p>Indícios de ausência de memória de cálculo, transparência insuficiente e premissa técnica auditável.</p>
                </div>

                <div className="regList">
                  <div><span>Art. 73</span><strong>Alternativas técnicas</strong></div>
                  <div><span>Art. 78</span><strong>Transparência</strong></div>
                  <div><span>§1º</span><strong>Nexo causal</strong></div>
                </div>
              </div>

              <div className="floatingLegal">
                <span>Próxima ação</span>
                <strong>Defesa administrativa</strong>
                <p>Reanálise com base técnica e regulatória.</p>
              </div>
            </div>
          </div>
        </section>



        <section className="screening" id="triagem">
          <div className="container screeningGrid">
            <div className="screeningIntro">
              <span className="eyebrow light">Triagem regulatória prévia</span>
              <h2>Descubra se a negativa merece contestação técnica.</h2>
              <p>
                Informe os dados básicos do caso. A ferramenta gera um diagnóstico preliminar e coleta os contatos para a
                equipe Renovera avaliar a melhor estratégia de defesa.
              </p>

              <div className="diagnosticCard">
                <div className="scoreCircle">
                  <strong>{diagnostic.score}</strong>
                  <span>/100</span>
                </div>
                <div>
                  <span>Potencial de contestação</span>
                  <h3>{diagnostic.level}</h3>
                  <p>Prioridade: {diagnostic.thesis}.</p>
                </div>
              </div>
            </div>

            <form className="leadForm" onSubmit={handleSubmit}>
              <div className="formGrid">
                <label>
                  Concessionária envolvida
                  <select value={utility} onChange={(event) => setUtility(event.target.value)}>
                    <option>CPFL</option>
                    <option>Neoenergia Elektro</option>
                    <option>Energisa</option>
                    <option>Cemig</option>
                    <option>Outra</option>
                  </select>
                </label>

                <label>
                  Tipo de restrição
                  <select value={restriction} onChange={(event) => setRestriction(event.target.value)}>
                    <option>Inversão de Fluxo</option>
                    <option>Reprovação de Padrão</option>
                    <option>Demanda Incompatível</option>
                    <option>Outra</option>
                  </select>
                </label>

                <label>
                  Potência / demanda do ativo
                  <input type="number" min="0" step="0.01" value={power} onChange={(event) => setPower(Number(event.target.value))} />
                </label>

                <label>
                  E-mail corporativo
                  <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="diretoria@empresa.com.br" required />
                </label>

                <label>
                  CNPJ
                  <input type="text" value={cnpj} onChange={(event) => setCnpj(event.target.value)} placeholder="00.000.000/0001-00" required />
                </label>

                <label>
                  Telefone / WhatsApp
                  <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="(00) 00000-0000" required />
                </label>
              </div>

              <button className="formButton" type="submit">Solicitar análise de viabilidade jurídica</button>
              <a className="whatsButton" href={whatsappLink} target="_blank">Prefiro enviar pelo WhatsApp</a>

              {submitted && (
                <div className="successBox">
                  <strong>Triagem registrada.</strong>
                  <p>Substitua o console.log por integração com WhatsApp, CRM, n8n, Make ou Google Sheets.</p>
                </div>
              )}
            </form>
          </div>
        </section>

        <section className="authorityBar">
          <div className="container authorityGrid">
            <div><span>Base normativa</span><strong>REN 1000/2021 · REN 1098/2024 · PRODIST</strong></div>
            <div><span>Defesa técnica</span><strong>Fluxo · Carga · Injeção · Qualidade</strong></div>
            <div><span>Entregável</span><strong>Parecer · Contestação · Recurso · Auditoria</strong></div>
          </div>
        </section>

        <section className="services" id="atuacao">
          <div className="container">
            <div className="sectionHeader center">
              <span className="eyebrow light">Áreas de atuação</span>
              <h2>Consultoria regulatória para casos em que o prejuízo técnico vira risco jurídico.</h2>
              <p>
                Estruturamos defesas com linguagem de engenharia e força administrativa para contestar negativas, reduzir
                riscos e sustentar decisões de investimento no setor elétrico.
              </p>
            </div>

            <div className="servicesGrid">
              {services.map((service) => (
                <article className="serviceCard" key={service.title}>
                  <span>{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <a href="#triagem">{service.cta} →</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="framework" id="legislacao">
          <div className="container frameworkShell">
            <div className="frameworkIntro">
              <span className="eyebrow light">Arsenal regulatório</span>
              <h2>Transformamos norma técnica em argumento de destravamento.</h2>
              <p>
                A Renovera cruza legislação, engenharia de rede e prova documental para mostrar quando a negativa da
                distribuidora não demonstra nexo causal, transparência ou alternativa técnica adequada.
              </p>
            </div>

            <div className="frameworkGrid">
              <div className="lawCard featured">
                <span>Estratégia central</span>
                <h3>Da reprovação genérica à tese técnica defensável.</h3>
                <p>
                  O estudo é reavaliado por ponto de análise, curva de carga, memória de cálculo, premissa de geração,
                  carregamento, tensão e impacto real no sistema.
                </p>
              </div>
              <div className="lawCard">
                <span>Art. 73</span>
                <h3>Alternativas e menor custo global</h3>
                <p>Exigência de avaliação de soluções técnicas viáveis antes de impor restrições, obras ou custos desproporcionais.</p>
              </div>
              <div className="lawCard">
                <span>Art. 78</span>
                <h3>Transparência do estudo</h3>
                <p>Pedido de premissas, dados, memória de cálculo e fundamentação técnica auditável.</p>
              </div>
              <div className="lawCard">
                <span>§1º Art. 73</span>
                <h3>Nexo causal da inversão</h3>
                <p>A restrição precisa decorrer da conexão solicitada, não de condição preexistente imputada ao acessante.</p>
              </div>
              <div className="lawCard">
                <span>PRODIST</span>
                <h3>Qualidade e impacto real</h3>
                <p>Análise de tensão, carregamento, proteção, qualidade do produto e operação da rede.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="sectors">
          <div className="container sectorsShell">
            <div className="splitHeader">
              <div>
                <span className="eyebrow light">Quem protegemos</span>
                <h2>Defesa regulatória para ativos que não podem ficar parados.</h2>
              </div>
              <p>
                A atuação é voltada a decisores que precisam reduzir incerteza técnica, proteger CAPEX, evitar atrasos de
                conexão e sustentar decisões perante concessionárias, ouvidorias e ANEEL.
              </p>
            </div>

            <div className="sectorGrid">
              {sectors.map((sector, index) => (
                <article className="sectorCard" key={sector}>
                  <span>0{index + 1}</span>
                  <h3>{sector}</h3>
                  <p>
                    {index === 0 && "Revisão de pareceres, inversão de fluxo, ponto de conexão, fila de acesso e exigências técnicas da distribuidora."}
                    {index === 1 && "Segurança operacional para unidades críticas, com análise de contratos, estabilidade elétrica e continuidade de fornecimento."}
                    {index === 2 && "Mitigação de multas, demanda contratada, obras impostas, restrições de conexão e riscos em infraestrutura elétrica."}
                    {index === 3 && "Due diligence regulatória antes de aporte, aquisição, expansão, retrofit ou estruturação de ativos de energia."}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="finalCta">
          <div className="container finalCtaBox">
            <div className="finalCtaContent">
              <span className="eyebrow">Defesa antes do prejuízo</span>
              <h2>Antes de aceitar a negativa, peça uma segunda leitura técnica.</h2>
              <p>
                Envie o parecer da concessionária para uma análise preliminar. A Renovera verifica indícios de falha técnica,
                ausência de memória de cálculo, erro de ponto de análise e possibilidade de contestação administrativa.
              </p>
            </div>
            <div className="finalCtaActions">
              <a className="primaryButton" href="#triagem">Analisar minha negativa agora</a>
              <a className="secondaryButton" href={whatsappLink} target="_blank">Falar com especialista</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footerGrid">
          <div className="footerBrand">
            <img src="/logo-renovera.png" alt="Renovera" />
            <p>
              Engenharia, energia e regulação para proteger ativos, destravar acessos e estruturar defesas técnicas no setor elétrico.
            </p>
          </div>

          <div className="footerCol">
            <h4>Menu</h4>
            <a href="#atuacao">Áreas de atuação</a>
            <a href="#legislacao">Legislação</a>
            <a href="#triagem">Triagem regulatória</a>
            <a href="#inicio">Voltar ao início</a>
          </div>

          <div className="footerCol">
            <h4>Contato</h4>
            <a href={whatsappLink} target="_blank">WhatsApp comercial</a>
            <a href="mailto:contato@renovera.com.br">contato@renovera.com.br</a>
            <p>R. Visc. de Rio Branco, 106, São João da Boa Vista - SP</p>
          </div>

          <div className="footerCol">
            <h4>Regulação</h4>
            <p>Consultoria técnica e regulação de ativos.</p>
            <p>CREA-SP / CREA-MG · ANEEL · REN 1000/2021 · PRODIST</p>
          </div>
        </div>

        <div className="container copyright">
          © 2026 Renovera. Todos os direitos reservados.
        </div>
      </footer>

      <a className="whatsappFloat" href={whatsappLink} target="_blank" rel="noreferrer" aria-label="Falar com a Renovera no WhatsApp">
        <WhatsAppIcon />
      </a>
      <LiveEditor namespace="renovera-regulatoria-design" />
    </div>
  );
}

export default App;
