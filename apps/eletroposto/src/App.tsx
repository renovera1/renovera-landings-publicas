import { useMemo, useState } from "react";
import LiveEditor from "./LiveEditor";

const whatsappLink =
  "https://wa.me/5500000000000?text=Ol%C3%A1%2C%20quero%20avaliar%20um%20projeto%20de%20eletroposto%20com%20a%20Renovera.";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M16 3.2A12.7 12.7 0 0 0 5.1 22.4L3.6 28.8l6.6-1.5A12.7 12.7 0 1 0 16 3.2Zm0 22.9c-2 0-3.9-.6-5.6-1.7l-.4-.2-3.9.9.9-3.8-.2-.4a10.2 10.2 0 1 1 9.2 5.2Zm5.7-7.6c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-.9 1.2-.3.2-.6.1a8.4 8.4 0 0 1-2.5-1.6 9.4 9.4 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.8-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.2-.2-.4-.3-.7-.5Z" />
    </svg>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
  }).format(value);
}

function formatCurrencyDecimal(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 0
  }).format(value);
}

function App() {
  const [chargers, setChargers] = useState(2);
  const [sessions, setSessions] = useState(5);
  const [averageKwh, setAverageKwh] = useState(45);
  const [salePrice, setSalePrice] = useState(2.25);
  const [energyCost, setEnergyCost] = useState(0.85);
  const [investment, setInvestment] = useState(180000);

  const result = useMemo(() => {
    const monthlyKwh = chargers * sessions * averageKwh * 30;
    const grossRevenue = monthlyKwh * salePrice;
    const energyExpense = monthlyKwh * energyCost;
    const platformCost = grossRevenue * 0.02 + chargers * 120;
    const maintenance = chargers * 350;
    const netRevenue = grossRevenue - energyExpense - platformCost - maintenance;
    const annualNetRevenue = netRevenue * 12;
    const payback = netRevenue > 0 ? investment / netRevenue : 0;
    const margin = grossRevenue > 0 ? (netRevenue / grossRevenue) * 100 : 0;

    return {
      monthlyKwh,
      grossRevenue,
      energyExpense,
      platformCost,
      maintenance,
      netRevenue,
      annualNetRevenue,
      payback,
      margin
    };
  }, [chargers, sessions, averageKwh, salePrice, energyCost, investment]);

  return (
    <div className="page">
      <header className="header">
        <div className="container headerInner">
          <a href="#inicio" className="brand">
            <img src="/logo-renovera.png" alt="Renovera" />
          </a>

          <nav className="nav">
            <a href="#roi">Simulação</a>
            <a href="#solucao">Solução</a>
            <a href="#aplicacoes">Aplicações</a>
            <a href="#potencias">Potências</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>

          <a className="headerButton" href={whatsappLink} target="_blank">
            Solicitar estudo
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="container heroGrid">
            <div className="heroContent">
              <span className="eyebrow">Renovera Charge</span>

              <h1>Estruture seu eletroposto com a Renovera.</h1>

              <p>
                A Renovera desenvolve estudos técnicos e comerciais para
                implantação de infraestrutura de recarga elétrica em rodovias,
                postos de combustíveis, hotéis, resorts, condomínios, empresas,
                shoppings e pontos estratégicos de alta circulação.
              </p>

              <div className="heroActions">
                <a className="primaryButton" href="#roi">
                  Simular retorno financeiro
                </a>
                <a className="secondaryButton" href={whatsappLink} target="_blank">
                  Falar com a Renovera
                </a>
              </div>

              <div className="heroStats">
                <div>
                  <strong>11 a 240 kW</strong>
                  <span>carregadores AC e DC</span>
                </div>
                <div>
                  <strong>ROI</strong>
                  <span>receita, custo e margem</span>
                </div>
                <div>
                  <strong>Projeto completo</strong>
                  <span>viabilidade, elétrica e implantação</span>
                </div>
              </div>
            </div>

            <div className="heroVisual">
              <div className="dashboardCard">
                <div className="dashboardTop">
                  <span>Renovera Energy Hub</span>
                  <strong>Online</strong>
                </div>

                <div className="dashboardMain">
                  <span>Receita estimada mensal</span>
                  <strong>R$ 30.375</strong>
                  <p>
                    Base: 5 recargas por dia, 2 carregadores e ticket médio de
                    45 kWh.
                  </p>
                </div>

                <div className="dashboardList">
                  <div>
                    <span>Rodovia</span>
                    <strong>DC 120 kW</strong>
                  </div>
                  <div>
                    <span>Hotel ou resort</span>
                    <strong>AC 22 kW</strong>
                  </div>
                  <div>
                    <span>Posto de combustível</span>
                    <strong>DC 60 kW</strong>
                  </div>
                </div>

                <div className="dashboardBars">
                  <span style={{ height: "34%" }}></span>
                  <span style={{ height: "52%" }}></span>
                  <span style={{ height: "68%" }}></span>
                  <span style={{ height: "82%" }}></span>
                  <span style={{ height: "61%" }}></span>
                </div>
              </div>

              <div className="floatingCard">
                <span>Cargas</span>
                <strong>11 a 240 kW</strong>
                <p>para residenciais, empresas e hubs de alta demanda</p>
              </div>
            </div>
          </div>
        </section>

        <section className="roi" id="roi">
          <div className="container">
            <div className="sectionHeader center">
              <span className="eyebrow light">Calculadora ROI</span>
              <h2>Simule receita, custos, margem e payback do eletroposto.</h2>
              <p>
                Esta simulação é preliminar e serve para apoiar a tomada de
                decisão. O estudo real deve considerar demanda contratada, tarifa
                local, obras elétricas, equipamento, manutenção, plataforma,
                tributos e estratégia comercial.
              </p>
            </div>

            <div className="calculator">
              <div className="controls">
                <Control
                  label="Quantidade de carregadores"
                  value={chargers}
                  suffix="un."
                  min={1}
                  max={20}
                  step={1}
                  onChange={setChargers}
                />

                <Control
                  label="Recargas por carregador ao dia"
                  value={sessions}
                  suffix="recargas"
                  min={1}
                  max={30}
                  step={1}
                  onChange={setSessions}
                />

                <Control
                  label="Energia média por recarga"
                  value={averageKwh}
                  suffix="kWh"
                  min={10}
                  max={120}
                  step={5}
                  onChange={setAverageKwh}
                />

                <Control
                  label="Preço cobrado por kWh"
                  value={salePrice}
                  suffix="R$/kWh"
                  min={0.8}
                  max={5}
                  step={0.05}
                  onChange={setSalePrice}
                  currency
                />

                <Control
                  label="Custo de energia por kWh"
                  value={energyCost}
                  suffix="R$/kWh"
                  min={0.3}
                  max={2.5}
                  step={0.05}
                  onChange={setEnergyCost}
                  currency
                />

                <Control
                  label="Investimento estimado"
                  value={investment}
                  suffix="R$"
                  min={30000}
                  max={1500000}
                  step={10000}
                  onChange={setInvestment}
                  money
                />
              </div>

              <div className="results">
                <div className="resultCard">
                  <span>Energia mensal</span>
                  <strong>{formatNumber(result.monthlyKwh)} kWh</strong>
                </div>

                <div className="resultCard">
                  <span>Receita bruta mensal</span>
                  <strong>{formatCurrency(result.grossRevenue)}</strong>
                </div>

                <div className="resultCard">
                  <span>Custo mensal de energia</span>
                  <strong>{formatCurrency(result.energyExpense)}</strong>
                </div>

                <div className="resultCard">
                  <span>Operação e plataforma</span>
                  <strong>
                    {formatCurrency(result.platformCost + result.maintenance)}
                  </strong>
                </div>

                <div className="highlightResult">
                  <span>Margem líquida estimada</span>
                  <strong>{formatCurrency(result.netRevenue)}</strong>
                  <p>
                    Margem aproximada de{" "}
                    {result.margin.toFixed(1).replace(".", ",")}% sobre a
                    receita bruta mensal.
                  </p>
                </div>

                <div className="highlightResult secondary">
                  <span>Payback preliminar</span>
                  <strong>
                    {result.payback > 0
                      ? `${result.payback.toFixed(1).replace(".", ",")} meses`
                      : "Indefinido"}
                  </strong>
                  <p>
                    Receita líquida anual estimada em{" "}
                    {formatCurrency(result.annualNetRevenue)}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="intro" id="solucao">
          <div className="container">
            <div className="sectionHeader center">
              <span className="eyebrow light">Solução Renovera</span>
              <h2>Da análise de viabilidade ao eletroposto pronto para operar.</h2>
              <p>
                O projeto de um eletroposto exige mais do que escolher um
                carregador. É necessário avaliar demanda disponível, padrão de
                entrada, conexão elétrica, obra civil, perfil de uso, modelo de
                cobrança, energia consumida, manutenção e retorno sobre o
                investimento.
              </p>
            </div>

            <div className="introGrid">
              <div className="introCard">
                <span>01</span>
                <h3>Estudo técnico e comercial</h3>
                <p>
                  Análise do local, perfil de circulação, tipo de usuário,
                  potência recomendada, consumo esperado e viabilidade econômica
                  preliminar.
                </p>
              </div>

              <div className="introCard">
                <span>02</span>
                <h3>Projeto elétrico e infraestrutura</h3>
                <p>
                  Dimensionamento de cabos, proteções, quadros, eletrodutos,
                  padrão de entrada, demanda, aterramento e adequações elétricas.
                </p>
              </div>

              <div className="introCard">
                <span>03</span>
                <h3>Implantação e comissionamento</h3>
                <p>
                  Apoio técnico para instalação, testes, parametrização,
                  liberação operacional, validação de segurança e entrega do
                  ponto de recarga.
                </p>
              </div>

              <div className="introCard">
                <span>04</span>
                <h3>Manutenção e expansão</h3>
                <p>
                  Planejamento para operação contínua, inspeções, suporte
                  técnico, aumento de potência e expansão gradual da rede.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="applications" id="aplicacoes">
          <div className="container">
            <div className="splitHeader">
              <div>
                <span className="eyebrow light">Aplicações</span>
                <h2>Uma solução para diferentes perfis de uso.</h2>
              </div>
              <p>
                Cada ponto possui uma estratégia distinta. Locais de permanência
                longa podem utilizar recarga AC. Pontos de passagem, rodovias e
                postos exigem carregamento DC mais rápido, maior disponibilidade
                e operação mais estruturada.
              </p>
            </div>

            <div className="cardsGrid">
              <article className="useCard">
                <div className="icon">01</div>
                <h3>Postos de combustíveis</h3>
                <p>
                  Transforme o posto em ponto de conveniência para veículos
                  elétricos, com carregadores DC, sinalização, vaga dedicada e
                  estratégia de monetização por kWh.
                </p>
              </article>

              <article className="useCard">
                <div className="icon">02</div>
                <h3>Rodovias e corredores</h3>
                <p>
                  Estruture pontos de recarga rápida em rotas estratégicas,
                  reduzindo ansiedade de autonomia e agregando valor ao fluxo de
                  veículos.
                </p>
              </article>

              <article className="useCard">
                <div className="icon">03</div>
                <h3>Hotéis e resorts</h3>
                <p>
                  Ofereça recarga como diferencial de experiência, retenção e
                  conveniência para hóspedes com veículos elétricos.
                </p>
              </article>

              <article className="useCard">
                <div className="icon">04</div>
                <h3>Shoppings e centros comerciais</h3>
                <p>
                  Aumente permanência, gere nova receita e associe o
                  empreendimento a inovação, sustentabilidade e mobilidade
                  elétrica.
                </p>
              </article>

              <article className="useCard">
                <div className="icon">05</div>
                <h3>Condomínios</h3>
                <p>
                  Planeje infraestrutura coletiva, medição, rateio, segurança
                  elétrica e expansão organizada para moradores.
                </p>
              </article>

              <article className="useCard">
                <div className="icon">06</div>
                <h3>Empresas e frotas</h3>
                <p>
                  Apoie a eletrificação de frotas leves, veículos corporativos,
                  clientes, colaboradores e operações internas.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="power" id="potencias">
          <div className="container powerGrid">
            <div className="sectionHeader">
              <span className="eyebrow light">Potências</span>
              <h2>Do carregador residencial ao hub de alta demanda.</h2>
              <p>
                A escolha da potência depende do tempo de permanência do usuário,
                da demanda elétrica disponível, do investimento previsto e do
                modelo de cobrança. A Renovera avalia o equilíbrio entre custo,
                velocidade de recarga e retorno financeiro.
              </p>
            </div>

            <div className="powerTable">
              <div className="powerRow">
                <strong>11 kW</strong>
                <span>Residências, condomínios e empresas com baixa rotatividade.</span>
              </div>
              <div className="powerRow">
                <strong>22 kW</strong>
                <span>Hotéis, estacionamentos, resorts e pontos de permanência longa.</span>
              </div>
              <div className="powerRow">
                <strong>30 a 40 kW</strong>
                <span>Operações de entrada em DC com investimento menor.</span>
              </div>
              <div className="powerRow">
                <strong>60 a 90 kW</strong>
                <span>Postos, comércios e locais com necessidade de giro moderado.</span>
              </div>
              <div className="powerRow">
                <strong>120 kW</strong>
                <span>Rodovias, hubs e pontos de maior demanda operacional.</span>
              </div>
              <div className="powerRow">
                <strong>180 a 240 kW</strong>
                <span>Corredores estratégicos e alta rotatividade de veículos.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="faq" id="duvidas">
          <div className="container">
            <div className="sectionHeader center">
              <span className="eyebrow light">Dúvidas frequentes</span>
              <h2>Pontos importantes antes de investir.</h2>
            </div>

            <div className="faqGrid">
              <Faq
                question="Qual carregador devo escolher?"
                answer="Depende do tipo de usuário, tempo médio de permanência, demanda elétrica disponível e objetivo financeiro. Residências e condomínios normalmente utilizam AC. Rodovias e postos tendem a exigir DC."
              />

              <Faq
                question="A calculadora substitui o estudo técnico?"
                answer="Não. Ela entrega uma visão preliminar de viabilidade. O estudo técnico completo considera instalação elétrica, custos reais de obra, tarifa, demanda contratada, equipamento e operação."
              />

              <Faq
                question="Preciso aumentar a demanda de energia?"
                answer="Pode ser necessário. A Renovera avalia a carga existente, potência do carregador, simultaneidade, tensão de alimentação e exigências da concessionária."
              />

              <Faq
                question="O eletroposto pode ser integrado com energia solar?"
                answer="Sim. A geração solar pode reduzir custo energético e melhorar a margem do projeto, mas deve ser analisada junto com o perfil de consumo e regras de conexão."
              />
            </div>
          </div>
        </section>

        <section className="finalCta">
          <div className="container finalCtaBox">
            <h2>Quer transformar a simulação em um estudo real?</h2>
            <p>
              A Renovera pode avaliar seu local, estimar o investimento,
              dimensionar a infraestrutura e indicar a melhor estratégia para o
              seu eletroposto.
            </p>
            <a className="primaryButton" href={whatsappLink} target="_blank">
              Solicitar análise do projeto
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footerGrid">
          <div>
            <img src="/logo-renovera.png" alt="Renovera" />
            <p>
              Engenharia, energia e mobilidade elétrica para estruturar a nova
              infraestrutura de recarga no Brasil.
            </p>
          </div>

          <div>
            <h4>Menu</h4>
            <a href="#roi">Simulação</a>
            <a href="#solucao">Solução</a>
            <a href="#aplicacoes">Aplicações</a>
            <a href="#potencias">Potências</a>
          </div>

          <div>
            <h4>Contato</h4>
            <a href={whatsappLink} target="_blank">
              WhatsApp comercial
            </a>
            <a href="mailto:contato@renovera.com.br">contato@renovera.com.br</a>
          </div>

          <div>
            <h4>Compliance</h4>
            <p>
              Canal ético e confidencial para denúncias e comunicações internas.
            </p>
            <a href="mailto:compliance@renovera.com.br">
              compliance@renovera.com.br
            </a>
          </div>
        </div>

        <div className="container copyright">
          © 2026 Renovera. Todos os direitos reservados.
        </div>
      </footer>

      <a className="whatsappFloat" href={whatsappLink} target="_blank" rel="noreferrer" aria-label="Falar com a Renovera no WhatsApp">
        <WhatsAppIcon />
      </a>
      <LiveEditor namespace="renovera-eletroposto" />
    </div>
  );
}

type ControlProps = {
  label: string;
  value: number;
  suffix: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  currency?: boolean;
  money?: boolean;
};

function Control({
  label,
  value,
  suffix,
  min,
  max,
  step,
  onChange,
  currency,
  money
}: ControlProps) {
  const progress = ((value - min) / (max - min)) * 100;

  let displayValue = `${value} ${suffix}`;

  if (currency) {
    displayValue = `${formatCurrencyDecimal(value)}/kWh`;
  }

  if (money) {
    displayValue = formatCurrency(value);
  }

  return (
    <div className="control">
      <div className="controlTop">
        <label>{label}</label>
        <strong>{displayValue}</strong>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ backgroundSize: `${progress}% 100%` }}
      />
    </div>
  );
}

function Faq({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faqItem ${open ? "active" : ""}`}>
      <button onClick={() => setOpen(!open)}>
        <span>{question}</span>
        <strong>{open ? "−" : "+"}</strong>
      </button>

      {open && <p>{answer}</p>}
    </div>
  );
}

export default App;
