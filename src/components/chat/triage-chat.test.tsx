import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TriageChat } from "@/components/chat/triage-chat";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: async () => ({ reply: "Posso ajudar com GEO.", fallback: false }),
  }),
) as jest.Mock;

describe("TriageChat", () => {
  it("mostra mensagem inicial", () => {
    render(<TriageChat />);
    expect(screen.getByText(/presença digital/i)).toBeInTheDocument();
  });

  it("envia mensagem e exibe resposta", async () => {
    const user = userEvent.setup();
    render(<TriageChat />);

    await user.type(
      screen.getByLabelText(/sua mensagem/i),
      "Como aparecer no ChatGPT?",
    );
    await user.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Posso ajudar com GEO/i)).toBeInTheDocument();
    });
  });

  it("estado de loading ao enviar", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(() => resolve({
        ok: true,
        json: async () => ({ reply: "Ok", fallback: true }),
      }), 100)),
    );
    const user = userEvent.setup();
    render(<TriageChat />);
    await user.type(screen.getByLabelText(/sua mensagem/i), "Teste");
    await user.click(screen.getByRole("button", { name: /enviar/i }));
    expect(screen.getByText(/analisando/i)).toBeInTheDocument();
  });
});
