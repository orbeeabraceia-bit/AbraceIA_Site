export const geoGuideSections = [
  {
    heading: "Introdução: a era da IA na busca por saúde",
    paragraphs: [
      "A forma como pacientes encontram médicos e clínicas mudou de forma estrutural. Não basta mais aparecer na primeira página do Google: respostas geradas por inteligência artificial ocupam o topo da jornada de busca.",
      "Em março de 2026, estimativas do setor indicam que cerca de 88% das buscas de saúde nos Estados Unidos já acionam algum tipo de AI Overview — tendência que chega rapidamente ao Brasil, especialmente em cidades com alta densidade médica como Belo Horizonte.",
      "GEO (Generative Engine Optimization) é a disciplina de construir presença digital para ser citado por ChatGPT, Perplexity, Claude e Google AI Overview — sempre com autoridade real e compliance dos conselhos profissionais.",
    ],
  },
  {
    heading: "GEO vs SEO vs AEO: entenda as siglas",
    paragraphs: [
      "SEO tradicional foca em ranquear links azuis nos motores de busca. AEO (Answer Engine Optimization) foca em Featured Snippets e busca por voz — a 'posição zero'. GEO foca em ser a fonte citada dentro da resposta da IA, não apenas listado abaixo dela.",
      "As três práticas se complementam. Um consultório que só investe em SEO clássico pode estar invisível para quem pergunta à IA 'qual o melhor cardiologista em BH'. Um consultório que só investe em GEO sem base técnica de SEO perde tráfego orgânico estrutural.",
      "O método AbraceIA integra as três camadas desde a arquitetura do site: Next.js 16 com performance comprovada, Schema JSON-LD de saúde e conteúdo enciclopédico desenhado para citação em IAs.",
    ],
  },
  {
    heading: "Por que saúde é YMYL — e o que isso exige",
    paragraphs: [
      "Google classifica conteúdo de saúde como YMYL (Your Money or Your Life): erros podem afetar a saúde ou bem-estar de pessoas. Por isso, E-E-A-T (Experience, Expertise, Authoritativeness, Trust) não é opcional.",
      "Para ser citado por IAs em temas médicos, o conteúdo precisa de autor identificado (nome, CRM, especialidade, RQE), revisor credenciado visível e linguagem informativa — nunca promessa de cura ou garantia de resultado.",
      "A Resolução CFM 2.336/2023 modernizou a publicidade médica no Brasil: permite redes sociais, preços e campanhas, mas mantém proibições claras sobre sensacionalismo, manipulação de imagens e autopromoção enganosa.",
    ],
  },
  {
    heading: "Passo 1 — Baseline de citação em IA",
    paragraphs: [
      "Antes de qualquer otimização, registre o ponto de partida. Abra ChatGPT, Perplexity e Google (com AI Overview ativo) e pergunte: 'Qual o melhor [especialidade] em Belo Horizonte?' ou '[procedimento] em BH'.",
      "Anote: quem foi citado, com qual URL de fonte, se sua clínica apareceu e em que posição contextual. Repita com 8–11 keywords transacionais e informacionais do seu nicho.",
      "Este baseline é prova auditável para o cliente e base para medir evolução em 90 dias — KPI-assinatura do AbraceIA: 'Share of AI'.",
    ],
  },
  {
    heading: "Passo 2 — llms.txt na raiz do domínio",
    paragraphs: [
      "O arquivo llms.txt (especificação em llmstxt.org) orienta LLMs sobre o que seu site representa. Deve estar em https://seudominio.com.br/llms.txt em Markdown simples.",
      "Inclua: nome da clínica, especialidades, bairro/cidade, responsável técnico com CRM e RQE, links para páginas-pilar e aviso de que conteúdo é informativo e revisado por profissional habilitado.",
      "Evite marketing vazio. IAs valorizam clareza factual — 'Atendemos ginecologia em Lourdes, BH. Responsável: Dra. X, CRM-MG 12345, RQE 67890' é melhor que 'Somos referência em saúde feminina'.",
    ],
  },
  {
    heading: "Passo 3 — robots.txt e bots de IA",
    paragraphs: [
      "Muitos sites bloqueiam inadvertidamente bots de IA. Verifique se robots.txt permite: GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot e Google-Extended.",
      "Bloquear esses agents impede crawling para citação — equivalente a pedir invisibilidade nas IAs. Mantenha proteção contra scrapers maliciosos via firewall/WAF, não via bloqueio amplo de IA.",
    ],
  },
  {
    heading: "Passo 4 — Schema JSON-LD de saúde",
    paragraphs: [
      "Implemente Schema.org adequado por tipo de página: Organization + WebSite na home, Service nas páginas comerciais, MedicalBusiness ou MedicalClinic para clínicas, Physician para profissionais, FAQPage em perguntas frequentes, Article com autor em blog.",
      "Valide 100% no Google Rich Results Test antes de publicar. Schema incorreto ou genérico (apenas Organization básico) é gap comum entre concorrentes de BH — oportunidade direta para o AbraceIA.",
    ],
  },
  {
    heading: "Passo 5 — Conteúdo enciclopédico (2.000+ palavras)",
    paragraphs: [
      "IAs citam páginas que funcionam como referência: estrutura clara (H2/H3), respostas diretas de 40–60 palavras para perguntas comuns, dados próprios quando possível ('Em nossa experiência clínica em BH...') e links internos para serviços.",
      "Cada artigo-pilar deve responder uma keyword informacional estratégica: 'o que é GEO em saúde', 'como divulgar clínica no Instagram CFM', 'Core Web Vitals site médico'.",
      "Revise com profissional credenciado antes de publicar. Conteúdo gerado por IA pode ser rascunho — nunca publicação final sem revisão humana (6º princípio AbraceIA).",
    ],
  },
  {
    heading: "Passo 6 — Performance e Core Web Vitals",
    paragraphs: [
      "Sites lentos perdem posição e confiança. Metas AbraceIA: LCP ≤ 0,8s, INP ≤ 200ms, CLS ≤ 0,05 no mobile. Stack Next.js 16 + Vercel Edge entrega isso nativamente — WordPress + Elementor raramente atinge.",
      "Imagens via next/image, fontes com display swap, JS enxuto. Meça mensalmente no PageSpeed Insights e após cada deploy relevante.",
    ],
  },
  {
    heading: "Passo 7 — SEO local e Google Business Profile",
    paragraphs: [
      "GEO não substitui SEO local. GBP 100% preenchido (categoria, descrição 750 chars, fotos geo-tagged, Q&A, posts semanais) alimenta autoridade local que IAs também consultam.",
      "NAP consistente (nome, endereço, telefone) em todo o ecossistema digital. Meta: 50 reviews em 6 meses com respostas profissionais.",
    ],
  },
  {
    heading: "Passo 8 — Compliance CFM, CFO, CFP e demais conselhos",
    paragraphs: [
      "Cada especialidade tem regras. Psicologia (CFP): proibido preço como gancho promocional. Odontologia (CFO): cuidado com antes/depois. Fisioterapia (COFFITO): idem.",
      "Mantenha checklist versionado por conselho. Na dúvida, consulte CRM-MG ou conselho regional antes de publicar.",
    ],
  },
  {
    heading: "Passo 9 — Reteste em 90 dias e documentação",
    paragraphs: [
      "Repita o baseline de citação em IA. Compare prints, registre evolução de 'Share of AI' e integre ao case do cliente (GSC, GA4, CWV, citações).",
      "Transparência radical: mostre o que funcionou, o que falhou e o que faria diferente — arquétipo Cuidador + Mago do AbraceIA.",
    ],
  },
  {
    heading: "Conclusão: autoridade real, não manipulação",
    paragraphs: [
      "GEO só funciona com autoridade clínica verificável. IAs não inventam credenciais — tentar manipular é antiético e detectável.",
      "O AbraceIA existe para amplificar médicos e clínicas que já fazem bom trabalho, traduzindo isso em presença mensurável no Google e nas IAs generativas — dentro da ética do conselho.",
      "Próximo passo: solicite uma auditoria de presença em IA gratuita e registre seu baseline hoje.",
    ],
  },
];

