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
