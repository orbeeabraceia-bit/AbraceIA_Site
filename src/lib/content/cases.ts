export const defaultAuthor = {
  name: "Diana Camila",
  role: "Estrategista de Saúde Digital · Orbee Labs",
  credentials: "Responsável técnica editorial AbraceIA",
  url: "https://orbee.com.br",
} as const;

export const medicalReviewer = {
  name: "Equipe Clínica Orbee Labs",
  role: "Revisão médica editorial",
  credentials: "Conteúdo YMYL revisado por profissional habilitado · CRM sob demanda do cliente",
  disclaimer:
    "Conteúdo informativo revisado por profissional habilitado. Não substitui consulta clínica.",
} as const;

/** Sites em produção administrados pela Orbee Labs / AbraceIA */
export const managedClients = [
  {
    name: "Dra. Laura Thiersch",
    url: "https://lauraneuroped.com.br/",
    specialty: "Neuropediatria",
    credentials: "TEA, TDAH e Epilepsia Infantil · BH",
    initials: "LT",
    caseSlug: "dra-laura-thiersch-neuropediatra",
  },
  {
    name: "Dra. Janaína Drumond",
    url: "https://www.janainadrumond.com.br/",
    specialty: "Ortopedia e Traumatologia",
    credentials: "CRM-MG 69719 · RQE 50592 · Savassi",
    initials: "JD",
    caseSlug: "dra-janaina-drumond-ortopedia",
  },
  {
    name: "Dra. Paula Baratz Kac",
    url: "https://drapaulakac.com.br/",
    specialty: "Geriatria",
    credentials: "CRM-MG 86260 · Professora FCMMG",
    initials: "PK",
    caseSlug: "dra-paula-kac-geriatria",
  },
  {
    name: "Eric Moreira",
    url: "https://www.psicologoericmoreira.com.br/",
    specialty: "Psicologia clínica · TCC",
    credentials: "CRP 04/65624 · online e presencial",
    initials: "EM",
    caseSlug: "eric-moreira-psicologia-tcc",
  },
] as const;

export type CaseStudy = {
  slug: string;
  title: string;
  clientName: string;
  websiteUrl: string;
  credentials: string;
  location: string;
  specialty: string;
  challenge: string;
  solution: string;
  timeline: string;
  metrics: { label: string; before: string; after: string }[];
  aiCitations?: { before: number; after: number };
  aiNote?: string;
  stack: string;
  lesson: string;
  quote?: { text: string; author: string };
};

