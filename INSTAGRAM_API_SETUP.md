# 🚀 הגדרת Instagram API אוטומטי עבור @bulla.studio

## 📋 מה נדרש

### 1. יצירת אפליקציה ב-Facebook Developers
1. לכו ל-[Facebook Developers](https://developers.facebook.com/)
2. צרו חשבון Developer (אם אין לכם)
3. לחצו "Create App" ← "Consumer" ← "Next"
4. מלאו שם אפליקציה: "Bulla Studio Website"
5. בחרו "Instagram Basic Display" כמוצר

### 2. הגדרת Instagram Basic Display
1. בדשבורד האפליקציה, לכו ל-"Instagram Basic Display"
2. לחצו "Create New App"
3. מלאו:
   - **Display Name**: "Bulla Studio Website"
   - **Valid OAuth Redirect URIs**: `https://yourdomain.com/auth/instagram/callback`
   - **Deauthorize Callback URL**: `https://yourdomain.com/auth/instagram/deauth`
   - **Data Deletion Request URL**: `https://yourdomain.com/auth/instagram/delete`

### 3. הוספת Instagram Test User
1. בחלק "Roles" ← "Roles"
2. לחצו "Add Instagram Testers"
3. הוסיפו את חשבון @bulla.studio
4. אשרו ב-Instagram (צריך לאשר מהחשבון)

### 4. קבלת Access Token
1. לכו ל-"Basic Display" ← "Generate Token"
2. בחרו את חשבון @bulla.studio
3. אשרו הרשאות
4. העתיקו את ה-Access Token

## ⚙️ הגדרת האתר

### עדכון קובץ .env.local
החליפו את הערכים בקובץ `.env.local`:

```env
# הדביקו כאן את הנתונים מ-Facebook Developers
VITE_INSTAGRAM_ACCESS_TOKEN=IGQVJ...  # Access Token שקיבלתם
VITE_INSTAGRAM_USER_ID=123456789     # User ID מהאפליקציה
VITE_INSTAGRAM_APP_ID=123456789      # App ID מהאפליקציה
VITE_INSTAGRAM_APP_SECRET=abc123...  # App Secret מהאפליקציה

# הגדרות האתר
VITE_INSTAGRAM_USERNAME=bulla.studio
VITE_POSTS_TO_SHOW=6
```

### איך למצוא את הנתונים:
- **App ID**: בדשבורד הראשי של האפליקציה
- **App Secret**: Settings ← Basic ← App Secret (Show)
- **User ID**: Instagram Basic Display ← Instagram App ID
- **Access Token**: ב-Generate Token

## 🔄 איך זה עובד

### רענון אוטומטי:
- ✅ האתר בודק פוסטים חדשים כל 5 דקות
- ✅ Cache למניעת עומס על ה-API
- ✅ Fallback אוטומטי אם יש בעיות

### מה קורה אחרי ההגדרה:
1. **פרסמתם פוסט חדש באינסטגרם** → האתר יציג אותו תוך 5 דקות
2. **מחקתם פוסט** → יעלם מהאתר באפדייט הבא
3. **שיניתם תיאור** → יתעדכן באתר אוטומטית

## 🎯 פתירת בעיות

### Access Token פג תוקף
Access Tokens של Instagram חיים 60 יום. אחרי זה צריך לחדש:

1. לכו לדשבורד Facebook Developers
2. Instagram Basic Display ← Generate Token
3. העתיקו את ה-Token החדש ל-.env.local

### בדיקת סטטוס
פתחו Console בדפדפן - תראו הודעות:
- ✅ "נטענו 6 פוסטים בהצלחה"
- ❌ "שגיאה בטעינת פוסטים" (בדקו Token)

### בדיקה אם מוגדר נכון
1. פתחו את האתר
2. F12 ← Console
3. תראו: "🔄 טוען פוסטים מאינסטגרם..."

## 📱 התוצאה

אחרי ההגדרה, האתר יציג:
- **פוסטים אמיתיים** מ-@bulla.studio
- **תמונות באיכות גבוהה**
- **תיאורים מלאים**
- **תאריכי פרסום**
- **קישורים לפוסטים המקוריים**

---

## 🆘 צריכים עזרה?

אם יש בעיות עם ההגדרה:
1. בדקו שכל השדות במקום הנכון ב-.env.local
2. ודאו שהחשבון @bulla.studio מאושר כ-Instagram Tester
3. נסו לרענן את הדף כמה פעמים

**הפיד יתחיל לעבוד מיד אחרי ההגדרה הנכונה!** 🎉