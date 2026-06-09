import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renderiza variante primary", () => {
    render(<Button intent="primary">Enviar</Button>);
    expect(screen.getByRole("button", { name: "Enviar" })).toBeInTheDocument();
  });

  it("renderiza variante ai", () => {
    render(<Button intent="ai">Auditoria</Button>);
    const btn = screen.getByRole("button", { name: "Auditoria" });
    expect(btn.className).toMatch(/orbee-btn-gradient/);
  });

  it("fica desabilitado quando disabled", () => {
    render(
      <Button intent="care" disabled>
        Aguarde
      </Button>,
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
