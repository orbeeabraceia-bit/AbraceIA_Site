export type FaqItem = { question: string; answer: string };

export const siteFaq: FaqItem[] = [
  {
    question: "O que é GEO em saúde?",
    answer:
      "GEO (Generative Engine Optimization) é a otimização para que sua clínica seja citada pelas IAs generativas — ChatGPT, Perplexity, Claude e o Google AI Overview. Estrutura conteúdo informativo, Schema de saúde e sinais de E-E-A-T (autor com CRM/RQE e revisor credenciado) para que os modelos reconheçam e recomendem o profissional, sempre dentro do compliance do conselho.",
  },
  {
    question: "GEO substitui SEO?",
    answer:
      "Não. GEO complementa o SEO tradicional, não o substitui. Sua clínica precisa ranquear no Google (busca clássica) e, ao mesmo tempo, ser citada pelas IAs generativas que já respondem antes dos links azuis. Cuidamos das duas frentes com arquitetura Next.js, Schema de saúde e conteúdo informativo — uma base técnica única que alimenta tanto o buscador quanto os modelos de IA.",
  },
  {
    question: "É permitido pelo CFM?",
    answer:
      "Sim. A Resolução CFM 2.336/2023 modernizou a publicidade médica e permite presença digital, redes sociais e até divulgação de preços. As exigências são: identificação profissional (nome, CRM e RQE), conteúdo informativo e educativo, e nada de promessa de resultado, sensacionalismo ou manipulação de imagens. Todo material que produzimos passa por checklist de compliance antes de publicar.",
  },
  {
    question: "A IA substitui o médico?",
    answer:
      "Não. As ferramentas da AbraceIA são informativas e sempre revisadas por profissional habilitado — elas não diagnosticam, não prescrevem e não substituem a consulta clínica presencial. A inteligência artificial entra na análise de dados, na automação e na triagem orientativa; a decisão clínica e a responsabilidade continuam sendo do médico, exatamente como o CFM determina.",
  },
  {
    question: "Quanto tempo leva para ver resultados?",
    answer:
      "Depende da frente. No SEO orgânico, os primeiros sinais aparecem em 60–90 dias para keywords locais; temas mais competitivos levam mais. Nas citações por IA, registramos um baseline e retestamos em 90 dias com documentação. Já os Core Web Vitals nascem verdes desde o lançamento, porque a performance é construída na arquitetura Next.js, não otimizada depois.",
  },
  {
    question: "Vocês garantem posição no Google?",
    answer:
      "Não. Garantir posição viola o Art. 9º, IV da Res. CFM 2.336/2023 e nenhuma agência séria promete isso. O que garantimos é método auditável: arquitetura Next.js, Schema de saúde, conteúdo YMYL com E-E-A-T, e acompanhamento por métricas do Google Search Console e GA4, além de prints de citação em IAs ao longo do projeto.",
  },
  {
    question: "Quais sites a Orbee Labs administra?",
    answer:
      "Mantemos um portfólio em produção que você pode visitar e auditar: neuropediatria (lauraneuroped.com.br), ortopedia de mão e punho (janainadrumond.com.br), geriatria (drapaulakac.com.br) e psicologia TCC online (psicologoericmoreira.com.br). Todos rodam a stack AbraceIA 2026, com Core Web Vitals verdes, Schema de saúde e compliance do respectivo conselho — prova real de método, não promessa.",
  },
  {
    question: "Como funciona a auditoria de presença em IA?",
    answer:
      "Você informa nome, especialidade e cidade, e geramos um checklist orientativo sobre como sua clínica aparece (ou não) quando alguém pergunta às IAs generativas. O relatório aponta as maiores oportunidades de citação em ChatGPT, Perplexity e AI Overview. É gratuito e tem caráter informativo — não substitui um diagnóstico comercial completo, que fazemos na etapa seguinte.",
  },
  {
    question: "Preciso contratar todos os serviços?",
    answer:
      "Não. Começamos sempre pelo diagnóstico gratuito e desenhamos um plano que prioriza o que trará mais retorno para o seu momento — pode ser GEO, o site ou o SEO arquitetural. Você inicia por uma frente e expande conforme os resultados aparecem, sem pacote fechado. A ideia é investir onde há mais oportunidade primeiro.",
  },
  {
    question: "Como funciona o diagnóstico gratuito?",
    answer:
      "Analisamos sua presença digital atual — Google, site, reputação online, citação em IAs e concorrência da sua região — e entregamos um relatório orientativo com as maiores oportunidades. É sem compromisso: você pode usar a auditoria gratuita aqui no site ou falar direto no WhatsApp. A partir dele, montamos a estratégia sob medida para a sua especialidade.",
  },
  {
    question: "Atendem fora de Belo Horizonte?",
    answer:
      "Nosso foco é Belo Horizonte e a região metropolitana, onde conhecemos a fundo a concorrência e a busca local. Mas o método é replicável: teleconsulta e sites de alcance nacional seguem o mesmo padrão AbraceIA de arquitetura, Schema e compliance. Se você atende em outra cidade, conversamos sobre como adaptar a estratégia ao seu mercado.",
  },
  {
    question: "Qual a stack técnica?",
    answer:
      "Usamos uma stack 2026 de alta performance e segurança monitorada: Next.js 16, React 19, Tailwind CSS 4, PostgreSQL (Neon), Prisma e deploy na Vercel, com CI/CD e testes automatizados. O resultado são Core Web Vitals verdes desde o lançamento, segurança acompanhada via CVEs e uma base preparada tanto para o Google quanto para citação em IAs.",
  },
];
