#!/usr/bin/env node
/**
 * build-gallery-data.mjs
 *
 * סורק את `public/gallery/<parent>/<sub>/<project>/*.{jpg,jpeg,png,webp,avif}`
 * ומייצר את `src/data/projectsGallery.ts` עם המבנה המלא.
 *
 * Run:  npm run gallery:build
 *
 * קונבנציית תיקיות:
 *   public/gallery/businesses/bakeries/מאפיית-לחם-הארץ--תל-אביב/01.webp
 *                  ──────────  ────── ────────────────────────  ─────
 *                  parent       sub    project (name--location)  image
 *
 *   - parent חייב להיות אחד מ: businesses / architecture / carpentry
 *   - sub: kebab-case אנגלי (תרגום עברי מגיע מ-scripts/gallery-labels.json)
 *   - project: שם-עברי או שם-עברי--מיקום (פיצול ב-"--")
 *   - image: כל קובץ jpg/jpeg/png/webp/avif. הראשון אלפבטית = תמונת קאבר.
 */

import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');
const GALLERY_ROOT = join(PROJECT_ROOT, 'public/gallery');
const OUT_FILE = join(PROJECT_ROOT, 'src/data/projectsGallery.ts');
const LABELS_FILE = join(__dirname, 'gallery-labels.json');

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const PARENT_IDS = ['businesses', 'architecture', 'carpentry'];

// ---- Helpers ----
function listDirs(path) {
  if (!existsSync(path)) return [];
  return readdirSync(path)
    .filter((name) => {
      if (name.startsWith('.') || name === 'README.md') return false;
      const full = join(path, name);
      try {
        return statSync(full).isDirectory();
      } catch {
        return false;
      }
    })
    .sort();
}

function listImages(path) {
  if (!existsSync(path)) return [];
  return readdirSync(path)
    .filter((name) => {
      if (name.startsWith('.')) return false;
      const full = join(path, name);
      let isFile = false;
      try {
        isFile = statSync(full).isFile();
      } catch {
        return false;
      }
      if (!isFile) return false;
      const ext = name.slice(name.lastIndexOf('.')).toLowerCase();
      return IMAGE_EXTS.has(ext);
    })
    .sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    );
}