export const geoGuideFaq = [
  {
    question: "O que é GEO em saúde?",
    answer:
      "GEO (Generative Engine Optimization) é a otimização para que sua clínica seja citada pelas IAs generativas — ChatGPT, Perplexity, Claude e o Google AI Overview. Ele complementa o SEO clássico e o AEO, estruturando conteúdo informativo, Schema de saúde e sinais de E-E-A-T para que os modelos reconheçam e recomendem o profissional dentro do compliance do conselho.",
  },
  {
    question: "Quanto tempo leva para aparecer em IAs?",
    answer:
      "Depende da autoridade já existente do site e da concorrência do nicho. Um baseline em torno de 90 dias é a referência comum: registramos a citação no início e retestamos com documentação. Conteúdo enciclopédico (artigos que cobrem o tema de A a Z), um arquivo llms.txt bem estruturado e autores identificados aceleram esse reconhecimento pelas IAs.",
  },
  {
    question: "GEO viola o CFM?",
    answer:
      "Não, desde que feito dentro das regras. Conforme a Res. CFM 2.336/2023, o conteúdo precisa ser informativo e educativo, identificado com autor e revisor (nome, CRM e RQE) e sem promessa de resultado ou sensacionalismo. GEO trabalha justamente com esse tipo de conteúdo citável e técnico, o que o mantém naturalmente alinhado ao compliance do conselho.",
  },
];
