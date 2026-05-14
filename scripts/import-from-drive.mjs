#!/usr/bin/env node
/**
 * import-from-drive.mjs
 *
 * ממזג את 4 חלקי ההורדה של גוגל-דרייב (`~/Downloads/צילומי פרויקטים לאתר[ 2..4]`)
 * למבנה `public/gallery/<parent-en>/<sub-en>/<project>/NN.<ext>`.
 *
 * - מקור Hebrew → סלאג אנגלי לפי SUB_MAP / PARENT_MAP בקובץ הזה.
 * - מדלג על שאינו תמונה (טקסט, PDF, וכו').
 * - אם אותו פרויקט מופיע ב-2+ חלקים → ממזג ומסיר כפילויות ע"פ SHA1.
 * - מיון תמונות בפרויקט: לפי שם הקובץ (numeric-aware), ואז ממספר 01..NN.
 *
 * Run: node scripts/import-from-drive.mjs  (ואז:  npm run gallery:upload)
 */

import { createHash } from 'node:crypto';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  rmSync,
} from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const PROJECT_ROOT = resolve(__filename, '..', '..');
const DOWNLOADS = '/Users/idosegev/Downloads';
const SOURCE_DIRS = [
  'צילומי פרויקטים לאתר',
  'צילומי פרויקטים לאתר 2',
  'צילומי פרויקטים לאתר 3',
  'צילומי פרויקטים לאתר 4',
];
const GALLERY_OUT = join(PROJECT_ROOT, 'public/gallery');
const IMG_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.heic']);

// ---- מיפויי מקור → יעד ----

// Drive parent (Hebrew) → bucket באתר
const PARENT_MAP = {
  'עיצוב וביצוע שלנו': 'businesses',
  'tradu': 'businesses',           // ללא sub במקור → 'corporate'
  'בולה X מעצבים': 'architecture',
  'נגרות': 'carpentry',
  // 'מיתוג' מדולג (ריק)
};

// Drive sub (Hebrew) → sub slug (אנגלית, kebab-case)
const SUB_MAP = {
  'אחר': 'other',
  'בתי קפה ומאפיות': 'cafes-bakeries',
  'גלידריות': 'ice-cream',
  'הייטק ומשרדים': 'hitech-offices',
  'חדרי כושר': 'gyms',
  'חללים מסחריים': 'commercial-spaces',
  'חנויות ושווקים': 'shops-markets',
  'מסעדות': 'restaurants',
  'מספרות': 'barbershops',
  'בתים פרטיים': 'private-homes',
  'משרדים ורשויות': 'offices-authorities',
};

// מקרים מיוחדים — parent ללא sub במקור
function resolveBucketAndSub(parentHe, subHe) {
  const bucket = PARENT_MAP[parentHe];
  if (!bucket) return null;

  // tradu: ללא sub במקור → ניצור 'corporate'
  if (parentHe === 'tradu') {
    return { bucket: 'businesses', sub: 'corporate' };
  }

  // נגרות: יש sub במקור (באבו / פרטי), נמפה ידנית
  if (parentHe === 'נגרות') {
    if (subHe === 'באבו') return { bucket: 'carpentry', sub: 'commercial' };
    if (subHe === 'פרטי') return { bucket: 'carpentry', sub: 'residential' };
    return null;
  }

  // הרגיל: subHe → slug
  const sub = SUB_MAP[subHe];
  if (!sub) return { bucket, sub: null, error: `unknown sub "${subHe}"` };
  return { bucket, sub };
}

// ---- עזר ----

function listDirs(path) {
  if (!existsSync(path)) return [];
  return readdirSync(path)
    .filter((n) => !n.startsWith('.') && !n.startsWith('_'))
    .filter((n) => {
      try { return statSync(join(path, n)).isDirectory(); } catch { return false; }
    });
}

function listFiles(path) {
  if (!existsSync(path)) return [];
  return readdirSync(path).filter((n) => {
    if (n.startsWith('.')) return false;
    try { return statSync(join(path, n)).isFile(); } catch { return false; }
  });
}

