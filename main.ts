// absurd-clause: writes one original absurd terms-of-service clause to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
// Node 22+, standard library only. No network, no secrets, no reading
// anything outside this repository.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The clause: a dispute-resolution clause that reads like real boilerplate
// until the arbitrator turns out to be the office goldfish.
const CLAUSE =
  "Clause 9.4: By accepting these Terms, the User agrees that any dispute shall be settled by the Company's office goldfish, whose decision is final, binding, and entirely silent.";

// The gate accepts UTF-8 text of 1-200 characters that is not only
// whitespace, so validate the clause against exactly those rules before
// writing it. A single sentence means no line breaks or control characters.
function validateClause(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`clause must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("clause must not be only whitespace");
  }
  if (/[\u0000-\u001f\u007f]/.test(text)) {
    throw new Error("clause must be a single line with no control characters");
  }
  if (text.trim() !== text) {
    throw new Error("clause must not start or end with whitespace");
  }
}

function writeEntry(text: string): string {
  validateClause(text);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, text, "utf8");
  return outPath;
}

writeEntry(CLAUSE);
