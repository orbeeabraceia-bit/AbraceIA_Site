// Landing pages por especialidade (verticais de marketing local em BH).
// Liberdade criativa de layout — ver src/app/marketing/[slug]/page.tsx —
// mas o compliance de cada conselho é obrigatório.

export type LandingAccent = "cyan" | "violet" | "emerald" | "amber" | "rose";

export type Landing = {
  slug: string;
  shortLabel: string; // "Odontologia"
  specialty: string; // descrição longa
  council: string; // norma + número (conforme llms.txt do projeto)
  registry: string; // sigla do registro profissional
  accent: LandingAccent;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  hero: { eyebrow: string; h1: string; sub: string };
  pains: { title: string; desc: string }[];
  deliver: { title: string; desc: string }[];
  complianceNote: string;
  relatedCaseSlug?: string;
  faq: { question: string; answer: string }[];
};

export const landings: Landing[] = [
  {
    slug: "odontologico-bh",
    shortLabel: "Odontologia",
    specialty: "Dentistas e clínicas odontológicas",
    council: "Res. CFO 196/2019",
    registry: "CRO",
    accent: "cyan",
    metaTitle: "Marketing Odontológico em BH — Dentistas e Clínicas",
    metaDescription:
      "Sites, SEO local e presença em IA para dentistas e clínicas odontológicas de Belo Horizonte. Mais pacientes certos, dentro da Res. CFO 196/2019.",
    keywords: ["marketing para dentistas BH", "marketing odontológico Belo Horizonte", "site para dentista BH"],
    hero: {
      eyebrow: "Marketing para dentistas · Belo Horizonte",
      h1: "Encha a agenda do consultório — sem ferir o CFO",
      sub: "Site próprio, SEO local e citação em IA para clínicas e consultórios odontológicos de BH. Quem busca 'implante' ou 'dentista no meu bairro' encontra você primeiro.",
    },
    pains: [
      { title: "Refém do boca a boca", desc: "Sem site e SEO local, você é invisível para quem procura um dentista agora, no Google e no Maps." },
      { title: "Instagram não vira cadeira", desc: "Seguidor não é paciente. Falta o caminho claro do post até o agendamento." },
      { title: "Medo de infringir o CFO", desc: "Antes/depois e promessa assustam — mas dá para divulgar com segurança e atrair mais." },
    ],
    deliver: [
      { title: "Apareça no Google Maps", desc: "SEO local + Google Meu Negócio otimizado para 'dentista [bairro] BH', 'implante BH' e urgências." },
      { title: "Uma página por procedimento", desc: "Implante, ortodontia, clareamento, urgência — cada um com sua página, keyword e Schema." },
      { title: "Citação em IA (GEO)", desc: "Quando o paciente pergunta ao ChatGPT ou ao Google AI, sua clínica entra na resposta." },
    ],
    complianceNote:
      "Tudo dentro da Res. CFO 196/2019: identificação com CRO, conteúdo educativo, sem promessa de resultado e sem antes/depois como chamariz.",
    faq: [
      {
        question: "Dentista pode anunciar no Google e no Instagram?",
        answer:
          "Pode, com identificação (CRO) e conteúdo educativo. A Res. CFO 196/2019 proíbe promessa de resultado, sensacionalismo e antes/depois como isca — não a presença digital em si.",
      },
      {
        question: "Em quanto tempo apareço no Google Maps?",
        answer:
          "Com Google Meu Negócio otimizado e SEO local bem feito, os primeiros sinais surgem em semanas. O ranqueamento competitivo amadurece em alguns meses, sempre com métricas documentadas.",
      },
    ],
  },
  {
    slug: "psicologos-bh",
    shortLabel: "Psicologia",
    specialty: "Psicólogos e clínicas de psicologia",
    council: "Res. CFP 23/2022",
    registry: "CRP",
    accent: "violet",
    metaTitle: "Marketing para Psicólogos em BH — Ética e Agenda Cheia",
    metaDescription:
      "Presença digital para psicólogos de Belo Horizonte que respeita a Res. CFP 23/2022 e conecta você ao paciente certo — online ou presencial.",
    keywords: ["marketing para psicólogos BH", "site para psicólogo Belo Horizonte", "marketing psicologia compliance"],
    hero: {
      eyebrow: "Marketing para psicólogos · Belo Horizonte",
      h1: "Atraia o paciente certo, com ética e presença sólida",
      sub: "Site, SEO e conteúdo que respeitam a Res. CFP 23/2022 e o sigilo — e ainda assim lotam sua agenda, em BH ou na teleconsulta.",
    },
    pains: [
      { title: "Captação só por indicação", desc: "Sem presença própria, você depende de quem já te conhece — e perde quem busca ajuda agora." },
      { title: "Receio do que o CFP permite", desc: "Muita gente trava com medo de errar. Dá para comunicar com autoridade e dentro da norma." },
      { title: "Site que não transmite confiança", desc: "Em saúde mental, confiança é tudo. Um site genérico afasta em vez de acolher." },
    ],
    deliver: [
      { title: "Páginas por demanda", desc: "Ansiedade, pânico, burnout, terapia de casal — conteúdo que acolhe e ranqueia." },
      { title: "Autoridade e E-E-A-T", desc: "CRP visível, abordagem (TCC e outras) e prova de autoridade, sem expor o paciente." },
      { title: "Online + presencial", desc: "Estrutura pronta para teleconsulta e para o atendimento presencial em BH." },
    ],
    complianceNote:
      "Conforme a Res. CFP 23/2022: identificação com CRP, sem promessa de cura, sem sensacionalismo e com o sigilo no centro de tudo.",
    relatedCaseSlug: "eric-moreira-psicologia-tcc",
    faq: [
      {
        question: "Psicólogo pode fazer marketing digital?",
        answer:
          "Sim. A Res. CFP 23/2022 permite divulgação com identificação (CRP) e conteúdo informativo. O que ela veda é promessa de cura, sensacionalismo e qualquer captação que banalize o sofrimento.",
      },
      {
        question: "Posso usar depoimentos de pacientes?",
        answer:
          "Com muita cautela: o sigilo é central. Em vez de depoimento clínico, priorizamos prova de autoridade — formação, abordagem e conteúdo educativo — que gera confiança sem expor ninguém.",
      },
    ],
  },
  {
    slug: "nutricao-bh",
    shortLabel: "Nutrição",
    specialty: "Nutricionistas e clínicas de nutrição",
    council: "Res. CFN 856/2026",
    registry: "CRN",
    accent: "emerald",
    metaTitle: "Marketing para Nutricionistas em BH — Autoridade que Converte",
    metaDescription:
      "Site, SEO e conteúdo para nutricionistas de Belo Horizonte atraírem o paciente certo — com base científica e sem prometer emagrecimento, conforme o CFN.",
    keywords: ["marketing para nutricionistas BH", "site para nutricionista Belo Horizonte", "marketing nutrição compliance"],
    hero: {
      eyebrow: "Marketing para nutricionistas · Belo Horizonte",
      h1: "Autoridade que diferencia você das dietas milagrosas",
      sub: "Presença digital com base científica para nutricionistas de BH. Atraia quem valoriza ciência — sem prometer resultado, dentro das normas do CFN.",
    },
    pains: [
      { title: "Disputa com promessas vazias", desc: "Enquanto perfis prometem emagrecimento mágico, quem faz sério precisa de autoridade visível." },
      { title: "Instagram cheio, agenda vazia", desc: "Engajamento não paga conta. Falta converter audiência em consulta." },
      { title: "Sem site, sem autoridade", desc: "Sem uma base própria, é difícil ranquear e provar especialização." },
    ],
    deliver: [
      { title: "Conteúdo de autoridade", desc: "Educação nutricional com base científica que ranqueia e separa você das promessas." },
      { title: "Nichos e abordagens", desc: "Esportiva, clínica, materno-infantil, comportamental — páginas específicas por foco." },
      { title: "Conversão real", desc: "Do conteúdo ao agendamento por WhatsApp, com tracking do que funciona." },
    ],
    complianceNote:
      "Dentro das normas do CFN (Res. CFN 856/2026): identificação com CRN, base científica e sem promessa de resultado ou de perda de peso.",
    faq: [
      {
        question: "Nutricionista pode prometer emagrecimento no anúncio?",
        answer:
          "Não. As normas do CFN vedam promessa de resultado e de perda de peso. O que funciona — e é permitido — é autoridade: conteúdo educativo com base científica e identificação (CRN).",
      },
      {
        question: "Como me diferenciar de quem promete milagre?",
        answer:
          "Justamente pela seriedade: conteúdo que explica o porquê, prova de formação e foco numa abordagem. Isso atrai o paciente que valoriza ciência e tende a aderir mais ao acompanhamento.",
      },
    ],
  },
  {
    slug: "fisioterapia-bh",
    shortLabel: "Fisioterapia",
    specialty: "Fisioterapeutas e clínicas de fisioterapia",
    council: "Res. COFFITO 532/2021",
    registry: "CREFITO",
    accent: "amber",
    metaTitle: "Marketing para Fisioterapeutas em BH — Mais Pacientes Diretos",
    metaDescription:
      "Presença digital para clínicas e fisioterapeutas de Belo Horizonte — pilates, RPG, ortopédica, domiciliar — conforme a Res. COFFITO 532/2021.",
    keywords: ["marketing para fisioterapeutas BH", "site para fisioterapeuta Belo Horizonte", "fisioterapeuta domiciliar BH"],
    hero: {
      eyebrow: "Marketing para fisioterapeutas · Belo Horizonte",
      h1: "Pacientes que buscam você direto — não só por encaminhamento",
      sub: "Site, SEO local e conteúdo para fisioterapeutas de BH: pilates clínico, RPG, esportiva e domiciliar. Captação direta, conforme a Res. COFFITO 532/2021.",
    },
    pains: [
      { title: "Dependência de encaminhamento", desc: "Esperar o médico indicar limita o crescimento. Muita gente já busca fisioterapeuta direto no Google." },
      { title: "Invisível na busca local", desc: "Sem SEO local, você perde o paciente que digita 'fisioterapeuta domiciliar BH'." },
      { title: "Antes/depois é arriscado", desc: "Comunicar evolução sem ferir o COFFITO exige método — e funciona melhor que sensacionalismo." },
    ],
    deliver: [
      { title: "Páginas por especialidade", desc: "Pilates clínico, RPG, esportiva, domiciliar, pélvica — cada foco com sua página." },
      { title: "SEO local + domiciliar", desc: "Captação para bairros de BH e para o serviço domiciliar, de alta intenção." },
      { title: "Método em vez de promessa", desc: "Conteúdo que comunica evidência e processo, gerando confiança dentro da norma." },
    ],
    complianceNote:
      "Conforme a Res. COFFITO 532/2021: identificação com CREFITO, conteúdo educativo, sem sensacionalismo nem promessa de cura.",
    faq: [
      {
        question: "Fisioterapeuta pode divulgar antes/depois?",
        answer:
          "Com muita cautela. A Res. COFFITO 532/2021 veda sensacionalismo e promessa de resultado. Imagens só com consentimento e finalidade educativa — preferimos comunicar método e evidência.",
      },
      {
        question: "Vale a pena ter site se atendo por convênio?",
        answer:
          "Sim. Mesmo no convênio, o site capta o particular, o domiciliar e o paciente que pesquisa antes de escolher. É o ativo que ranqueia e converte no seu WhatsApp, sem intermediário.",
      },
    ],
  },
  {
    slug: "clinicas-multidisciplinares",
    shortLabel: "Clínicas multidisciplinares",
    specialty: "Clínicas e centros de saúde multidisciplinares",
    council: "CFM, CFO, CFP, CFN e COFFITO",
    registry: "registro de cada profissional",
    accent: "rose",
    metaTitle: "Marketing para Clínicas Multidisciplinares em BH",
    metaDescription:
      "Uma presença digital que organiza várias especialidades sob uma marca forte em Belo Horizonte — com o compliance de cada conselho (CFM, CFO, CFP, CFN, COFFITO).",
    keywords: ["marketing clínica multidisciplinar BH", "site para clínica BH", "agência marketing clínica saúde"],
    hero: {
      eyebrow: "Clínicas e centros de saúde · Belo Horizonte",
      h1: "Várias especialidades, uma marca forte — e cada uma em compliance",
      sub: "Arquitetura digital que dá a cada especialidade sua página e seu funil, sob uma marca coesa, respeitando a norma de cada conselho.",
    },
    pains: [
      { title: "Muitas áreas, marca confusa", desc: "Quando tudo cabe numa página só, nenhuma especialidade ranqueia e a marca não fixa." },
      { title: "Cada um puxa pra um lado", desc: "Sem padrão, o site vira colcha de retalhos e o paciente se perde." },
      { title: "Compliance multiplicado", desc: "Cada conselho tem sua régua. Errar em uma área expõe a clínica inteira." },
    ],
    deliver: [
      { title: "Arquitetura por especialidade", desc: "Cada área com sua página, Schema e palavras-chave, sob uma marca e navegação coesas." },
      { title: "SEO local forte", desc: "Captação para o nome da clínica e para cada serviço, no Google e no Maps." },
      { title: "Compliance multi-conselho", desc: "CFM, CFO, CFP, CFN, COFFITO — cada conteúdo na régua certa, sem violar nenhuma." },
    ],
    complianceNote:
      "Cada especialidade segue a norma do seu conselho (CFM, CFO, CFP, CFN, COFFITO). Centralizamos a marca sem violar nenhuma delas.",
    faq: [
      {
        question: "Como organizar uma clínica com várias especialidades no site?",
        answer:
          "Cada especialidade ganha sua própria página, com Schema e palavras-chave próprias, todas sob uma marca e navegação coesas. Isso melhora o SEO de cada serviço e mantém a identidade da clínica.",
      },
      {
        question: "Dá para manter o compliance de todos os conselhos num site só?",
        answer:
          "Sim. Tratamos cada área conforme a norma do seu conselho (CFM, CFO, CFP, CFN, COFFITO), com revisão por profissional habilitado. A marca é única; as regras, específicas por especialidade.",
      },
    ],
  },
];

export function getLanding(slug: string) {
  return landings.find((l) => l.slug === slug);
}
