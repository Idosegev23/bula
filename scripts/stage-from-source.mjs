#!/usr/bin/env node
/**
 * stage-from-source.mjs
 *
 * Stages files from a source tree (e.g. /tmp/bulla-merged) into
 * public/gallery/<parent>/<sub>/<project>/ using a Hebrew→English mapping.
 *
 * Run: node scripts/stage-from-source.mjs <source-root>
 *      e.g. node scripts/stage-from-source.mjs /tmp/bulla-merged
 *
 * Source layout (Hebrew, from Drive export):
 *   <root>/עיצוב וביצוע שלנו/<sub-he>/<project>/*.jpg   → businesses/<sub-en>/<project>/
 *   <root>/בולה X מעצבים/<sub-he>/<project>/*.jpg       → architecture/<sub-en>/<project>/
 *   <root>/tradu/<project>/*.jpg                         → businesses/corporate/<project>/
 *   <root>/נגרות/באבו/*.jpg                              → carpentry/commercial/באבו/
 *   <root>/נגרות/פרטי/*.jpg                              → carpentry/residential/פרויקטים פרטיים/
 *   <root>/מיתוג/                                         → SKIPPED
 *
 * Image files only (jpg/jpeg/png/webp/avif). Non-images are skipped.
 */

import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');
const GALLERY_ROOT = join(PROJECT_ROOT, 'public/gallery');
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

const SRC = process.argv[2];
if (!SRC) {
  console.error('Usage: node scripts/stage-from-source.mjs <source-root>');
  process.exit(1);
}
if (!existsSync(SRC)) {
  console.error(`Source not found: ${SRC}`);
  process.exit(1);
}

// Hebrew sub-name → English sub-ID
const SUB_MAP = {
  'בתי קפה ומאפיות': 'cafes-bakeries',
  'מסעדות': 'restaurants',
  'גלידריות': 'ice-cream',
  'מספרות': 'barbershops',
  'חדרי כושר': 'gyms',
  'חנויות ושווקים': 'shops-markets',
  'הייטק ומשרדים': 'hitech-offices',
  'משרדים ורשויות': 'offices-authorities',
  'חללים מסחריים': 'commercial-spaces',
  'בתים פרטיים': 'private-homes',
  'אחר': 'other',
};

// Drive parent folder → site parent
const PARENT_MAP = {
  'עיצוב וביצוע שלנו': 'businesses',
  'בולה X מעצבים': 'architecture',
};

function isImage(name) {
  const ext = name.slice(name.lastIndexOf('.')).toLowerCase();
  return IMAGE_EXTS.has(ext);
}

function listDirs(path) {
  if (!existsSync(path)) return [];
  return readdirSync(path).filter((n) => {
    if (n.startsWith('.')) return false;
    try {
      return statSync(join(path, n)).isDirectory();
    } catch {
      return false;
    }
  });
}

function listImages(path) {
  if (!existsSync(path)) return [];
  return readdirSync(path)
    .filter((n) => !n.startsWith('.') && isImage(n))
    .filter((n) => {
      try {
        return statSync(join(path, n)).isFile();
      } catch {
        return false;
      }
    })
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
}

function ensureDir(p) {
  mkdirSync(p, { recursive: true });
}

function copyProject(srcDir, dstDir) {
  const images = listImages(srcDir);
  if (images.length === 0) return 0;
  ensureDir(dstDir);
  for (const img of images) {
    copyFileSync(join(srcDir, img), join(dstDir, img));
  }
  return images.length;
}

// Some projects nest one more level for multi-location work:
//   <sub>/<project>/<location>/*.jpg
// Returns array of [variantName, srcDir] pairs. If no nested locations,
// returns [[<project>, <projectDir>]]. If nested, returns one entry per
// location with a combined name.
function expandProjectVariants(projectName, projectDir) {
  const direct = listImages(projectDir).length;
  if (direct > 0) {
    return [[projectName, projectDir]];
  }
  const inner = listDirs(projectDir);
  const variants = [];
  for (const loc of inner) {
    const locDir = join(projectDir, loc);
    if (listImages(locDir).length === 0) continue;
    // If location name already contains project name, use as-is.
    // Otherwise prefix with project.
    const name = loc.includes(projectName) ? loc : `${projectName} - ${loc}`;
    variants.push([name, locDir]);
  }
  return variants;
}

