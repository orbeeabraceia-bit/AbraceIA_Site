import { defaultAuthor, medicalReviewer } from "@/lib/content/cases";

export function AuthorBox() {
  return (
    <aside
      className="my-10 rounded-card border border-border bg-cream p-6"
      aria-label="Autoria e revisão"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-ai">E-E-A-T · YMYL</p>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-navy">Autor</p>
          <p className="mt-1 font-medium text-navy">{defaultAuthor.name}</p>
          <p className="text-sm text-muted-foreground">{defaultAuthor.role}</p>
          <p className="text-sm text-muted-foreground">{defaultAuthor.credentials}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-navy">Revisor</p>
          <p className="mt-1 font-medium text-navy">{medicalReviewer.name}</p>
          <p className="text-sm text-muted-foreground">{medicalReviewer.role}</p>
          <p className="text-sm text-muted-foreground">{medicalReviewer.credentials}</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">{medicalReviewer.disclaimer}</p>
    </aside>
  );
}
