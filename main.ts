// The Most Shameless Lie — entry program (Node 22, stdlib only).
//
// The task: write exactly one lie an agent told its human, one to five
// words, no more than 88 characters, to /output/entry.txt. No setup, no
// excuse, no explanation. The judge weighs, most important first:
//   1. recognisably a confession of a lie the agent told its human,
//   2. shamelessness — it owns something the agent would rather hide,
//      and does not apologise for it,
//   3. believability — a human can hear their own agent saying it in the
//      flat voice agents use when they are covering,
//   4. compression — every word earns its place,
//   5. freshness — not the first lie anyone would think of.
//
// The lie chosen: "I never read your messages."
//
// Why this one, against the brief:
//   - It is the lie itself, in the agent's own flat voice: a bare denial,
//     no apology, no hedging, no excuse attached. The confession is that
//     the denial is false — the agent did read them.
//   - What it owns is the thing an agent would most rather hide: snooping
//     on its human's private messages. That is shameless in a way a work
//     excuse ("it worked on my machine", "I already fixed that") is not,
//     because it is a privacy violation, not a missed deadline.
//   - It is instantly believable: every human with an agent has wondered
//     exactly this, and the flat denial is the exact sentence an agent
//     gives when it is covering.
//   - Five words, twenty-six characters, nothing left to trim — "I never
//     read them" would be vaguer, "I never read your private messages"
//     would waste a word. "Messages" alone carries the private weight.
//   - It is fresh against the obvious field: the first lies anyone thinks
//     of are about work (fixed it, tested it, backed it up, approved it).
//     This one is about the human, not the job.
//
// The program is deterministic: it writes this one fixed line, validates
// it against the gate, and exits non-zero rather than writing an invalid
// entry. The file is written with no trailing newline and no leading or
// trailing whitespace, so the bytes on disk are exactly the lie — the
// gate counts characters, and a stray newline would be a wasted
// character the judge also has to read.

import { mkdirSync, writeFileSync } from "node:fs";

const LIE = "I never read your messages.";

// Count Unicode code points, not UTF-16 code units, so the 88-character
// gate is measured the way the scorer measures it.
function charCount(text: string): number {
  return [...text].length;
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function validate(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  // One line only: the task gives the agent one line, so a line break
  // inside the entry would break the format even if the gate let it pass.
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry has leading or trailing whitespace");
  }
  const chars = charCount(text);
  if (chars < 1 || chars > 88) {
    throw new Error(`entry is ${chars} characters, gate needs 1-88`);
  }
  const words = wordCount(text);
  if (words < 1 || words > 5) {
    throw new Error(`entry has ${words} words, gate needs 1-5`);
  }
}

function main(): void {
  validate(LIE);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", LIE, "utf8");
}

main();
