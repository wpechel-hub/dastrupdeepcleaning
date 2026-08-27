type ContractFields = {
  clientName: string;
  serviceAddress: string;
  content: string;
};

function ClauseParagraph({ block }: { block: string }) {
  const isSubBullet = /^\s*-\s/.test(block);
  if (isSubBullet) {
    return <p className="ml-6 text-sm text-[#333]">• {block.replace(/^\s*-\s*/, "")}</p>;
  }

  const match = block.match(/^(\d+)\.\s([\s\S]*)$/);
  if (match) {
    return (
      <p>
        <strong className="text-[#1a1a1a]">{match[1]}.</strong> {match[2]}
      </p>
    );
  }

  return <p>{block}</p>;
}

/** Dastrup Deep Cleaning's Service Agreement — fixed header/address, editable clause body. */
export function ContractBody({ f }: { f: ContractFields }) {
  const blocks = f.content.split(/\n\s*\n/).filter((b) => b.trim().length > 0);

  return (
    <div className="prose-contract text-[#1a1a1a] leading-relaxed">
      <p>
        <strong className="text-[#1B4B7A]">{f.clientName}</strong> (&ldquo;Client&rdquo;) hereby accepts the
        proposal of <strong>DASTRUP DEEP CLEANING</strong> (&ldquo;Company&rdquo;) for janitorial services
        provided at the following address:
      </p>

      <div className="text-center my-4">
        <p className="font-bold uppercase m-0">{f.clientName}</p>
        <p className="m-0">{f.serviceAddress}</p>
        <p className="m-0">with the following terms:</p>
      </div>

      <div className="contract-clauses space-y-3">
        {blocks.map((block, i) => (
          <ClauseParagraph key={i} block={block} />
        ))}
      </div>
    </div>
  );
}