function slugify(s) {
  return String(s)
    .normalize('NFKD')
    .replace(/[^\w֐-׿-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function parseProjectFolder(name) {
  const [rawName, rawLocation] = name.split('--');
  return {
    name: (rawName ?? name).replace(/[-_]+/g, ' ').trim(),
    location: rawLocation ? rawLocation.replace(/[-_]+/g, ' ').trim() : undefined,
  };
}

// ---- Read labels ----
const labels = JSON.parse(readFileSync(LABELS_FILE, 'utf8'));
const labelParents = labels.parents ?? {};
const labelSubs = labels.subs ?? {};

// ---- Scan ----
const warnings = [];
const errors = [];
const parents = [];

if (!existsSync(GALLERY_ROOT)) {
  errors.push(`Gallery folder not found: ${GALLERY_ROOT}`);
} else {
  for (const parentId of PARENT_IDS) {
    const parentPath = join(GALLERY_ROOT, parentId);
    if (!existsSync(parentPath)) {
      warnings.push(`missing parent folder: ${parentId}/`);
      continue;
    }
    const parentLabel = labelParents[parentId] ?? parentId;

    const subs = [];
    for (const subDir of listDirs(parentPath)) {
      const subId = slugify(subDir);
      const subLabel = labelSubs[subId];
      if (!subLabel) {
        warnings.push(
          `no Hebrew label for sub-category "${subId}" — add it to scripts/gallery-labels.json`
        );
      }

      const subPath = join(parentPath, subDir);
      const businesses = [];

      for (const projectDir of listDirs(subPath)) {
        const { name, location } = parseProjectFolder(projectDir);
        const projectPath = join(subPath, projectDir);
        const imageFiles = listImages(projectPath);

        if (imageFiles.length === 0) {
          warnings.push(
            `no images in ${parentId}/${subDir}/${projectDir}/ — skipping`
          );
          continue;
        }

        const encodedProject = encodeURIComponent(projectDir);
        const encodedSub = encodeURIComponent(subDir);
        const images = imageFiles.map(
          (img) => `/gallery/${parentId}/${encodedSub}/${encodedProject}/${encodeURIComponent(img)}`
        );

        businesses.push({
          id: `${parentId}-${subId}-${slugify(name) || `p${businesses.length + 1}`}`,
          name,
          ...(location ? { location } : {}),
          images,
        });
      }

      if (businesses.length === 0) {
        warnings.push(`empty sub-category: ${parentId}/${subDir}/`);
        continue;
      }

      subs.push({
        id: subId,
        label: subLabel ?? subDir,
        businesses,
      });
    }

    if (subs.length === 0) continue;

    parents.push({
      id: parentId,
      label: parentLabel,
      subCategories: subs,
    });
  }
}

// ---- Safety: don't overwrite with empty data ----
if (parents.length === 0) {
  console.log('\x1b[33m%s\x1b[0m', '⚠ No projects found.');
  console.log('  Scanned: ' + GALLERY_ROOT);
  console.log('  Expected: public/gallery/<parent>/<sub>/<project>/image.webp');
  if (warnings.length) {
    console.log('\n  Warnings:');
    warnings.forEach((w) => console.log('   • ' + w));
  }
  console.log('\n  Existing src/data/projectsGallery.ts left untouched.\n');
  process.exit(0);
}

// ---- Write TS file ----
const totalProjects = parents.reduce(
  (n, p) => n + p.subCategories.reduce((m, s) => m + s.businesses.length, 0),
  0
);
const totalImages = parents.reduce(
  (n, p) =>
    n +
    p.subCategories.reduce(
      (m, s) => m + s.businesses.reduce((k, b) => k + b.images.length, 0),
      0
    ),
  0
);

const banner = `// =====================================================================
// AUTO-GENERATED by scripts/build-gallery-data.mjs — DO NOT EDIT BY HAND.
//
// Source: public/gallery/<parent>/<sub>/<project>/*.{webp,jpg,png,avif}
// Labels: scripts/gallery-labels.json
// Run:    npm run gallery:build
//
// Generated: ${new Date().toISOString()}
// Stats:     ${parents.length} parents · ${parents.reduce((n, p) => n + p.subCategories.length, 0)} sub-categories · ${totalProjects} projects · ${totalImages} images
// =====================================================================
`;

const types = `
export type ParentCategoryId = 'businesses' | 'architecture' | 'carpentry';

export interface GalleryBusiness {
  id: string;
  name: string;
  location?: string;
  images: string[];
}

export interface GallerySubCategory {
  id: string;
  label: string;
  businesses: GalleryBusiness[];
}

export interface GalleryParentCategory {
  id: ParentCategoryId;
  label: string;
  subCategories: GallerySubCategory[];
}
`;

// Pretty-format object as TS literal with deterministic order
function formatLiteral(value, indent = 0) {
  const pad = '  '.repeat(indent);
  const padInner = '  '.repeat(indent + 1);

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value.map((v) => padInner + formatLiteral(v, indent + 1));
    return '[\n' + items.join(',\n') + '\n' + pad + ']';
  }

  if (value && typeof value === 'object') {
    const keys = Object.keys(value);
    if (keys.length === 0) return '{}';
    const lines = keys.map((k) => `${padInner}${k}: ${formatLiteral(value[k], indent + 1)}`);
    return '{\n' + lines.join(',\n') + '\n' + pad + '}';
  }

  if (typeof value === 'string') {
    return JSON.stringify(value);
  }

  return String(value);
}

const literal = formatLiteral(parents, 0);
const output = `${banner}${types}
export const projectsGalleryData: GalleryParentCategory[] = ${literal};
`;

writeFileSync(OUT_FILE, output, 'utf8');

console.log('\x1b[32m%s\x1b[0m', '✓ Gallery data generated');
console.log(`  → ${OUT_FILE}`);
console.log(
  `  ${parents.length} parents · ${parents.reduce((n, p) => n + p.subCategories.length, 0)} subs · ${totalProjects} projects · ${totalImages} images`
);

if (warnings.length) {
  console.log('\n\x1b[33m%s\x1b[0m', '⚠ Warnings:');
  warnings.forEach((w) => console.log('   • ' + w));
}
if (errors.length) {
  console.log('\n\x1b[31m%s\x1b[0m', '✗ Errors:');
  errors.forEach((e) => console.log('   • ' + e));
  process.exit(1);
}
