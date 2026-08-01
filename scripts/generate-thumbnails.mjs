/**
 * Renders the first page of every presentation PDF to a WebP thumbnail.
 * Run after adding a PDF: npm run thumbnails
 * Run after REPLACING a PDF (same filename, new content): npm run thumbnails -- --force
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { basename, extname, join } from "node:path";

const SOURCE = "public/presentations";
const TARGET = join(SOURCE, "thumbs");
const WIDTH = 400;
const FORCE = process.argv.includes("--force");

mkdirSync(TARGET, { recursive: true });

const pdfs = readdirSync(SOURCE).filter((name) => extname(name).toLowerCase() === ".pdf");

let created = 0;
for (const pdf of pdfs) {
  const stem = basename(pdf, extname(pdf));
  const webp = join(TARGET, `${stem}.webp`);
  if (existsSync(webp) && !FORCE) continue;

  // pdftoppm appends "-1" for the page number, so render to a temp stem first.
  const tempStem = join(TARGET, `${stem}.tmp`);
  try {
    execFileSync("pdftoppm", [
      "-png",
      "-r",
      "96",
      "-f",
      "1",
      "-l",
      "1",
      "-scale-to-x",
      String(WIDTH),
      "-scale-to-y",
      "-1",
      join(SOURCE, pdf),
      tempStem,
    ]);

    const rendered = readdirSync(TARGET).find((name) => name.startsWith(`${stem}.tmp`));
    if (!rendered) {
      throw new Error(`pdftoppm produced no output for ${pdf}`);
    }

    execFileSync("cwebp", ["-q", "82", join(TARGET, rendered), "-o", webp]);
  } finally {
    // Clean up the intermediate PNG even if pdftoppm produced no output or
    // cwebp throws, so a failed run doesn't leave a stray *.tmp-1.png behind
    // in a directory that is otherwise only ever committed .webp files.
    const leftover = readdirSync(TARGET).find((name) => name.startsWith(`${stem}.tmp`));
    if (leftover) rmSync(join(TARGET, leftover));
  }
  created += 1;
}

console.log(`${created} thumbnail(s) created, ${pdfs.length} PDF(s) total.`);
