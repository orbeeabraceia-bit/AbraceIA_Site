import { defaultAuthor, medicalReviewer } from "./cases";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  keyword: string;
  publishedAt: string;
  /** Data da última revisão real do conteúdo (opcional). Alimenta dateModified. */
  updatedAt?: string;
  readMinutes: number;
  /** Resposta direta (40–60 palavras) para Featured Snippets — "definição em caixa" (AEO). */
  summary?: string;
  sections: { heading: string; paragraphs: string[] }[];
  faq?: { question: string; answer: string }[];
  relatedCaseSlugs?: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "como-aparecer-no-chatgpt-saude",
    title: "Como aparecer no ChatGPT sem infringir o CFM",
    excerpt: "Guia prático de GEO para médicos: llms.txt, E-E-A-T e Res. CFM 2.336/2023.",
    keyword: "como aparecer no ChatGPT saúde",
    summary:
      "Para aparecer no ChatGPT sem infringir o CFM, publique um llms.txt na raiz do site, libere os bots de IA no robots.txt e produza conteúdo educativo com autor credenciado (CRM/RQE) e revisor visível — tudo dentro da Resolução 2.336/2023, sem promessa de resultado, superlativos ou antes/depois sem TCLE.",
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
    summary:
      "Em 2026, as metas de Core Web Vitals para sites médicos são LCP ≤ 0,8s, INP ≤ 200ms e CLS ≤ 0,05 no mobile. Sites em Next.js atingem esses números nativamente, sem plugins de cache. Meça com o PageSpeed Insights e o relatório do Google Search Console, sempre priorizando o mobile.",
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
    summary:
      "A Orbee Labs administra hoje quatro sites de saúde em BH: Dra. Laura Thiersch (neuropediatria), Dra. Janaína Drumond (ortopedia), Dra. Paula Kac (geriatria) e Eric Moreira (psicologia TCC). Todos em produção, com CRM ou CRP visível, compliance do conselho e arquitetura focada em SEO, performance e conversão.",
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
        answer: "Sim. Todos estão públicos e linkados na página /cases do AbraceIA.",
      },
    ],
  },
  {
    slug: "schema-markup-saude",
    title: "Schema JSON-LD para clínicas: guia prático",
    excerpt:
      "Physician, MedicalBusiness, FAQPage e MedicalProcedure — como implementar no Next.js.",
    keyword: "schema markup site médico",
    summary:
      "Para clínicas, os principais schemas JSON-LD são Physician, MedicalBusiness, FAQPage e MedicalProcedure. Eles ajudam Google e IAs a identificar autor, especialidade e serviços, aumentando o CTR com rich snippets. O ideal é implementá-los direto no código — não via plugin tardio — em cada página do sitemap.",
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
    summary:
      "llms.txt é um arquivo Markdown na raiz do site (padrão llmstxt.org) que orienta IAs generativas sobre a clínica, os serviços, o compliance e as fontes credenciadas. Para clínicas, ele complementa o robots.txt que libera bots como GPTBot, ClaudeBot e PerplexityBot, ajudando o profissional a ser citado nas respostas.",
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
    excerpt:
      "Google Business Profile, NAP consistente e páginas regionais para Savassi, Funcionários e RM.",
    keyword: "SEO local clínica BH",
    summary:
      "SEO local para clínicas em BH começa com um Google Business Profile otimizado: nome com palavra-chave, categorias corretas e mais de 20 fotos com geo-tag. Mantenha o NAP (nome, endereço e telefone) idêntico em todos os canais e crie páginas regionais para Savassi, Funcionários e a região metropolitana.",
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
    summary:
      "Para conquistar Featured Snippets em saúde, responda à pergunta de forma direta nas primeiras 40 a 60 palavras, logo após um H2 que repete a dúvida. Use listas e tabelas, transforme cada item do 'As pessoas também perguntam' em um H2 e marque o conteúdo com Schema FAQPage.",
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
    excerpt:
      "Res. 2.336/2023: o que mudou na publicidade médica digital e como usar IA com responsabilidade.",
    keyword: "marketing IA CFM permitido",
    summary:
      "Sim, o marketing com IA é permitido pelo CFM (Res. 2.336/2023), desde que a IA seja ferramenta — auxiliando redação, análise de dados e triagem comercial, nunca diagnóstico ou prescrição. Todo conteúdo publicado precisa de revisão por profissional habilitado e identificado, seguindo os princípios de E-E-A-T para temas YMYL.",
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
    summary:
      "Para sites médicos, o Next.js supera o WordPress em performance (LCP ≤ 0,8s contra, muitas vezes, mais de 3s no Elementor), segurança (sem o histórico de CVEs de plugins) e SEO arquitetural. Como saúde é YMYL, um site lento perde posição e confiança — por isso a escolha da stack importa.",
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
    excerpt:
      "Experience, Expertise, Authoritativeness, Trust — requisitos para ranquear e ser citado por IAs.",
    keyword: "E-E-A-T conteúdo médico",
    summary:
      "E-E-A-T (Experience, Expertise, Authoritativeness, Trust) em conteúdo médico exige autor credenciado visível — nome, CRM, RQE e formação no byline — e um revisor especialista em bloco separado. Páginas sem esses sinais de autoria e revisão são excluídas de citações em IAs para temas de saúde.",
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
    summary:
      "Para usar o WhatsApp como canal de conversão em clínicas, combine um botão flutuante com mensagem pré-preenchida e meça os cliques com um evento GA4 (click_whatsapp) via GTM. A mensagem pronta reduz a fricção e qualifica o lead antes da conversa, sempre com copy dentro do compliance do conselho.",
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
