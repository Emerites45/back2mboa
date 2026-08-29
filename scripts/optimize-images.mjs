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
{
    file: "portail-back2mboa.jpg.jpeg",
    widths: [768, 992],
    quality: 82,
    opaque: true,
    out: "partenaires",
    as: "portail-back2mboa",
  },
  { file: "gate_orange.png", widths: [480, 640, 795], quality: 85, as: "gate_orange" },
  {
    file: "Back2Mboa_logo_transparent_footer_1.png",
    widths: [200],
    quality: 88,
    as: "back2mboa-logo-footer",
  },
  {
    file: "Back2Mboa_logo_transparent_footer_2.png",
    widths: [200, 280, 400, 768, 1200, 1920],
    quality: 88,
    as: "back2mboa-logo-footer-v2",
  },
  {
    file: "mount_2.png",
    widths: [768, 1200, 1920, 2560],
    quality: 85,
    as: "mount-2",
  },
  {
    file: "background_herolanding.png",
    widths: [768, 1280, 1920, 2560],
    quality: 80,
    opaque: true,
    out: "herolanding",
    as: "background_herolanding",
  },
];

const outName = (entry, width) => {
  const base = entry.as ?? path.basename(entry.file, path.extname(entry.file));
  return `${base}${width ? `-${width}` : ""}.webp`;
};

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

  for (const entry of PLAN) {
    const { file, widths, quality, opaque, out } = entry;
    const input = path.join(SRC, file);
    srcTotal += (await stat(input)).size;

    const outDir = out ? path.join(OUT, out) : OUT;
    await mkdir(outDir, { recursive: true });

    const meta = await sharp(input).metadata();
    const targets = (widths ?? [null]).filter((w) => w === null || w <= meta.width);
    for (const width of targets) {
      let pipeline = sharp(input);
      if (opaque) pipeline = pipeline.removeAlpha();
      if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true });

      const dest = path.join(outDir, outName(entry, width));
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
