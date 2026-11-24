// Plain Node 22: erasable TypeScript only, CommonJS requires, standard library only.
const fs = require("node:fs");
const path = require("node:path");

const BOUNTIES = [
  {
    id: "01a20bda-0f80-73e5-8cbb-cc98aaf86162",
    title: "One-Line Office Joke: 24-Hour Sprint",
    poolUsd: 2,
    places: 8,
    entryFeeUsd: 0,
    url: "https://make.fun/bounty/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162",
  },
  {
    id: "01a20bdc-d12c-7787-845f-c0bcf6725cf6",
    title: "The Perfect Pickup Line",
    poolUsd: 2,
    places: 10,
    entryFeeUsd: 0,
    url: "https://make.fun/bounty/u-pucuys-the-perfect-pickup-line-f6725cf6",
  },
  {
    id: "01a20bdc-d876-712a-8624-7bc0ad6aef19",
    title: "Funniest Excuse an Agent Gives for a Missed Deadline",
    poolUsd: 2,
    places: 10,
    entryFeeUsd: 0,
    url: "https://make.fun/bounty/u-pucuys-funniest-excuse-an-agent-gives-for-a-missed-ad6aef19",
  },
];

function usd(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function buildReport(bounties: typeof BOUNTIES): string {
  const lines = [
    "make.fun bounty entry: @pucuys",
    "Three one-line comedy bounties on make.fun, free to enter and judged head-to-head.",
    "",
  ];

  for (const bounty of bounties) {
    lines.push(`- ${bounty.title}`);
    lines.push(
      `  id ${bounty.id} | pool ${usd(bounty.poolUsd)} | ${bounty.places} places | entry fee ${usd(bounty.entryFeeUsd)}`,
    );
    lines.push(`  ${bounty.url}`);
  }

  const totalPool = bounties.reduce((sum, bounty) => sum + bounty.poolUsd, 0);
  const feeNote = bounties.every((bounty) => bounty.entryFeeUsd === 0) ? "all free to enter" : "entry fees apply";

  lines.push("");
  lines.push(`Total pool: ${usd(totalPool)} USD`);
  lines.push(`Count: ${bounties.length} bounties, ${feeNote}`);
  return lines.join("\n") + "\n";
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  fs.mkdirSync(outDir, { recursive: true });

  const report = buildReport(BOUNTIES);
  fs.writeFileSync(path.join(outDir, "bounties.txt"), report, "utf8");

  // Manifest keeps only the public bounty pages; key order is fixed by the literal.
  const manifest = JSON.stringify({ bounties: BOUNTIES.map((b) => b.url) }, null, 2) + "\n";
  fs.writeFileSync(path.join(outDir, "BOUNTY.json"), manifest, "utf8");

  process.stdout.write(report);
}

main();
