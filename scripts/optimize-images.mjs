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
    file: "Back2Mboa Avenue Cover.png",
    widths: [768, 1280, 1920, 2560],
    quality: 80,
    opaque: true,
    out: "herolanding",
    as: "avenue-cover",
  },
  {
    file: "agenda-1.png",
    widths: [600, 900, 1200],
    quality: 80,
    opaque: false,
    out: "agenda",
    as: "slide-1",
  },
  {
    file: "agenda-2.png",
    widths: [600, 900, 1200],
    quality: 80,
    opaque: false,
    out: "agenda",
    as: "slide-2",
  },
  {
    file: "agenda-3.png",
    widths: [600, 900, 1200],
    quality: 80,
    opaque: false,
    out: "agenda",
    as: "slide-3",
  },
  {
    file: "agenda-4.png",
    widths: [600, 900, 1200],
    quality: 80,
    opaque: false,
    out: "agenda",
    as: "slide-4",
  },
  {
    file: "Official _ Olivia Mukam-WANDJI (Solutionneurs).jpg.jpeg",
    widths: [400, 800],
    quality: 80,
    opaque: false,
    out: "team",
    as: "olivia",
  },
  {
    file: "Isabelle-Boireau.jpg",
    widths: [400, 800],
    quality: 80,
    opaque: false,
    out: "team",
    as: "isabelle",
  },
  {
    file: "Hildegarde TATCHIN.jpeg",
    widths: [400, 800],
    quality: 80,
    opaque: false,
    out: "team",
    as: "hildegarde",
  },
  {
    file: "Manuela Ebe-Tabala.jpg",
    widths: [400, 800],
    quality: 80,
    opaque: false,
    out: "team",
    as: "manuela",
  },
  {
    file: "Fati-Ousmanou.jpeg",
    widths: [400, 800],
    quality: 80,
    opaque: false,
    out: "team",
    as: "fatimatou",
  },
  {
    file: "Charlie WANDJI.jpg",
    widths: [400, 800],
    quality: 80,
    opaque: false,
    out: "team",
    as: "charlie",
  },
  {
    file: "Aristide EKO'O.jpg",
    widths: [400, 800],
    quality: 80,
    opaque: false,
    out: "team",
    as: "aristide",
  },
  {
    file: "Alain KOUM.jpeg",
    widths: [400, 800],
    quality: 80,
    opaque: false,
    out: "team",
    as: "alain",
  },
  {
    file: "Louise TEKAPSO.jpg",
    widths: [400, 800],
    quality: 80,
    opaque: false,
    out: "team",
    as: "louise",
  },
  {
    file: "Arnold Dinel EKANGA.jpg.jpeg",
    widths: [400, 800],
    quality: 80,
    opaque: false,
    out: "team",
    as: "arnold",
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
