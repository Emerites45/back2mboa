import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public/images");
const QUALITY = 85;

async function collect(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...await collect(full));
    } else if (/\.(png|jpe?g)$/i.test(e.name)) {
      files.push(full);
    }
  }
  return files;
}

async function run() {
  const files = await collect(ROOT);
  let converted = 0;
  let skipped = 0;
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const out = file.replace(/\.(png|jpe?g)$/i, ".webp");

    try {
      const meta = await sharp(file).metadata();
      const { size } = await sharp(file)
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(out);

      const origSize = (await stat(file)).size;
      totalBefore += origSize;
      totalAfter += size;
      await unlink(file);
      converted++;
      console.log(`${rel.padEnd(60)} ${(origSize / 1024).toFixed(0).padStart(6)}K → ${(size / 1024).toFixed(0).padStart(6)}K`);
    } catch (err) {
      console.warn(`SKIP ${rel}: ${err.message}`);
      skipped++;
    }
  }

  const mb = (b) => (b / 1024 / 1024).toFixed(2);
  console.log(`\n${converted} convertis, ${skipped} ignorés`);
  console.log(`Avant ${mb(totalBefore)} Mo → Après ${mb(totalAfter)} Mo (${Math.round((1 - totalAfter / totalBefore) * 100)}% de moins)`);
}

await run();
