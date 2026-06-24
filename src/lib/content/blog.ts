import { defaultAuthor, medicalReviewer } from "./cases";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  keyword: string;
  publishedAt: string;
  readMinutes: number;
  sections: { heading: string; paragraphs: string[] }[];
  faq?: { question: string; answer: string }[];
  relatedCaseSlugs?: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "marketing-digital-para-medicos",
    title: "Marketing digital para médicos: o guia completo em 2026",
    excerpt:
      "Do posicionamento ao SEO, GEO e compliance — como construir presença digital médica sólida e dentro da Res. CFM 2.336/2023.",
    keyword: "marketing digital para médicos",
    publishedAt: "2026-06-23",
    readMinutes: 12,
    relatedCaseSlugs: [
      "dra-laura-thiersch-neuropediatra",
      "dra-janaina-drumond-ortopedia",
      "dra-paula-kac-geriatria",
      "eric-moreira-psicologia-tcc",
    ],
    sections: [
      {
        heading: "Comece pelo posicionamento, não pela tática",
        paragraphs: [
          "Antes de pensar em Instagram ou tráfego pago, defina para quem você atende, qual problema resolve melhor que os concorrentes e qual a prova disso. Sem essa bússola, cada canal inventa uma mensagem diferente e o investimento se dilui.",
          "Em Belo Horizonte — uma das maiores densidades médicas do país — o paciente tem escolha. Quem comunica com clareza e autoridade real sai na frente, sem precisar prometer resultado (o que, aliás, o CFM proíbe).",
        ],
      },
      {
        heading: "Os 4 pilares da presença digital médica",
        paragraphs: [
          "1. Site próprio rápido e seguro: a base que você controla. Diferente do Doctoralia ou do Instagram, ninguém muda as regras embaixo de você. Meta de performance (Core Web Vitals no verde) e Schema de saúde.",
          "2. SEO médico: arquitetura técnica, conteúdo com E-E-A-T e Schema (Physician, MedicalBusiness, FAQPage) para o Google entender quem é o autor e a especialidade.",
          "3. GEO: ser citado por ChatGPT, Perplexity, Claude e Google AI Overview — a nova camada de descoberta. Depende de llms.txt, conteúdo enciclopédico e autoridade verificável.",
          "4. Prova social honesta: depoimentos com consentimento e disclaimer, casos reais, credenciais visíveis. No portfólio Orbee Labs isso é padrão em todos os sites.",
        ],
      },
      {
        heading: "O que o CFM permite (e o que proíbe)",
        paragraphs: [
          "Permitido: divulgar serviços, equipamentos e conteúdo educativo com identificação completa (nome, CRM, especialidade e RQE quando aplicável).",
          "Proibido: prometer ou garantir resultado, usar superlativos como 'melhor médico', e publicar imagens de antes/depois sem TCLE e caráter educativo. A Res. CFM 2.336/2023 vale para o site, as redes e até para o conteúdo que a IA cita.",
        ],
      },
      {
        heading: "Canais: Google, Instagram, WhatsApp e Doctoralia",
        paragraphs: [
          "Google (busca + Meu Negócio) costuma trazer o paciente de maior intenção — quem já procura um especialista. É onde SEO local e Schema rendem mais.",
          "Instagram e redes constroem autoridade e lembrança, mas convertem melhor quando levam de volta ao site. WhatsApp é o canal de conversão final: botão flutuante com mensagem pré-preenchida e evento de tracking.",
          "Doctoralia complementa, mas não substitui o site próprio — depender só de plataformas de terceiros é abrir mão do controle.",
        ],
      },
      {
        heading: "Como medir o que importa",
        paragraphs: [
          "Defina poucos indicadores acionáveis: keywords no top 10 (Search Console), cliques e CTR orgânico, leads qualificados por canal e taxa de conversão do site.",
          "Revalide Core Web Vitals após cada mudança relevante e registre um baseline de citação em IAs, retestando em 90 dias. O que não é medido vira opinião.",
        ],
      },
    ],
    faq: [
      {
        question: "Posso fazer marketing digital sendo médico?",
        answer:
          "Sim. A Res. CFM 2.336/2023 permite divulgação com identificação completa e caráter educativo. O que ela proíbe é promessa de resultado, sensacionalismo e antes/depois sem consentimento — não a presença digital em si.",
      },
      {
        question: "Por onde um médico deve começar?",
        answer:
          "Pelo posicionamento e por um site próprio rápido com Schema de saúde. Ele é a base que você controla; redes sociais e tráfego pago rendem mais quando apontam de volta para esse site.",
      },
    ],
  },
  {
    slug: "redes-sociais-para-medicos",
    title: "Redes sociais para médicos: o que o CFM permite",
    excerpt:
      "Como usar Instagram, LinkedIn e YouTube com autoridade e dentro da Res. CFM 2.336/2023 — sem promessa nem sensacionalismo.",
    keyword: "redes sociais para médicos",
    publishedAt: "2026-06-22",
    readMinutes: 7,
    relatedCaseSlugs: ["eric-moreira-psicologia-tcc", "dra-paula-kac-geriatria"],
    sections: [
      {
        heading: "O que pode e o que não pode",
        paragraphs: [
          "Pode: conteúdo educativo, bastidores do consultório com consentimento, identificação completa (nome, CRM, especialidade) e esclarecimento de dúvidas comuns de forma geral.",
          "Não pode: prometer resultado, exibir antes/depois sem TCLE e caráter educativo, divulgar preço de procedimento como chamariz, ou usar depoimento que sugira garantia de cura.",
        ],
      },
      {
        heading: "Estratégia que constrói autoridade",
        paragraphs: [
          "Trate cada post como uma resposta a uma dúvida real do paciente — as mesmas que aparecem no 'As pessoas também perguntam' do Google. Isso alimenta autoridade (E-E-A-T) e dá pauta infinita.",
          "Use as redes para gerar lembrança e levar ao site, onde o agendamento acontece. O perfil social é vitrine; o site é a base que você controla.",
        ],
      },
    ],
    faq: [
      {
        question: "Médico pode mostrar o dia a dia no Instagram?",
        answer:
          "Pode, com bom senso e consentimento: bastidores educativos e identificação completa são permitidos. O limite é o sensacionalismo, a promessa de resultado e a exposição de pacientes sem TCLE.",
      },
    ],
  },
  {
    slug: "atrair-pacientes-instagram",
    title: "Como atrair pacientes pelo Instagram sem ferir o conselho",
    excerpt:
      "Conteúdo educativo, CTAs para o site e compliance — um método de Instagram para clínicas que respeita o CFM/CFP.",
    keyword: "como atrair pacientes pelo Instagram",
    publishedAt: "2026-06-21",
    readMinutes: 7,
    relatedCaseSlugs: ["dra-janaina-drumond-ortopedia"],
    sections: [
      {
        heading: "Conteúdo que educa, não que promete",
        paragraphs: [
          "Os formatos que mais engajam em saúde são os que tiram dúvidas: 'quando procurar um especialista', 'mitos e verdades', 'o que esperar da primeira consulta'. Tudo de forma geral e educativa, sem prescrever.",
          "Evite o gatilho de promessa ('resolva sua dor em 1 sessão'). Além de ferir o CFM/CFP, atrai o paciente errado e queima a marca.",
        ],
      },
      {
        heading: "Do feed para o agendamento",
        paragraphs: [
          "O Instagram não fecha consulta sozinho — ele leva ao site. Use o link da bio para uma página com Schema, FAQ e WhatsApp, e meça os cliques com evento de tracking.",
          "Combine alcance (Reels educativos) com prova (depoimentos com consentimento) e um caminho claro de conversão. Sem o site por trás, o esforço social vaza.",
        ],
      },
    ],
    faq: [
      {
        question: "Posso impulsionar posts sendo profissional de saúde?",
        answer:
          "Sim, desde que o conteúdo seja educativo e identificado, sem promessa de resultado nem antes/depois sem consentimento. O impulsionamento amplia alcance; as regras de publicidade do conselho continuam valendo.",
      },
    ],
  },
  {
    slug: "lgpd-clinica-medica",
    title: "LGPD para clínica médica: guia prático",
    excerpt:
      "Dados de saúde são sensíveis. Como coletar, armazenar e tratar com consentimento, segurança e plano de incidente.",
    keyword: "LGPD para clínica médica",
    publishedAt: "2026-06-19",
    readMinutes: 8,
    sections: [
      {
        heading: "Por que dados de saúde exigem cuidado extra",
        paragraphs: [
          "A LGPD classifica dados de saúde como sensíveis (Art. 5º, II) — o que exige base legal específica e, em regra, consentimento explícito do titular. Um formulário de contato de clínica já lida com esse tipo de dado.",
          "Na prática: consentimento claro antes do envio, política de privacidade acessível e analytics que só disparam após o aceite no banner de cookies. É o padrão que aplicamos em todos os sites AbraceIA.",
        ],
      },
      {
        heading: "Checklist mínimo de conformidade",
        paragraphs: [
          "1. Consentimento explícito e registro de quando/como foi dado. 2. Política de privacidade e termos publicados e linkados. 3. Banner de cookies com bloqueio de analytics até o aceite.",
          "4. Armazenamento seguro e acesso restrito. 5. Encarregado (DPO) designado e canal de contato. 6. Plano de resposta a incidente com comunicação no prazo legal. Os itens 5 e 6 são decisões operacionais que acompanham o site técnico.",
        ],
      },
    ],
    faq: [
      {
        question: "Preciso de consentimento para um formulário de contato?",
        answer:
          "Em clínicas, sim na prática: como o contato envolve dado de saúde (sensível), o caminho mais seguro é consentimento explícito antes do envio, com política de privacidade clara e registro do aceite.",
      },
    ],
  },
  {
    slug: "resolucao-cfm-2336-publicidade",
    title: "Resolução CFM 2.336/2023: o que mudou na publicidade médica",
    excerpt:
      "O guia objetivo da norma que rege a publicidade médica no Brasil — o que passou a ser permitido e o que continua proibido.",
    keyword: "Resolução CFM 2.336 publicidade",
    publishedAt: "2026-06-18",
    readMinutes: 8,
    sections: [
      {
        heading: "O que a norma trouxe",
        paragraphs: [
          "A Res. CFM 2.336/2023 atualizou as regras de publicidade médica para o ambiente digital, reconhecendo redes sociais e marketing de conteúdo como legítimos quando feitos com responsabilidade.",
          "O princípio central não mudou: informar e educar é permitido; mercantilizar a medicina e prometer resultado, não.",
        ],
      },
      {
        heading: "Permitido × Proibido (resumo prático)",
        paragraphs: [
          "Permitido: identificação completa (nome, CRM, RQE quando aplicável), divulgação de serviços e equipamentos, conteúdo educativo, e até mostrar a rotina do consultório com consentimento.",
          "Proibido: garantir resultado, usar superlativos ('o melhor'), antes/depois sem TCLE e finalidade educativa, sensacionalismo, e autopromoção que induza o paciente ao erro.",
        ],
      },
    ],
    faq: [
      {
        question: "A 2.336 liberou o marketing médico?",
        answer:
          "Ela modernizou as regras para o digital e reconheceu o conteúdo educativo, mas manteve as proibições essenciais: nada de promessa de resultado, sensacionalismo ou antes/depois sem consentimento.",
      },
    ],
  },
  {
    slug: "quanto-custa-site-para-medico",
    title: "Quanto custa um site para médico em 2026",
    excerpt:
      "Os fatores reais que definem o preço de um site médico — e por que o mais barato costuma sair caro.",
    keyword: "quanto custa site para médico",
    publishedAt: "2026-06-17",
    readMinutes: 6,
    relatedCaseSlugs: ["dra-janaina-drumond-ortopedia"],
    sections: [
      {
        heading: "O que define o preço",
        paragraphs: [
          "O custo varia conforme escopo (institucional simples vs. site com blog, páginas por condição e ferramentas), tecnologia (template genérico vs. stack performática com Schema de saúde) e o que está incluso depois (SEO, manutenção, suporte).",
          "Há também o custo de operação mensal — hospedagem, domínio e, se houver, IA e e-mail transacional — geralmente baixo em stacks modernas, mas que existe.",
        ],
      },
      {
        heading: "Por que o mais barato sai caro",
        paragraphs: [
          "Um site lento ou sem Schema perde posição no Google (que trata saúde como YMYL) e não é citado por IAs — ou seja, não traz paciente. Refazer depois custa mais do que fazer certo da primeira vez.",
          "O melhor critério não é o menor preço, e sim o retorno: um site que ranqueia, converte e está em compliance se paga com os agendamentos que gera.",
        ],
      },
    ],
    faq: [
      {
        question: "Vale a pena um site próprio se já tenho Doctoralia?",
        answer:
          "Sim. O Doctoralia complementa, mas você não controla suas regras nem o relacionamento. O site próprio é o ativo que ranqueia no Google, é citado por IAs e converte no seu WhatsApp — sem intermediário.",
      },
    ],
  },
  {
    slug: "google-ai-overviews-clinicas",
    title: "Google AI Overviews para clínicas: como ser citado",
    excerpt:
      "As respostas geradas por IA no topo do Google mudam a busca em saúde — como conquistar a citação sem ferir o CFM.",
    keyword: "Google AI Overview saúde",
    publishedAt: "2026-06-20",
    readMinutes: 7,
    relatedCaseSlugs: ["dra-laura-thiersch-neuropediatra", "dra-paula-kac-geriatria"],
    sections: [
      {
        heading: "O que são os AI Overviews",
        paragraphs: [
          "AI Overviews são as respostas geradas por IA que o Google exibe acima dos links tradicionais. Em consultas de saúde, elas resumem várias fontes e citam as que o algoritmo considera mais confiáveis.",
          "Diferente do ChatGPT ou do Perplexity, o AI Overview puxa do índice do Google em tempo real — então autoridade técnica e Schema corretos pesam diretamente na chance de ser citado.",
        ],
      },
      {
        heading: "Como aumentar a chance de citação (sem ferir o CFM)",
        paragraphs: [
          "1. Responda à intenção logo no primeiro parágrafo, em 40–60 palavras, no formato citável — o mesmo padrão que usamos para Featured Snippets.",
          "2. Estruture Schema de saúde (Physician, MedicalBusiness, FAQPage) para o Google identificar autor, especialidade e RQE.",
          "3. Mantenha E-E-A-T visível: autor credenciado e revisor habilitado em todo conteúdo YMYL.",
          "4. Nada de promessa de resultado ou superlativo — a Res. CFM 2.336/2023 vale também para o conteúdo que a IA cita.",
        ],
      },
      {
        heading: "Medir e iterar em 90 dias",
        paragraphs: [
          "Registre um baseline: pesquise suas keywords-alvo e anote se a clínica aparece no AI Overview. Reteste em 90 dias após publicar conteúdo enciclopédico.",
          "Sites Orbee Labs como lauraneuroped.com.br e drapaulakac.com.br já nascem com a arquitetura técnica e o compliance que essas respostas exigem.",
        ],
      },
    ],
    faq: [
      {
        question: "AI Overview é o mesmo que SEO tradicional?",
        answer:
          "Não. É uma camada generativa acima dos links: você precisa ranquear bem E ter autoridade e Schema que a IA reconheça como fonte confiável para ser citado.",
      },
    ],
  },
  {
    slug: "como-aparecer-no-chatgpt-saude",
    title: "Como aparecer no ChatGPT sem infringir o CFM",
    excerpt:
      "Guia prático de GEO para médicos: llms.txt, E-E-A-T e Res. CFM 2.336/2023.",
    keyword: "como aparecer no ChatGPT saúde",
    publishedAt: "2026-03-15",
    readMinutes: 8,
    relatedCaseSlugs: ["dra-janaina-drumond-ortopedia", "dra-paula-kac-geriatria"],
    sections: [
      {
        heading: "Por que o ChatGPT importa para consultórios em BH",
        paragraphs: [
          "Belo Horizonte concentra uma das maiores densidades médicas do Brasil. Quando um paciente pergunta à IA qual especialista procurar, a resposta aparece antes dos links azuis do Google.",
          "GEO (Generative Engine Optimization) é o conjunto de práticas para que sua clínica seja citada como fonte — com autoridade real, não manipulação.",
        ],
      },
      {
        heading: "O que o CFM permite (Res. 2.336/2023)",
        paragraphs: [
          "É permitido divulgar serviços, equipamentos e conteúdo educativo com identificação completa: nome, CRM, especialidade e RQE quando aplicável.",
          "É proibido prometer resultado, usar superlativos como 'melhor médico' ou publicar antes/depois sem TCLE e caráter educativo.",
          "No portfólio Orbee Labs, a Dra. Janaína Drumond (ortopedia) publica depoimentos com disclaimer explícito — padrão que replicamos em todos os sites AbraceIA.",
        ],
      },
      {
        heading: "Passos práticos de GEO",
        paragraphs: [
          "1. Publique llms.txt na raiz do domínio descrevendo a clínica e o responsável técnico.",
          "2. Permita bots de IA no robots.txt (GPTBot, ClaudeBot, PerplexityBot, Google-Extended).",
          "3. Produza conteúdo enciclopédico com autor credenciado e revisor visível.",
          "4. Registre baseline de citação e reteste em 90 dias.",
          "Referência ao vivo: lauraneuroped.com.br (neuropediatria), janainadrumond.com.br (ortopedia), drapaulakac.com.br (geriatria) e psicologoericmoreira.com.br (TCC).",
        ],
      },
    ],
    faq: [
      {
        question: "GEO substitui SEO?",
        answer:
          "Não. GEO complementa o SEO. Você precisa ranquear no Google e ser citado nas IAs generativas.",
      },
    ],
  },
  {
    slug: "core-web-vitals-clinicas",
    title: "Core Web Vitals para clínicas: metas reais em 2026",
    excerpt:
      "LCP ≤ 0,8s, INP ≤ 200ms e CLS ≤ 0,05 — como sites médicos podem atingir o verde no mobile.",
    keyword: "Core Web Vitals site médico",
    publishedAt: "2026-03-01",
    readMinutes: 6,
    relatedCaseSlugs: ["dra-janaina-drumond-ortopedia"],
    sections: [
      {
        heading: "Por que performance é SEO em saúde",
        paragraphs: [
          "Google trata saúde como YMYL: páginas lentas perdem posição e confiança. Pacientes abandonam sites que demoram mais de 3 segundos no mobile.",
          "A meta AbraceIA é LCP ≤ 0,8s — três vezes mais rápido que a média de agências que entregam WordPress + Elementor.",
          "Sites Orbee Labs em Next.js — como janainadrumond.com.br e drapaulakac.com.br — nascem com performance nativa, sem plugins de cache.",
        ],
      },
      {
        heading: "Como medir",
        paragraphs: [
          "Use PageSpeed Insights e Google Search Console (relatório Core Web Vitals). Meça mobile primeiro — mais de 70% do tráfego de saúde vem de smartphones.",
          "Após cada deploy relevante, revalide as URLs principais: home, serviços e páginas de conversão.",
        ],
      },
    ],
  },
  {
    slug: "portfolio-sites-medicos-orbee-labs",
    title: "4 sites de saúde em BH que a Orbee Labs administra hoje",
    excerpt:
      "Neuropediatria, ortopedia, geriatria e psicologia TCC — o que cada arquitetura entrega em SEO, compliance e conversão.",
    keyword: "site médico Orbee Labs Belo Horizonte",
    publishedAt: "2026-06-01",
    readMinutes: 7,
    relatedCaseSlugs: [
      "dra-laura-thiersch-neuropediatra",
      "dra-janaina-drumond-ortopedia",
      "dra-paula-kac-geriatria",
      "eric-moreira-psicologia-tcc",
    ],
    sections: [
      {
        heading: "Por que mostramos o portfólio",
        paragraphs: [
          "Prova social em saúde não pode ser genérica. Cada site AbraceIA corresponde a um profissional real, com CRM ou CRP visível e compliance do conselho.",
          "Estes quatro sites estão em produção contínua — não são mockups de agência.",
        ],
      },
      {
        heading: "Neuropediatria — Dra. Laura Thiersch",
        paragraphs: [
          "lauraneuroped.com.br atende famílias com foco em TEA, TDAH e epilepsia infantil. FAQ educativo, blog e canais de agendamento (WhatsApp, Doctoralia) reduzem fricção antes da consulta.",
        ],
      },
      {
        heading: "Ortopedia — Dra. Janaína Drumond",
        paragraphs: [
          "janainadrumond.com.br diferencia subespecialidade em mão e punho com páginas por condição (túnel do carpo, dedo em gatilho, rizartrose). Rodapé credita Orbee Labs — referência de stack 2026.",
        ],
      },
      {
        heading: "Geriatria e psicologia",
        paragraphs: [
          "drapaulakac.com.br cobre consultório, domiciliar e teleconsulta com páginas regionais (BH, Contagem, Betim, Nova Lima) e controles de acessibilidade.",
          "psicologoericmoreira.com.br estrutura serviços por demanda emocional (ansiedade, pânico, burnout) e destaca CRP 04/65624 em todo o funil — padrão E-E-A-T para CFP.",
        ],
      },
    ],
    faq: [
      {
        question: "Posso visitar os sites?",
        answer:
          "Sim. Todos estão públicos e linkados na página /cases do AbraceIA.",
      },
    ],
  },
  {
    slug: "schema-markup-saude",
    title: "Schema JSON-LD para clínicas: guia prático",
    excerpt: "Physician, MedicalBusiness, FAQPage e MedicalProcedure — como implementar no Next.js.",
    keyword: "schema markup site médico",
    publishedAt: "2026-02-20",
    readMinutes: 7,
    sections: [
      {
        heading: "Por que Schema importa em YMYL",
        paragraphs: [
          "Rich snippets aumentam CTR em 30–40% em nichos competitivos. Em saúde, Google e IAs usam Schema para identificar autor, especialidade e serviços.",
          "Implementamos JSON-LD no código — não via plugin tardio — para cada página do sitemap AbraceIA.",
        ],
      },
    ],
  },
  {
    slug: "llms-txt-saude",
    title: "Como criar llms.txt para clínicas",
    excerpt: "Arquivo na raiz do site que orienta IAs generativas sobre sua clínica e autoridade.",
    keyword: "llms.txt saúde",
    publishedAt: "2026-02-10",
    readMinutes: 5,
    sections: [
      {
        heading: "O que é llms.txt",
        paragraphs: [
          "Formato Markdown na raiz do domínio (llmstxt.org) descrevendo serviços, compliance e fontes credenciadas.",
          "Complementa robots.txt que permite bots GPTBot, ClaudeBot e PerplexityBot.",
        ],
      },
    ],
  },
  {
    slug: "seo-local-clinicas-bh",
    title: "SEO local para clínicas em Belo Horizonte",
    excerpt: "Google Business Profile, NAP consistente e páginas regionais para Savassi, Funcionários e RM.",
    keyword: "SEO local clínica BH",
    publishedAt: "2026-01-28",
    readMinutes: 6,
    sections: [
      {
        heading: "Local Pack e saúde",
        paragraphs: [
          "Até 50% dos leads locais podem vir do Local Pack. Nome com keyword, categorias corretas e 20+ fotos com geo-tag são baseline.",
          "Sites AbraceIA replicam NAP idêntico ao GMB e criam páginas regionais quando o cliente atende RM.",
        ],
      },
    ],
  },
  {
    slug: "aeo-featured-snippets-saude",
    title: "AEO: como conquistar Featured Snippets em saúde",
    excerpt: "Respostas de 40–60 palavras, FAQ estruturado e Schema FAQPage para posição zero.",
    keyword: "AEO saúde featured snippet",
    publishedAt: "2026-01-15",
    readMinutes: 6,
    sections: [
      {
        heading: "Formato ideal de resposta",
        paragraphs: [
          "Featured Snippets capturam parcela significativa de cliques. Resposta direta no primeiro parágrafo, depois aprofundamento.",
          "Cada pergunta do 'As pessoas também perguntam' vira um H2 no artigo com resposta objetiva.",
        ],
      },
    ],
  },
  {
    slug: "marketing-ia-cfm-permitido",
    title: "Marketing com IA é permitido pelo CFM?",
    excerpt: "Res. 2.336/2023: o que mudou na publicidade médica digital e como usar IA com responsabilidade.",
    keyword: "marketing IA CFM permitido",
    publishedAt: "2026-01-05",
    readMinutes: 8,
    sections: [
      {
        heading: "IA como ferramenta, não como médico",
        paragraphs: [
          "IA pode auxiliar redação, análise de dados e triagem comercial — nunca diagnóstico ou prescrição.",
          "Conteúdo publicado exige revisão por profissional habilitado identificado (E-E-A-T YMYL).",
        ],
      },
    ],
  },
  {
    slug: "nextjs-vs-wordpress-sites-medicos",
    title: "Next.js vs WordPress para sites médicos",
    excerpt: "Performance, segurança CVE e SEO arquitetural — comparativo para clínicas em 2026.",
    keyword: "Next.js site médico vs WordPress",
    publishedAt: "2025-12-20",
    readMinutes: 7,
    sections: [
      {
        heading: "Performance e Core Web Vitals",
        paragraphs: [
          "WordPress + Elementor frequentemente entrega LCP acima de 3s. Next.js 16 com Turbopack atinge meta AbraceIA de ≤0,8s.",
          "Google trata saúde como YMYL — site lento perde posição e confiança.",
        ],
      },
    ],
  },
  {
    slug: "eeat-conteudo-medico",
    title: "E-E-A-T em conteúdo médico: autor e revisor",
    excerpt: "Experience, Expertise, Authoritativeness, Trust — requisitos para ranquear e ser citado por IAs.",
    keyword: "E-E-A-T conteúdo médico",
    publishedAt: "2025-12-10",
    readMinutes: 6,
    sections: [
      {
        heading: "Autor credenciado visível",
        paragraphs: [
          "Nome, CRM, RQE e formação no byline. Revisor especialista em bloco separado — padrão AuthorBox AbraceIA.",
          "Páginas sem E-E-A-T são excluídas de citações em IAs para temas de saúde.",
        ],
      },
    ],
  },
  {
    slug: "whatsapp-conversao-clinicas",
    title: "WhatsApp como canal de conversão para clínicas",
    excerpt: "Botão flutuante, eventos GA4 e copy compliance para agendamentos via WhatsApp.",
    keyword: "WhatsApp clínica conversão",
    publishedAt: "2025-11-28",
    readMinutes: 5,
    sections: [
      {
        heading: "Tracking click_whatsapp",
        paragraphs: [
          "Evento customizado no GTM mede cliques no botão flutuante e links de agendamento.",
          "Mensagem pré-preenchida reduz fricção e qualifica o lead antes da conversa.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export { defaultAuthor, medicalReviewer };
