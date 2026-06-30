type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  // Emite um <script> por objeto. Mais compatível que um único array
  // (alguns parsers/extensões assumem um objeto no topo e quebram com arrays).
  const items = Array.isArray(data) ? data : [data];
  // Escapa "<" para evitar que um eventual "</script>" em dado dinâmico quebre
  // a tag e abra brecha de injeção. < é equivalente em JSON.
  const serialize = (item: Record<string, unknown>) =>
    JSON.stringify(item).replace(/</g, "\\u003c");
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialize(item) }}
        />
      ))}
    </>
  );
}
