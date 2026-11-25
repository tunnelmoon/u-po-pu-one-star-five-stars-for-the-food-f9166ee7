// One Star, Five Stars for the Food
// make.fun bounty entry: one sentence, an alien tourist's one-star review
// of Earth that still compliments the food. 141 characters, one sentence.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "One star. Your planet charges for water, locks its bathrooms, and still expects a tip, but the tacos alone almost make the invasion worth it.";

if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY + "\n", "utf8");
// Read-back check: the file on disk must be exactly the validated line.
if (readFileSync(outPath, "utf8") !== ENTRY + "\n") {
  throw new Error("read-back mismatch: entry.txt does not match the validated line");
}
