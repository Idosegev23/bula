#!/usr/bin/env node
/**
 * upload-gallery.mjs
 *
 * סורק את `public/gallery/`, מבצע אופטימיזציה (sharp → WebP 1400px),
 * מעלה ל-Vercel Blob (פעם אחת לכל קובץ — מטמון לפי hash),
 * ומייצר את `src/data/projectsGallery.ts` עם ה-URLs המלאים.
 *
 * דרישות:
 *   - `BLOB_READ_WRITE_TOKEN` ב-.env.local (מ-Vercel dashboard → Storage → Blob)
 *
 * Run: npm run gallery:upload
 *
 * הקונבנציה זהה לסקריפט הלוקאלי build-gallery-data.mjs:
 *   public/gallery/<parent>/<sub>/<project-name--location>/01.jpg
 */

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { put } from '@vercel/blob';
import sharp from 'sharp';
import { config as dotenvConfig } from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');
const GALLERY_ROOT = join(PROJECT_ROOT, 'public/gallery');

// Load .env.local first (Vercel CLI default), then fall back to .env
dotenvConfig({ path: join(PROJECT_ROOT, '.env.local') });
dotenvConfig({ path: join(PROJECT_ROOT, '.env') });
const OUT_FILE = join(PROJECT_ROOT, 'src/data/projectsGallery.ts');
const LABELS_FILE = join(__dirname, 'gallery-labels.json');
const CACHE_FILE = join(__dirname, 'gallery-blob-cache.json');

const SOURCE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const PARENT_IDS = ['businesses', 'architecture', 'carpentry'];
const TARGET_WIDTH = 1400;
const WEBP_QUALITY = 82;

// ---- Sanity ----
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('\x1b[31m✗ Missing BLOB_READ_WRITE_TOKEN in environment.\x1b[0m');
  console.error('  Set it via: Vercel Dashboard → your project → Storage → Blob → .env.local');
  console.error('  Then add it to .env.local in this repo.');
  process.exit(1);
}

// ---- Helpers ----
const labels = JSON.parse(readFileSync(LABELS_FILE, 'utf8'));
const labelParents = labels.parents ?? {};
const labelSubs = labels.subs ?? {};

const cache = existsSync(CACHE_FILE) ? JSON.parse(readFileSync(CACHE_FILE, 'utf8')) : {};
let cacheDirty = false;

function listDirs(path) {
  if (!existsSync(path)) return [];
  return readdirSync(path)
    .filter((name) => {
      if (name.startsWith('.') || name === 'README.md') return false;
      try {
        return statSync(join(path, name)).isDirectory();
      } catch {
        return false;
      }
    })
    .sort();
}