function isImage(name) {
  return IMG_EXTS.has(extname(name).toLowerCase());
}

function sha1(p) {
  return createHash('sha1').update(readFileSync(p)).digest('hex');
}

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

// "Photo 31-07-2024, 9 00 28.jpg" וכד' — מנקה תווים בעייתיים בשם פרויקט
function cleanProjectName(name) {
  return name.replace(/_/g, "'").trim(); // ג_מס → ג'מס
}

// קיבוץ שמות לפרויקט מקונן (brand → branch). אם ה-branch כבר מכיל את שם ה-brand → השאר כמו ה-branch.
function combineProjectName(brand, branch) {
  const cleanBrand = cleanProjectName(brand);
  const cleanBranch = cleanProjectName(branch);
  if (cleanBranch.includes(cleanBrand)) return cleanBranch;
  return `${cleanBrand} - ${cleanBranch}`;
}

// אוסף תמונות לפרויקט מסוים — תומך גם בפרויקטים שיש להם רק קבצים, וגם בפרויקטים שיש להם תיקיות-משנה (סניפים).
// מחזיר Array<{ projectName, files: string[] }>
function collectProjects(projPath, brandName) {
  const direct = listFiles(projPath).filter(isImage);
  const subdirs = listDirs(projPath);

  // אם יש תמונות ישירות וגם תיקיות → נכניס את הישירות כפרויקט "ראשי" ואת התיקיות כסניפים
  // אם יש רק תמונות → פרויקט אחד
  // אם יש רק תיקיות → כל אחת היא פרויקט עם שם משולב
  const results = [];

  if (direct.length > 0) {
    results.push({
      projectName: cleanProjectName(brandName),
      files: direct.map((f) => join(projPath, f)),
    });
  }

  for (const sub of subdirs) {
    const subPath = join(projPath, sub);
    const subFiles = listFiles(subPath).filter(isImage).map((f) => join(subPath, f));
    if (subFiles.length === 0) continue;
    results.push({
      projectName: combineProjectName(brandName, sub),
      files: subFiles,
    });
  }

  return results;
}

// ---- main ----

console.log('▸ Importing Drive dumps → public/gallery/');
console.log('');

if (!existsSync(GALLERY_OUT)) mkdirSync(GALLERY_OUT, { recursive: true });

// נאסוף לכל יעד-פרויקט את כל הקבצים מכל החלקים
const collected = new Map(); // key = `${bucket}/${sub}/${projectClean}` → { destDir, files: Map<sha1, srcPath> }
const warnings = [];

