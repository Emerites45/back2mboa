import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve("assets/images-src");
const OUT = path.resolve("public/images");

/**
 * `widths: null` = taille native conservée.
 * `opaque` = le canal alpha du source est inutile, on le retire.
 */
const PLAN = [
  { file: "sky.png", widths: [768, 1280, 1920, 2560], quality: 76, opaque: true },
  { file: "mount_1.png", widths: [768, 1280, 1920, 2560], quality: 80 },
  { file: "mount_2.png", widths: [768, 1280, 1920, 2560], quality: 80 },
  { file: "resultat_1.png", widths: [768, 1280, 1920], quality: 80, opaque: true },
  { file: "resultat_2.png", widths: null, quality: 80, opaque: true },
  
];

const outName = (file, width) =>
  `${path.basename(file, path.extname(file))}${width ? `-${width}` : ""}.webp`;

async function run() {
  await mkdir(OUT, { recursive: true });

  const sources = new Set((await readdir(SRC)).filter((f) => /\.(png|jpe?g)$/i.test(f)));
  const missing = PLAN.filter((entry) => !sources.has(entry.file)).map((e) => e.file);
  if (missing.length > 0) {
    throw new Error(`Sources absentes de assets/images-src: ${missing.join(", ")}`);
  }
  const orphans = [...sources].filter((f) => !PLAN.some((entry) => entry.file === f));
  if (orphans.length > 0) {
    console.warn(`Sources sans entrée dans PLAN, ignorées: ${orphans.join(", ")}`);
  }

  let srcTotal = 0;
  let outTotal = 0;

  for (const { file, widths, quality, opaque } of PLAN) {
    const input = path.join(SRC, file);
    srcTotal += (await stat(input)).size;

    const meta = await sharp(input).metadata();
    const targets = (widths ?? [null]).filter((w) => w === null || w <= meta.width);
    for (const width of targets) {
      let pipeline = sharp(input);
      if (opaque) pipeline = pipeline.removeAlpha();
      if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true });

      const dest = path.join(OUT, outName(file, width));
      const { size } = await pipeline.webp({ quality, effort: 6 }).toFile(dest);
      outTotal += size;
      console.log(`${path.basename(dest).padEnd(42)} ${(size / 1024).toFixed(0).padStart(6)} Ko`);
    }
  }

  const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2);
  console.log(
    `\nSources ${mb(srcTotal)} Mo → sorties ${mb(outTotal)} Mo (${Math.round((1 - outTotal / srcTotal) * 100)}% de moins)`,
  );
}

await run();