function listSourceImages(path) {
  if (!existsSync(path)) return [];
  return readdirSync(path)
    .filter((name) => {
      if (name.startsWith('.')) return false;
      try {
        if (!statSync(join(path, name)).isFile()) return false;
      } catch {
        return false;
      }
      const ext = name.slice(name.lastIndexOf('.')).toLowerCase();
      return SOURCE_EXTS.has(ext);
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

function hashBuffer(buf) {
  return createHash('sha1').update(buf).digest('hex');
}

async function optimizeImage(srcPath) {
  // אם המקור כבר WebP בגודל המתאים — לא נעבוד שוב
  const buf = readFileSync(srcPath);
  const meta = await sharp(buf).metadata();
  if (meta.format === 'webp' && (meta.width ?? 0) <= TARGET_WIDTH * 1.1) {
    return buf; // כבר WebP, בקטן מ-1540px → השאר כפי שהוא
  }
  return sharp(buf)
    .rotate() // EXIF rotation
    .resize({ width: TARGET_WIDTH, withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer();
}

function persistCache() {
  if (!cacheDirty) return;
  mkdirSync(dirname(CACHE_FILE), { recursive: true });
  writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  cacheDirty = false;
}

async function uploadIfNew(localKey, srcPath, blobPath) {
  const cached = cache[localKey];
  const optimized = await optimizeImage(srcPath);
  const hash = hashBuffer(optimized);

  if (cached && cached.hash === hash && cached.url) {
    return { url: cached.url, fromCache: true, size: optimized.length };
  }

  const result = await put(blobPath, optimized, {
    access: 'public',
    contentType: 'image/webp',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  cache[localKey] = { hash, url: result.url, uploadedAt: new Date().toISOString() };
  cacheDirty = true;
  // נמלא את ה-cache אחרי כל העלאה כדי שלא נאבד התקדמות אם הסקריפט נופל
  persistCache();
  return { url: result.url, fromCache: false, size: optimized.length };
}

// ---- Pretty TS literal ----
function formatLiteral(value, indent = 0) {
  const pad = '  '.repeat(indent);
  const padInner = '  '.repeat(indent + 1);
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    return '[\n' + value.map((v) => padInner + formatLiteral(v, indent + 1)).join(',\n') + '\n' + pad + ']';
  }
  if (value && typeof value === 'object') {
    const keys = Object.keys(value);
    if (keys.length === 0) return '{}';
    return '{\n' + keys.map((k) => `${padInner}${k}: ${formatLiteral(value[k], indent + 1)}`).join(',\n') + '\n' + pad + '}';
  }
  if (typeof value === 'string') return JSON.stringify(value);
  return String(value);
}

// ---- Main scan + upload ----
console.log('\x1b[36m%s\x1b[0m', '▸ Scanning public/gallery/ and uploading to Vercel Blob...');
console.log('');

if (!existsSync(GALLERY_ROOT)) {
  console.error('\x1b[31m✗ public/gallery/ does not exist.\x1b[0m');
  process.exit(1);
}

const warnings = [];
const parents = [];
let uploadedCount = 0;
let cachedCount = 0;
let totalBytes = 0;

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
      warnings.push(`no Hebrew label for sub "${subId}" — add to scripts/gallery-labels.json`);
    }
    const subPath = join(parentPath, subDir);
    const businesses = [];

    for (const projectDir of listDirs(subPath)) {
      const { name, location } = parseProjectFolder(projectDir);
      const projectPath = join(subPath, projectDir);
      const sourceImages = listSourceImages(projectPath);

      if (sourceImages.length === 0) {
        warnings.push(`no images in ${parentId}/${subDir}/${projectDir}/ — skipping`);
        continue;
      }

      const projectSlug = slugify(name) || `p${businesses.length + 1}`;
      const uploadedUrls = [];

      for (let i = 0; i < sourceImages.length; i++) {
        const filename = sourceImages[i];
        const localKey = `${parentId}/${subDir}/${projectDir}/${filename}`;
        const blobPath = `gallery/${parentId}/${subId}/${projectSlug}/${String(i + 1).padStart(2, '0')}.webp`;
        const srcPath = join(projectPath, filename);

        process.stdout.write(`  ${blobPath} ... `);
        try {
          const { url, fromCache, size } = await uploadIfNew(localKey, srcPath, blobPath);
          uploadedUrls.push(url);
          totalBytes += size;
          if (fromCache) {
            cachedCount++;
            process.stdout.write('\x1b[2mcached\x1b[0m\n');
          } else {
            uploadedCount++;
            process.stdout.write(`\x1b[32muploaded\x1b[0m (${Math.round(size / 1024)}KB)\n`);
          }
        } catch (err) {
          // אל תפיל את הריצה — קבצים פגומים (JPEG חסר/sharp נופל) יידלגו
          process.stdout.write(`\x1b[31mskipped\x1b[0m (${err.message.slice(0, 80)})\n`);
          warnings.push(`skipped ${blobPath} — ${err.message.slice(0, 120)}`);
        }
      }

      businesses.push({
        id: `${parentId}-${subId}-${projectSlug}`,
        name,
        ...(location ? { location } : {}),
        images: uploadedUrls,
      });
    }

    if (businesses.length === 0) {
      warnings.push(`empty sub-category: ${parentId}/${subDir}/`);
      continue;
    }
    subs.push({ id: subId, label: subLabel ?? subDir, businesses });
  }

  if (subs.length === 0) continue;
  parents.push({ id: parentId, label: parentLabel, subCategories: subs });
}

// ---- Persist cache ----
persistCache();

if (parents.length === 0) {
  console.log('\n\x1b[33m⚠ No projects found. Existing data file left untouched.\x1b[0m');
  if (warnings.length) {
    console.log('\n  Warnings:');
    warnings.forEach((w) => console.log('   • ' + w));
  }
  process.exit(0);
}

// ---- Write TS ----
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
// AUTO-GENERATED by scripts/upload-gallery.mjs — DO NOT EDIT BY HAND.
//
// Source: public/gallery/<parent>/<sub>/<project>/*.{jpg,png,webp,avif}
// Storage: Vercel Blob (public)
// Labels: scripts/gallery-labels.json
// Run:    npm run gallery:upload
//
// Generated: ${new Date().toISOString()}
// Stats: ${parents.length} parents · ${parents.reduce((n, p) => n + p.subCategories.length, 0)} subs · ${totalProjects} projects · ${totalImages} images
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

const output = `${banner}${types}
export const projectsGalleryData: GalleryParentCategory[] = ${formatLiteral(parents, 0)};
`;

writeFileSync(OUT_FILE, output, 'utf8');

console.log('');
console.log('\x1b[32m%s\x1b[0m', '✓ Done');
console.log(`  → ${OUT_FILE}`);
console.log(
  `  ${parents.length} parents · ${parents.reduce((n, p) => n + p.subCategories.length, 0)} subs · ${totalProjects} projects · ${totalImages} images`
);
console.log(
  `  ${uploadedCount} new uploads · ${cachedCount} cached · ${(totalBytes / 1024 / 1024).toFixed(2)} MB total`
);

if (warnings.length) {
  console.log('\n\x1b[33m⚠ Warnings:\x1b[0m');
  warnings.forEach((w) => console.log('   • ' + w));
}
