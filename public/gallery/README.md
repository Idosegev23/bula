# Gallery — מבנה תיקיות וזרימת עבודה

תיקייה זו משמשת כ-**staging** לתמונות הגלריה. **התמונות עצמן לא נכנסות ל-git** — הן מועלות ל-Vercel Blob ע"י סקריפט, וה-URLs שלהן נשמרים ב-[src/data/projectsGallery.ts](../../src/data/projectsGallery.ts).

## מבנה תיקיות (קונבנציה)

```
public/gallery/
└── <parent>/                                ← קטגוריית-אם (חובה אחד מ-3)
    └── <sub>/                               ← תת-קטגוריה (kebab-case אנגלית)
        └── <project-name>--<location>/      ← פרויקט (שם--מיקום, פיצול ב-"--")
            ├── 01.jpg                       ← תמונת קאבר
            ├── 02.jpg
            └── 03.jpg
```

### `<parent>` — חובה אחד מ-3

- `businesses` — עסקים (Services + BusinessClients)
- `architecture` — קשרי אדריכלים (Architects)
- `carpentry` — נגרות בהתאמה אישית (PrivateClients)

### `<sub>` — תת-קטגוריה

שם תיקיה ב-kebab-case אנגלי. ערוך את [scripts/gallery-labels.json](../../scripts/gallery-labels.json) אם צריך תווית עברית חדשה. דוגמאות מוכנות:

- **businesses:** `bakeries`, `cafes`, `restaurants`, `gyms`, `offices`, `retail`, `clinics`, `hotels`, `events`...
- **architecture:** `residential`, `commercial`, `hospitality`, `public-spaces`, `showrooms`...
- **carpentry:** `kitchens`, `closets`, `furniture`, `doors`, `walls`, `stairs`, `bathrooms`...

### `<project>` — שם הפרויקט

| שם תיקיה                              | שם פרויקט              | מיקום    |
| ------------------------------------- | ----------------------- | -------- |
| `מאפיית-לחם-הארץ--תל-אביב`           | מאפיית לחם הארץ        | תל אביב  |
| `בוטיק-מאפים`                         | בוטיק מאפים            | —        |

### תמונות

- כל פורמט: **JPG / PNG / WebP / AVIF** — הסקריפט עושה אופטימיזציה (sharp → WebP 1400px @ Q82).
- שמות: `01`, `02`, `03`... — הסדר הזה ייקבע גם בגלריה. הראשון הוא הקאבר.

---

## זרימת עבודה — Vercel Blob (המומלצת)

האימג'ים מאוחסנים ב-Vercel Blob — מהיר, גלובלי, וה-repo נשאר רזה.

### חד-פעמי — הגדרת Blob store

1. Vercel Dashboard → הפרויקט → **Storage** tab → **Create** → **Blob**.
2. אחרי שנוצר → לחץ עליו → tab `.env.local` → העתק את `BLOB_READ_WRITE_TOKEN`.
3. צור קובץ `.env.local` בשורש הריפו (לא נכנס ל-git):
   ```
   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxx...
   ```

### בכל פעם שמוסיפים תמונות

1. סדר אימג'ים ב-`public/gallery/<parent>/<sub>/<project>/` לפי הקונבנציה.
2. הרץ:
   ```bash
   npm run gallery:upload
   ```
3. הסקריפט יבצע:
   - **אופטימיזציה** של כל תמונה ל-WebP 1400px.
   - **העלאה ל-Vercel Blob** (רק מה שחדש — יש cache לפי hash).
   - **כתיבת `src/data/projectsGallery.ts`** עם ה-URLs המלאים.
4. **Commit** רק את `src/data/projectsGallery.ts` (האימג'ים ב-`public/gallery/` ב-gitignore).

### מטמון — `scripts/gallery-blob-cache.json`

אם תמונה לא השתנתה (אותו hash אחרי אופטימיזציה) → היא לא מועלית שוב. אם מחקת או שינית תמונה — היא תועלה מחדש. ה-cache לא נכנס ל-git כדי שלא יהיו קונפליקטים בין מחשבים, אבל ה-`projectsGallery.ts` שנוצר ממנו — כן.

### למחוק פרויקט / תמונה

- מחק את התיקיה / קובץ ב-`public/gallery/`, הרץ `npm run gallery:upload` שוב.
- ה-TS data יתעדכן ולא יכלול את התמונה. **התמונה הישנה תשאר ב-Blob** עד מחיקה ידנית מה-dashboard (כדאי לנקות מדי פעם).

---

## זרימת עבודה — Local-only (פיתוח/בדיקה)

אם אתה רק רוצה לבדוק במהירות בלי להעלות לענן:

```bash
npm run gallery:build
```

זה סורק את `public/gallery/` ומייצר `projectsGallery.ts` עם URLs לוקאליים (`/gallery/...`). **לא מבצע אופטימיזציה, לא מעלה לשום מקום.** טוב לפיתוח לוקאלי, לא לפרודקשן (התמונות לא יגיעו ל-Vercel כי `public/gallery/` ב-gitignore).

---

## הערות חשובות

- **שמות עבריים בתיקיות עובדים** — הסקריפט מטפל ב-encoding.
- **אל תערוך את `src/data/projectsGallery.ts` ידנית** — הוא נכתב מחדש בכל ריצה.
- **אם הסקריפט לא מוצא תמונות** — הוא לא דורס את הקובץ הקיים (בטוח להריץ ריק).
