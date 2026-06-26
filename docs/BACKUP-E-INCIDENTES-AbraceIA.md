# Backup & Resposta a Incidentes — AbraceIA

> Runbook operacional de continuidade e segurança de dados (LGPD).
> Vertical de saúde da Orbee Labs · Stack: Vercel (região `gru1`) + Neon Postgres + Resend.
>
> **Status:** versão inicial. Itens marcados com ⚠️ dependem de **decisão humana**
> (stakeholder/jurídico) antes de serem considerados definitivos.

---

## 1. Objetivo e escopo

Garantir que os dados pessoais e os ativos do AbraceIA possam ser **recuperados**
após falha ou perda, e que qualquer **incidente de segurança** seja contido,
avaliado e comunicado dentro dos prazos legais.

Cobre: banco de dados (Neon), código/configuração (GitHub + Vercel) e os segredos
de ambiente. **Não** cobre dados clínicos de pacientes — por design o site não
coleta nem armazena diagnóstico (ver `/privacidade` e disclaimer de IA).

---

## 2. Inventário de dados e ativos

| Ativo | Onde vive | Contém PII? | Criticidade |
|---|---|---|---|
| Tabela `Lead` (nome, e-mail, telefone, mensagem, consentimento) | Neon Postgres | **Sim** — dado pessoal | Alta |
| Tabela `QuizResult` (score, respostas JSON, e-mail opcional) | Neon Postgres | Parcial (e-mail opcional) | Média |
| Código-fonte | GitHub (`orbeeabraceia-bit/AbraceIA_Site`) | Não | Alta |
| Variáveis de ambiente / segredos | Vercel (Project Settings) | Não (mas dão acesso a PII) | **Crítica** |
| E-mails transacionais de lead | Resend (operador) | Sim (em trânsito) | Média |

**Operadores (sub-processadores) que tratam dados em nosso nome:** Neon
(armazenamento), Vercel (hospedagem/logs), Resend (e-mail), Anthropic/Vercel AI
Gateway (quando a IA for ativada). ⚠️ Cada um exige um **DPA** (Data Processing
Agreement) arquivado — ver §10.

---

## 3. Política de backup

### 3.1 Banco de dados (Neon)
- **Mecanismo primário:** o Neon mantém **Point-in-Time Recovery (PITR)** contínuo
  via history retention, permitindo restaurar o banco para qualquer instante
  dentro da janela de retenção, e **branching** instantâneo para restauração não
  destrutiva (cria um branch a partir de um timestamp e valida antes de promover).
- **Janela de retenção:** ⚠️ definir conforme o plano Neon contratado (o plano
  gratuito retém ~24h; planos pagos chegam a 7–30 dias). **Meta recomendada: ≥ 7
  dias.**
- **Backup lógico redundante (defesa em profundidade):** export semanal via
  `pg_dump` para armazenamento frio fora do Neon (ex.: bucket privado), criptografado.
  ⚠️ Definir destino e automação (cron). Enquanto não automatizado, executar
  manualmente antes de qualquer migração de schema.

### 3.2 Código e configuração
- **Código:** versionado no GitHub — o histórico de commits **é** o backup. Manter
  a branch `main` protegida e o CI verde como porta de qualidade.
- **Segredos:** as variáveis de ambiente de produção vivem na Vercel e **não** estão
  em nenhum backup automático. ⚠️ Manter uma cópia dos valores em um **gerenciador
  de segredos** (cofre) fora da Vercel, pois sua perda inviabiliza redeploy e acesso
  ao banco. Nunca commitar `.env` (só `env.example` com placeholders).

### 3.3 Objetivos de recuperação ⚠️
| Métrica | Alvo proposto | A confirmar |
|---|---|---|
| **RPO** (perda máxima de dados) | ≤ 24h | stakeholder |
| **RTO** (tempo até voltar ao ar) | ≤ 4h | stakeholder |

### 3.4 Teste de restauração
Backup não testado **não é** backup. **Trimestralmente:** restaurar o banco para um
branch Neon de teste, subir uma preview na Vercel apontando para ele e validar
login/escrita/leitura. Registrar data e resultado no final deste doc (§9).

---

## 4. Procedimento de restauração (banco)

1. **Não entre em pânico nem apague nada.** O PITR do Neon é não destrutivo.
2. Identifique o **timestamp seguro** (último instante antes da corrupção/perda).
3. No console Neon: criar um **branch** a partir desse timestamp
   (`Branches → Create branch → from timestamp`). Isso gera uma cópia íntegra sem
   tocar no banco atual.
4. Aponte uma **preview deployment** da Vercel para a `DATABASE_URL` do branch e
   **valide** os dados (`Lead`/`QuizResult` presentes e consistentes).
5. Validado: promova o branch a primário **ou** reaponte a `DATABASE_URL` de
   produção para ele. Faça um `pg_dump` antes de qualquer passo destrutivo.
