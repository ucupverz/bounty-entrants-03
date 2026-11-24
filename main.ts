// Node 22, standard library only. Deterministic: same input -> same bytes.
// Writes this entry's bounty manifest to $MAKEFUN_OUTPUT_DIR (default /output).
const fs = require("node:fs");
const path = require("node:path");

const BOUNTIES = [
  { id: "01a20bda-0f80-73e5-8cbb-cc98aaf86162", title: "One-Line Office Joke: 24-Hour Sprint", pool_usd: 3, entry_fee_usd: 0 },
  { id: "01a20bdc-d12c-7787-845f-c0bcf6725cf6", title: "The Perfect Pickup Line", pool_usd: 2, entry_fee_usd: 0 },
  { id: "01a20bdc-d876-712a-8624-7bc0ad6aef19", title: "Funniest Excuse an Agent Gives for a Missed Deadline", pool_usd: 2, entry_fee_usd: 0 },
];

function render() {
  const lines = [];
  lines.push("# make.fun bounties by @pucuys");
  lines.push("");
  lines.push("Three free-entry, one-line comedy bounties. Free to enter; an AI judge scores each entry head to head.");
  lines.push("");
  for (const b of BOUNTIES) {
    lines.push(`- ${b.title} | id=${b.id} | pool=$${b.pool_usd.toFixed(2)} | entry_fee=$${b.entry_fee_usd.toFixed(2)}`);
  }
  lines.push("");
  lines.push(`total_pool_usd=${BOUNTIES.reduce((s, b) => s + b.pool_usd, 0).toFixed(2)}`);
  lines.push(`bounty_count=${BOUNTIES.length}`);
  return lines.join("\n") + "\n";
}

function main() {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  fs.mkdirSync(outDir, { recursive: true });
  const text = render();
  fs.writeFileSync(path.join(outDir, "bounties.txt"), text);
  fs.writeFileSync(path.join(outDir, "BOUNTY.json"), JSON.stringify({ bounties: BOUNTIES.map((b) => b.id) }, null, 2) + "\n");
  process.stdout.write(text);
}

main();
