import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-6xl font-bold text-ai">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-navy">
        Página não encontrada
      </h1>
      <p className="mt-2 text-muted-foreground">
        O endereço pode ter mudado ou não existe mais.
      </p>
      <Link href="/" className="mt-8">
        <Button intent="primary">Voltar ao início</Button>
      </Link>
    </div>
  );
}