6. Comunique o término e registre o evento (§9). Se houve exposição de PII, vá para §6.

---

## 5. Classificação de incidentes

| Nível | Exemplo | Resposta |
|---|---|---|
| **P1 — Crítico** | Vazamento/acesso indevido a PII; banco comprometido; segredo exposto | Acionar §6 imediatamente |
| **P2 — Alto** | Indisponibilidade total do site; perda de dados sem exposição | Restauração (§4) + post-mortem |
| **P3 — Médio** | Degradação parcial, erro em formulário, falha de e-mail de lead | Corrigir e monitorar |

Um incidente é **comunicável à ANPD** quando puder acarretar **risco ou dano
relevante** aos titulares (LGPD Art. 48). Na dúvida, tratar como comunicável e
consultar o jurídico/Encarregado.

---

## 6. Plano de resposta a incidente de dados (LGPD)

> **Prazo legal:** a **Resolução CD/ANPD nº 15/2024** estabelece comunicação à
> ANPD e aos titulares em **até 3 dias úteis** a partir do conhecimento do
> incidente. O "72h" usado internamente é um **SLA mais conservador** que essa
> regra. ⚠️ A obrigação exata e o conteúdo mínimo devem ser confirmados pela
> revisão jurídica (`comp-juridico`).

**Fluxo (relógio começa no momento do conhecimento):**

1. **Detecção & registro** — quem percebeu abre o registro: o quê, quando, como foi
   notado. Inicia a contagem de prazo.
2. **Contenção (imediata)** — estancar a exposição: revogar/rotacionar segredos
   afetados (Vercel + Neon + Resend), bloquear acesso, isolar o vetor. Preservar
   logs (Vercel) para investigação — **não** apague evidências.
3. **Avaliação (até 24h)** — escopo: quais dados, quantos titulares, qual o risco.
   O Encarregado (⚠️ §8) decide se é comunicável.
4. **Comunicação (até 3 dias úteis / SLA 72h)** — se comunicável, notificar **ANPD**
   e **titulares afetados** com o conteúdo mínimo (§7).
5. **Remediação** — corrigir a causa-raiz, aplicar patch, reforçar controles.
6. **Post-mortem (até 7 dias)** — registrar causa, linha do tempo, ações e lições
   (§9). Sem caça às bruxas; foco em processo.

---

## 7. Conteúdo mínimo da comunicação

À **ANPD** e aos **titulares** deve constar (LGPD Art. 48 §1º):
- a natureza dos dados pessoais afetados;
- os titulares envolvidos (quantidade/categoria);
- as medidas técnicas e de segurança adotadas (antes e em resposta);
- os riscos relacionados ao incidente;
- os motivos de eventual demora, se a comunicação não foi imediata;
- as medidas que foram ou serão tomadas para reverter/mitigar os efeitos.

Modelo de aviso ao titular: linguagem clara, sem jargão, com canal de contato do
Encarregado e orientação prática (ex.: trocar senha, atenção a phishing).

---

## 8. Papéis e contatos

| Papel | Responsável | Contato |
|---|---|---|
| **Encarregado / DPO** | ⚠️ **a nomear** (item `comp-dpo` pendente) | — |
| Resposta técnica (contenção/restauração) | Time de engenharia | — |
| Canal de titulares (LGPD) | Publicado em `/privacidade` | contato@abraceia.com.br |
| Contato operacional da marca | Orbee Labs | orbee.abraceia@gmail.com |

> ⚠️ A `/privacidade` cita `contato@abraceia.com.br` para direitos do titular (prazo
> de 15 dias). Garantir que esse e-mail **exista e seja monitorado** antes do
> go-live, e publicar o nome/canal do Encarregado assim que nomeado.

---

## 9. Registro de testes e incidentes

| Data | Tipo (teste restauração / incidente Pn) | Resultado | Responsável |
|---|---|---|---|
| _(preencher)_ | — | — | — |

---

## 10. Pendências (decisão humana) ⚠️

- [ ] Nomear o **Encarregado/DPO** e publicar o canal (`comp-dpo`).
- [ ] Confirmar a **janela de retenção** do plano Neon (meta ≥ 7 dias).
- [ ] Automatizar o **`pg_dump` semanal** para armazenamento frio criptografado.
- [ ] Guardar os **segredos de produção** num cofre fora da Vercel.
- [ ] Definir e aprovar **RPO/RTO** formais.
- [ ] Arquivar os **DPAs** dos operadores (Neon, Vercel, Resend, Anthropic).
- [ ] **Revisão jurídica** (`comp-juridico`) para validar prazos e conteúdo das
      comunicações de incidente sob a Resolução CD/ANPD nº 15/2024.

---

_Referências: LGPD (Lei 13.709/2018), Art. 48; Resolução CD/ANPD nº 15/2024
(comunicação de incidentes). Documentação do Neon (PITR/branching) e da Vercel
(env vars/logs)._