export const cases: CaseStudy[] = [
  {
    slug: "dra-laura-thiersch-neuropediatra",
    title: "Dra. Laura Thiersch — Neuropediatra BH",
    clientName: "Dra. Laura Thiersch",
    websiteUrl: "https://lauraneuroped.com.br/",
    credentials: "Neuropediatra · TEA, TDAH e Epilepsia Infantil",
    location: "Barro Preto, Belo Horizonte/MG",
    specialty: "Neuropediatria",
    challenge:
      "Posicionar neuropediatra especializada em TEA, TDAH e epilepsia infantil em BH, com conteúdo educativo e canais de agendamento claros para famílias.",
    solution:
      "Site com arquitetura YMYL: páginas Sobre, Atendimentos, Blog e FAQ; contato com WhatsApp, e-mail e integração Doctoralia; conteúdo humanizado alinhado ao arquétipo Cuidador.",
    timeline: "Em produção contínua",
    metrics: [
      { label: "FAQ estruturado (AEO)", before: "Não", after: "Sim" },
      { label: "Blog educativo", before: "—", after: "Ativo" },
      { label: "Canais de agendamento", before: "Fragmentados", after: "WhatsApp + Doctoralia" },
      { label: "Schema de saúde", before: "Básico", after: "Physician + local" },
    ],
    aiNote: "Programa GEO AbraceIA — baseline de citação em IAs monitorado trimestralmente.",
    stack: "Next.js · Schema JSON-LD · SEO local BH · Compliance CFM",
    lesson:
      "Conteúdo neuropediátrico exige tom acolhedor e linguagem acessível para pais — FAQ responde dúvidas de TEA/TDAH antes da consulta.",
    quote: {
      text: "Priorizamos um ambiente seguro e de escuta ativa, onde a criança e a família se sintam compreendidas.",
      author: "Posicionamento do site · Dra. Laura Thiersch",
    },
  },
  {
    slug: "dra-janaina-drumond-ortopedia",
    title: "Dra. Janaína Drumond — Ortopedia BH",
    clientName: "Dra. Janaína Drumond",
    websiteUrl: "https://www.janainadrumond.com.br/",
    credentials: "CRM-MG 69719 · RQE 50592 (Ortopedia e Traumatologia)",
    location: "Savassi, Belo Horizonte/MG",
    specialty: "Ortopedia · Mão e Punho",
    challenge:
      "Diferenciar ortopedista com subespecialidade em mão e punho (túnel do carpo, dedo em gatilho, rizartrose) em mercado competitivo de Savassi.",
    solution:
      "Site Orbee Labs com páginas por especialidade e condição, depoimentos com disclaimer CFM, FAQ accordion, blog educativo e credenciais CRM/RQE visíveis em todo o funil.",
    timeline: "Em produção contínua",
    metrics: [
      { label: "Páginas por condição", before: "1", after: "5+" },
      { label: "Depoimentos + disclaimer", before: "Não", after: "Sim (CFM)" },
      { label: "FAQ AEO", before: "Não", after: "Sim" },
      { label: "Formação visível (E-E-A-T)", before: "Parcial", after: "UFOP + FCMMG + SBOT" },
    ],
    aiNote: "Referência de stack AbraceIA 2026 — desenvolvido por Orbee Labs.",
    stack: "Next.js 16 · Schema Physician · Core Web Vitals · Vercel",
    lesson:
      "Subespecialidade (mão e punho) pede landing pages dedicadas por condição — ranqueia melhor que página genérica de ortopedia.",
    quote: {
      text: "Ortopedia com precisão. Cuidado com alma.",
      author: "Dra. Janaína Drumond — tagline do site",
    },
  },
  {
    slug: "dra-paula-kac-geriatria",
    title: "Dra. Paula Baratz Kac — Geriatra BH/RM",
    clientName: "Dra. Paula Baratz Kac",
    websiteUrl: "https://drapaulakac.com.br/",
    credentials: "CRM-MG 86260 · RQE 63079 · Professora FCMMG",
    location: "Nova Lima/MG · atendimento domiciliar BH e RM",
    specialty: "Geriatria",
    challenge:
      "Comunicar geriatria integral (consultório, domiciliar, teleconsulta) para público 60+ e familiares, com páginas regionais e conteúdo de prevenção cognitiva.",
    solution:
      "Arquitetura multi-modalidade, páginas por região (BH, Contagem, Betim, Nova Lima), FAQ extenso, blog, galeria, controles de acessibilidade (A+/A-) e newsletter com consentimento LGPD.",
    timeline: "Em produção contínua",
    metrics: [
      { label: "Modalidades de atendimento", before: "1", after: "3 (presencial + domiciliar + tele)" },
      { label: "Páginas regionais (SEO local)", before: "0", after: "4+" },
      { label: "Acessibilidade WCAG", before: "Básica", after: "Controles A+/A-" },
      { label: "Serviços estruturados", before: "Lista", after: "Páginas dedicadas (AGA, cognição…)" },
    ],
    aiNote: "Conteúdo geriátrico YMYL com autor professora FCMMG — forte sinal E-E-A-T.",
    stack: "Next.js · Schema MedicalBusiness · SEO local multi-cidade · LGPD",
    lesson:
      "Geriatria exige páginas regionais separadas e linguagem que fala com familiares — não só com o paciente idoso.",
  },
  {
    slug: "eric-moreira-psicologia-tcc",
    title: "Eric Moreira — Psicólogo TCC Online",
    clientName: "Eric Moreira",
    websiteUrl: "https://www.psicologoericmoreira.com.br/",
    credentials: "CRP 04/65624 · Especialista em TCC",
    location: "Atendimento online (Brasil) · presencial BH",
    specialty: "Psicologia clínica · TCC",
    challenge:
      "Converter buscas por ansiedade, depressão e terapia online em agendamentos, mantendo compliance CFP e base evidências científicas.",
    solution:
      "Site com serviços por demanda emocional, jornada TCC em 3 etapas, depoimentos, blog, recursos gratuitos, área do cliente e CRP visível em todo o site.",
    timeline: "Em produção contínua",
    metrics: [
      { label: "Landing pages por demanda", before: "0", after: "8+" },
      { label: "Processo TCC explicado", before: "Não", after: "Sim (3 etapas)" },
      { label: "Terapia online destacada", before: "Secundária", after: "Hero + serviço dedicado" },
      { label: "CRP visível (E-E-A-T)", before: "Rodapé", after: "Hero + footer" },
    ],
    aiNote: "Psicologia clínica — compliance CFP com linguagem acolhedora e sem promessas de cura.",
    stack: "Next.js · Schema Person/ProfessionalService · SEO nacional + local BH",
    lesson:
      "Psicólogo online precisa de páginas por sintoma (ansiedade, pânico, burnout) — o paciente busca a dor, não o nome da técnica.",
    quote: {
      text: "Profissional ético e competente. Super recomendo!",
      author: "Depoimento publicado no site · Ana Carolina Puygcerver",
    },
  },
];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}
