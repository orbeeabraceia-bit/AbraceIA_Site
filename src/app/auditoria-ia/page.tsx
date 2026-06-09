import Link from "next/link";
import { ClientPortfolioStrip } from "@/components/cases/client-portfolio-strip";
import { AuditoriaForm } from "@/components/auditoria/auditoria-form";
import { Button } from "@/components/ui/button";

export default function AuditoriaIaPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <h1 className="font-display text-3xl font-bold text-navy">Auditoria de presença em IA</h1>
      <p className="mt-4 text-muted-foreground">
        Informe nome, especialidade e cidade. Geramos relatório orientativo sobre citação em IAs —
        não substitui diagnóstico comercial completo.
      </p>

      <ClientPortfolioStrip
        className="mt-8"
        title="Referência: sites que a AbraceIA administra hoje"
        showCaseLinks
      />

      <AuditoriaForm />

      <div className="mt-10 rounded-card border border-ai-100 bg-ai-50 p-5">
        <p className="text-sm font-semibold text-navy">Quer ver a arquitetura por trás?</p>
        <p className="mt-2 text-sm text-muted-foreground">
          A Dra. Janaína Drumond publica &ldquo;Desenvolvido por Orbee Labs&rdquo; no rodapé — FAQ,
          depoimentos com disclaimer CFM e páginas por condição são o padrão que replicamos.
        </p>
        <Link href="/cases" className="mt-4 inline-block">
          <Button intent="outline" size="sm">
            Explorar todos os cases
          </Button>
        </Link>
      </div>
    </div>
  );
}
