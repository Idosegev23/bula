#!/usr/bin/env node
/**
 * blob-purge-gallery.mjs
 *
 * מוחק את כל ה-blobs שמתחת ל-prefix `gallery/` ב-Vercel Blob.
 * שאר ה-blobs (לוגואים, hero, וכו') לא נוגעים בהם.
 *
 * Run:  node scripts/blob-purge-gallery.mjs              (תצוגה מקדימה בלבד)
 * Run:  node scripts/blob-purge-gallery.mjs --confirm    (מבצע את המחיקה)
 */

import { del, list } from '@vercel/blob';
import { config } from 'dotenv';
config({ path: '.env.local' });
config();

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('✗ Missing BLOB_READ_WRITE_TOKEN');
  process.exit(1);
}

const confirm = process.argv.includes('--confirm');
const PREFIX = 'gallery/';

console.log(`▸ Listing blobs with prefix "${PREFIX}"…`);

const all = [];
let cursor;
do {
  const res = await list({ prefix: PREFIX, cursor, limit: 1000 });
  all.push(...res.blobs);
  cursor = res.cursor;
} while (cursor);

console.log(`  found ${all.length} blobs (${(all.reduce((n, b) => n + b.size, 0) / 1024 / 1024).toFixed(2)} MB)`);

if (all.length === 0) {
  console.log('✓ Nothing to delete.');
  process.exit(0);
}

if (!confirm) {
  console.log('\nDRY RUN — first 5 to delete:');
  for (const b of all.slice(0, 5)) console.log('  • ' + b.pathname);
  if (all.length > 5) console.log(`  … and ${all.length - 5} more`);
  console.log('\nRe-run with --confirm to actually delete.');
  process.exit(0);
}

console.log(`▸ Deleting ${all.length} blobs…`);

// @vercel/blob `del` accepts an array of URLs and batches internally
const BATCH = 200;
let done = 0;
for (let i = 0; i < all.length; i += BATCH) {
  const slice = all.slice(i, i + BATCH).map((b) => b.url);
  await del(slice);
  done += slice.length;
  process.stdout.write(`\r  ${done}/${all.length}`);
}
process.stdout.write('\n');
console.log('✓ Done');
