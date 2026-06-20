// Conventional Commits (Cap. 4.3 do Livro-Guia). Valida a mensagem no hook
// commit-msg via Husky.
const config = {
  extends: ["@commitlint/config-conventional"],
};

export default config;
