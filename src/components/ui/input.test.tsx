import { render, screen } from "@testing-library/react";
import { Input } from "@/components/ui/input";

describe("Input — acessibilidade", () => {
  it("associa o label ao input mesmo sem name/id explícitos", () => {
    render(<Input label="Visitas mensais" />);
    // getByLabelText só encontra o campo se a associação label↔input existir.
    expect(screen.getByLabelText("Visitas mensais")).toBeInTheDocument();
  });

  it("usa o name como id quando fornecido", () => {
    render(<Input label="E-mail" name="email" />);
    expect(screen.getByLabelText("E-mail")).toHaveAttribute("id", "email");
  });
});
