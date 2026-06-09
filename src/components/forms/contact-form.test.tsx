import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/forms/contact-form";

global.fetch = jest.fn(() =>
  Promise.resolve({ ok: true, json: async () => ({ ok: true }) }),
) as jest.Mock;

describe("ContactForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("exibe campos obrigatórios", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument();
  });

  it("envia formulário com consentimento", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/nome completo/i), "Dr. Teste");
    await user.type(screen.getByLabelText(/e-mail/i), "teste@clinica.com.br");
    await user.type(screen.getByLabelText(/mensagem/i), "Quero auditoria de IA para minha clínica.");
    await user.click(screen.getByRole("checkbox"));

    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(/sucesso/i);
    });
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" }),
    );
  });
});
