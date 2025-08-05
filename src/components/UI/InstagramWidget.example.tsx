/**
 * InstagramWidget Example - דוגמה לווידג'ט אינסטגרם
 * 
 * רכיב זה מחליף את FeaturedProjects ומטמיע ווידג'ט LightWidget חיצוני
 * 
 * מאפיינים עיקריים:
 * ✅ טעינה lazy עם IntersectionObserver
 * ✅ סקריפט LightWidget נטען אוטומטית
 * ✅ מצב טעינה עם spinner מותאם אישית
 * ✅ עיצוב responsive לכל הגדלים
 * ✅ אנימציות חלקות עם delays
 * ✅ אופטימיזציה לביצועים
 * 
 * השימוש:
 * ```tsx
 * import { InstagramWidget } from './components/UI/InstagramWidget';
 * 
 * function HomePage() {
 *   return (
 *     <div>
 *       <InstagramWidget />
 *     </div>
 *   );
 * }
 * ```
 * 
 * ווידג'ט LightWidget:
 * - מקור: https://lightwidget.com/
 * - ID: e8b18f000bb55d7eba116bb01cde9b00
 * - עיצוב אוטומטי responsive
 * - תמיכה בכל סוגי הפוסטים
 * 
 * מאפיינים טכניים:
 * 🎯 Lazy loading - הווידג'ט נטען רק כשהוא נראה
 * 🎯 Script management - ניהול אוטומטי של סקריפט LightWidget
 * 🎯 Loading states - מצבי טעינה ברורים למשתמש
 * 🎯 Error handling - טיפול בכשלונות טעינה
 * 🎯 Cleanup - ניקוי סקריפטים בעת unmount
 * 
 * עיצוב ואנימציות:
 * 📱 Mobile-first responsive design
 * 📱 אנימציות fadeIn עם delays מדויקים  
 * 📱 spinner טעינה מותאם למותג
 * 📱 כפתור CTA לעקיבה באינסטגרם
 * 📱 צללים ועיגולים עדינים
 * 
 * תמיכה בנגישות:
 * ♿ prefers-reduced-motion support
 * ♿ title על iframe
 * ♿ alt texts וlabels
 * ♿ keyboard navigation ברכיבי האינטראקציה
 * 
 * ביצועים:
 * ⚡ lazy loading עם threshold 0.2
 * ⚡ בדיקת קיום סקריפט לפני טעינה חוזרת
 * ⚡ cleanup אוטומטי של resources
 * ⚡ אופטימיזציה לגדלי מסך שונים
 * ⚡ min-height מותאם למניעת layout shift
 * 
 * התאמה אישית:
 * - שינוי ID הווידג'ט ב-iframe src
 * - התאמת צבעים דרך CSS variables
 * - שינוי threshold ל-IntersectionObserver
 * - התאמת גדלים responsive
 * - שינוי טקסטי כותרת ותיאור
 * 
 * דברים לזכור:
 * 💡 הווידג'ט תלוי בשירות חיצוני (LightWidget)
 * 💡 יש dependency על חיבור אינטרנט
 * 💡 זמני טעינה תלויים ברשת ובשרת החיצוני
 * 💡 יש לוודא שה-ID של הווידג'ט תקין
 * 💡 LightWidget עשוי לדרוש הגדרות CORS
 * 
 * החלפה מ-FeaturedProjects:
 * ✨ רכיב זה מחליף את FeaturedProjects.tsx
 * ✨ אותו עיצוב וחוויית משתמש
 * ✨ פונקציונליות מתקדמת יותר
 * ✨ חיבור לאינסטגרם אמיתי דרך LightWidget
 * ✨ עדכונים אוטומטיים של תוכן
 */

import React from 'react';
import { InstagramWidget } from './InstagramWidget';

// דוגמה בסיסית
export const BasicInstagramWidget: React.FC = () => {
  return (
    <div style={{ padding: '40px 0', backgroundColor: '#f9f9f9' }}>
      <InstagramWidget />
    </div>
  );
};

// דוגמה עם className מותאם
export const CustomStyledInstagramWidget: React.FC = () => {
  return (
    <div style={{ padding: '60px 0', backgroundColor: '#ffffff' }}>
      <InstagramWidget className="custom-instagram-section" />
    </div>
  );
};

// דוגמה במקום FeaturedProjects
export const ReplacementExample: React.FC = () => {
  return (
    <main>
      {/* קודם */}
      {/* <FeaturedProjects /> */}
      
      {/* אחרי */}
      <InstagramWidget />
    </main>
  );
};

export default {
  BasicInstagramWidget,
  CustomStyledInstagramWidget,
  ReplacementExample
};