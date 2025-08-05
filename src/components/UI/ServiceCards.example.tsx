// דוגמאות שימוש ברכיב ServiceCards עם Rough.js
import React from 'react';
import { ServiceCards } from './ServiceCards';

// דוגמה 1: שימוש בסיסי
export const BasicServiceCards: React.FC = () => {
  return <ServiceCards />;
};

// דוגמה 2: עם className מותאם אישית
export const CustomStyledServiceCards: React.FC = () => {
  return <ServiceCards className="my-custom-service-cards" />;
};

// הערות שימוש:
/*
  רכיב ServiceCards מתקדם עם Rough.js - עיצוב אורגני ומקצועי:
  
  🎨 תכונות Rough.js מתקדמות:
  1. כרטיסיות בצורות אורגניות (לא גיאומטריות)
  2. רקע עם כתמי צבע, נקודות אקראיות, וקווים מתפתלים
  3. כל כרטיס עם צורה ייחודית שנוצרת באופן אקראי
  4. אנימציות כניסה עם סיבוב, הטיה ומתיחה
  
  💡 הבדלים מעיצוב רגיל:
  - אין border-radius סימטרי - כל פינה שונה
  - transforms עם rotate, skew, scale
  - צללים מרובים ולא סימטריים
  - מעברים עם cubic-bezier לחוויה טבעית יותר
  
  🎯 רכיבי Rough.js שנמשתמש בהם:
  - path() עם SVG paths אורגניים
  - circle() עם roughness וbowing גבוהים
  - curve() עם נקודות לא סדירות
  - polygon() למשולשים עם זוויות אקראיות
  - fillStyle: hachure, dots, zigzag, cross-hatch
  
  📱 Responsive ואפקטים:
  - Mobile-First עם התאמות למסכים שונים
  - אנימציות מותנות prefers-reduced-motion
  - support לצמתי contrast גבוהים
  - print styles מותאמים
  
  🚀 ביצועים:
  - Canvas optimized עם devicePixelRatio
  - אנימציות GPU-accelerated
  - lazy generation של צורות אקראיות
  
  הכרטיסיות:
  1. עיצוב מסחרי 🏢 (כתום #FF6B35) - hachure fill
  2. קשרי אדריכלים 📐 (טורקיז #4ECDC4) - dots/zigzag fill  
  3. רהיטים פרטיים 🪑 (כחול #45B7D1) - cross-hatch fill
  
  כל כרטיס מכיל:
  - צורה אורגנית ייחודית שנוצרת באקראי
  - כתמי צבע במקום מלבנים
  - נקודות ושטרטוטים דקורטיביים
  - כפתור CTA עם גבולות לא סימטריים
  - אפקטי hover עם סיבוב והטיה
*/