for (const srcDir of SOURCE_DIRS) {
  const root = join(DOWNLOADS, srcDir);
  if (!existsSync(root)) {
    warnings.push(`missing source: ${srcDir}`);
    continue;
  }

  for (const parentHe of listDirs(root)) {
    const parentPath = join(root, parentHe);

    // מקרה 1: parent ללא subs (tradu) — children הם פרויקטים ישירות
    if (parentHe === 'tradu') {
      const mapped = resolveBucketAndSub(parentHe);
      if (!mapped || mapped.error) {
        if (mapped?.error) warnings.push(mapped.error);
        continue;
      }
      for (const projectHe of listDirs(parentPath)) {
        const projPath = join(parentPath, projectHe);
        for (const { projectName, files } of collectProjects(projPath, projectHe)) {
          const key = `${mapped.bucket}/${mapped.sub}/${projectName}`;
          if (!collected.has(key)) {
            collected.set(key, {
              destDir: join(GALLERY_OUT, mapped.bucket, mapped.sub, projectName),
              files: new Map(),
            });
          }
          const entry = collected.get(key);
          for (const srcFile of files) {
            const hash = sha1(srcFile);
            if (!entry.files.has(hash)) entry.files.set(hash, srcFile);
          }
        }
      }
      continue;
    }

    // מקרה 2: parent עם subs (רגיל)
    for (const subHe of listDirs(parentPath)) {
      const mapped = resolveBucketAndSub(parentHe, subHe);
      if (!mapped || mapped.error || !mapped.sub) {
        warnings.push(`skip ${parentHe}/${subHe} — ${mapped?.error ?? 'no mapping'}`);
        continue;
      }
      const subPath = join(parentPath, subHe);

      // נגרות/פרטי הוא flat (קבצים ישירות) ולא תיקיות פרויקטים
      const subEntries = listDirs(subPath);
      const flatFiles = listFiles(subPath).filter(isImage);
      const isFlat = subEntries.length === 0 && flatFiles.length > 0;

      if (isFlat) {
        const projectClean = cleanProjectName(subHe); // השם של ה-sub יהפוך לשם הפרויקט
        const key = `${mapped.bucket}/${mapped.sub}/${projectClean}`;
        if (!collected.has(key)) {
          collected.set(key, {
            destDir: join(GALLERY_OUT, mapped.bucket, mapped.sub, projectClean),
            files: new Map(),
          });
        }
        const entry = collected.get(key);
        for (const fname of flatFiles) {
          const srcFile = join(subPath, fname);
          const hash = sha1(srcFile);
          if (!entry.files.has(hash)) entry.files.set(hash, srcFile);
        }
        continue;
      }

      // רגיל: subEntries = פרויקטים (אולי עם רמה נוספת של סניפים)
      for (const projectHe of subEntries) {
        const projPath = join(subPath, projectHe);
        for (const { projectName, files } of collectProjects(projPath, projectHe)) {
          const key = `${mapped.bucket}/${mapped.sub}/${projectName}`;
          if (!collected.has(key)) {
            collected.set(key, {
              destDir: join(GALLERY_OUT, mapped.bucket, mapped.sub, projectName),
              files: new Map(),
            });
          }
          const entry = collected.get(key);
          for (const srcFile of files) {
            const hash = sha1(srcFile);
            if (!entry.files.has(hash)) entry.files.set(hash, srcFile);
          }
        }
      }
    }
  }
}

// ---- כתיבה ----

let totalProjects = 0;
let totalImages = 0;
const summary = []; // { bucket, sub, project, count }

for (const [key, { destDir, files }] of collected) {
  if (files.size === 0) continue;
  totalProjects++;

  // ננקה תיקייה קיימת כדי שלא יישארו ספרות ישנות מסידור קודם
  if (existsSync(destDir)) rmSync(destDir, { recursive: true, force: true });
  mkdirSync(destDir, { recursive: true });

  // מיון לפי שם המקור
  const sortedSrcPaths = Array.from(files.values()).sort((a, b) =>
    naturalSort(a.split('/').pop(), b.split('/').pop())
  );

  sortedSrcPaths.forEach((src, i) => {
    const ext = extname(src).toLowerCase();
    const num = String(i + 1).padStart(2, '0');
    const dest = join(destDir, `${num}${ext}`);
    copyFileSync(src, dest);
    totalImages++;
  });

  const [bucket, sub, project] = key.split('/');
  summary.push({ bucket, sub, project, count: files.size });
}

// ---- סיכום ----

summary.sort((a, b) => `${a.bucket}/${a.sub}/${a.project}`.localeCompare(`${b.bucket}/${b.sub}/${b.project}`));
console.log('Imported projects:');
let lastBucketSub = '';
for (const s of summary) {
  const bucketSub = `${s.bucket}/${s.sub}`;
  if (bucketSub !== lastBucketSub) {
    console.log(`\n  \x1b[36m${bucketSub}\x1b[0m`);
    lastBucketSub = bucketSub;
  }
  console.log(`    · ${s.project}  (${s.count})`);
}

console.log('');
console.log(`\x1b[32m✓ Done\x1b[0m  ${totalProjects} projects · ${totalImages} images`);

if (warnings.length) {
  console.log('\n\x1b[33m⚠ Warnings:\x1b[0m');
  warnings.forEach((w) => console.log('   • ' + w));
}