// --- Wipe & recreate parent folders, keep README.md if exists at root ---
console.log('▸ Cleaning public/gallery/<parent>/ directories…');
for (const p of ['businesses', 'architecture', 'carpentry']) {
  const target = join(GALLERY_ROOT, p);
  if (existsSync(target)) rmSync(target, { recursive: true, force: true });
  ensureDir(target);
}

let totalProjects = 0;
let totalImages = 0;
const warnings = [];

// --- עיצוב וביצוע שלנו + בולה X מעצבים (3-level) ---
for (const [heParent, enParent] of Object.entries(PARENT_MAP)) {
  const parentPath = join(SRC, heParent);
  if (!existsSync(parentPath)) {
    warnings.push(`missing source parent: ${heParent}`);
    continue;
  }
  for (const heSub of listDirs(parentPath)) {
    const enSub = SUB_MAP[heSub];
    if (!enSub) {
      warnings.push(`no mapping for sub "${heSub}" under ${heParent}/ — skipped`);
      continue;
    }
    const subPath = join(parentPath, heSub);
    for (const project of listDirs(subPath)) {
      const variants = expandProjectVariants(project, join(subPath, project));
      if (variants.length === 0) {
        warnings.push(`no images: ${heParent}/${heSub}/${project}`);
        continue;
      }
      for (const [name, srcDir] of variants) {
        const dstProject = join(GALLERY_ROOT, enParent, enSub, name);
        const n = copyProject(srcDir, dstProject);
        if (n > 0) {
          totalProjects++;
          totalImages += n;
          console.log(`  ✓ ${enParent}/${enSub}/${name}  (${n} imgs)`);
        }
      }
    }
  }
}

// --- tradu → businesses/corporate/<project> ---
{
  const tradu = join(SRC, 'tradu');
  if (existsSync(tradu)) {
    for (const project of listDirs(tradu)) {
      const dstProject = join(GALLERY_ROOT, 'businesses', 'corporate', project);
      const n = copyProject(join(tradu, project), dstProject);
      if (n === 0) {
        warnings.push(`no images: tradu/${project}`);
      } else {
        totalProjects++;
        totalImages += n;
        console.log(`  ✓ businesses/corporate/${project}  (${n} imgs)`);
      }
    }
  } else {
    warnings.push('missing source parent: tradu');
  }
}

// --- נגרות → carpentry ---
{
  const carp = join(SRC, 'נגרות');
  if (existsSync(carp)) {
    // באבו → carpentry/commercial/באבו
    if (existsSync(join(carp, 'באבו'))) {
      const n = copyProject(join(carp, 'באבו'), join(GALLERY_ROOT, 'carpentry', 'commercial', 'באבו'));
      if (n > 0) {
        totalProjects++;
        totalImages += n;
        console.log(`  ✓ carpentry/commercial/באבו  (${n} imgs)`);
      }
    }
    // פרטי → carpentry/residential/פרויקטים פרטיים (consolidated)
    if (existsSync(join(carp, 'פרטי'))) {
      const n = copyProject(
        join(carp, 'פרטי'),
        join(GALLERY_ROOT, 'carpentry', 'residential', 'פרויקטים פרטיים')
      );
      if (n > 0) {
        totalProjects++;
        totalImages += n;
        console.log(`  ✓ carpentry/residential/פרויקטים פרטיים  (${n} imgs)`);
      }
    }
  } else {
    warnings.push('missing source parent: נגרות');
  }
}

console.log('');
console.log(`✓ Done · ${totalProjects} projects · ${totalImages} images staged`);
if (warnings.length) {
  console.log('\n⚠ Warnings:');
  for (const w of warnings) console.log('  • ' + w);
}
