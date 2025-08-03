// דוגמאות שימוש ברכיב SocialFloat - פוטר צף עם כפתורי CTA
import React from 'react';
import { SocialFloat } from './SocialFloat';

// דוגמה 1: שימוש בסיסי - פוטר צף עם שלושה כפתורי CTA
export const BasicSocialFloat: React.FC = () => {
  return <SocialFloat />;
};

// דוגמה 2: עם עיצוב מותאם אישית
export const CustomStyledSocialFloat: React.FC = () => {
  const customStyle = {
    '--whatsapp-color': '#128C7E',
    '--instagram-color': '#FF6347',
    '--contact-color': '#2E8B57',
    '--footer-bg': 'rgba(248, 248, 248, 0.95)',
  } as React.CSSProperties;

  return (
    <div style={customStyle}>
      <SocialFloat className="custom-social-float" />
    </div>
  );
};

// דוגמה 3: עם הערות לקסטומיזציה
export const ThemedSocialFloat: React.FC = () => {
  // ניתן להתאים את הצבעים ב-CSS:
  /*
    :root {
      --whatsapp-color: #25D366;
      --instagram-color: #E4405F;
      --contact-color: #000000;
      --footer-bg: rgba(255, 255, 255, 0.95);
      --footer-border: rgba(0, 0, 0, 0.1);
      --footer-shadow: rgba(0, 0, 0, 0.1);
    }
  */
  
  return <SocialFloat className="themed-footer" />;
};

// הערות שימוש:
/*
  הרכיב החדש SocialFloat כולל:
  
  1. פוטר צף בתחתית המסך
  2. שלושה כפתורי CTA:
     - "דברו איתנו" (וואטסאפ) - ירוק
     - "עקבו אחרינו" (אינסטגרם) - ורוד
     - "צרו קשר" (נווט לעמוד קשר) - שחור
  
  3. עיצוב responsive למובייל ודסקטופ
  4. אנימציות כניסה חלקות
  5. נגישות מלאה
  
  הרכיב מוסיף אוטומטית לכל עמוד באתר.
*/