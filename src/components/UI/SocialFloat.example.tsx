// דוגמאות שימוש ברכיב SocialFloat
import React from 'react';
import { SocialFloat } from './SocialFloat';
import type { SocialLink } from '../../types';

// דוגמה 1: שימוש בסיסי
export const BasicSocialFloat: React.FC = () => {
  return <SocialFloat />;
};

// דוגמה 2: מיקום בצד שמאל
export const LeftSocialFloat: React.FC = () => {
  return <SocialFloat position="left" />;
};

// דוגמה 3: בלי תוויות במובייל
export const NoLabelsSocialFloat: React.FC = () => {
  return <SocialFloat showLabels={false} />;
};

// דוגמה 4: רשתות חברתיות מותאמות אישית
export const CustomSocialFloat: React.FC = () => {
  const customLinks: SocialLink[] = [
    {
      name: 'youtube',
      url: 'https://youtube.com/@woodcraft',
      label: 'יוטיוב',
      isExternal: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      name: 'twitter',
      url: 'https://twitter.com/woodcraft',
      label: 'X (טוויטר)',
      isExternal: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'whatsapp',
      url: 'https://wa.me/972500000000',
      label: 'וואטסאפ',
      isExternal: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      )
    }
  ];

  return (
    <SocialFloat 
      customLinks={customLinks}
      position="right"
      showLabels={true}
    />
  );
};

// דוגמה 5: עם סגנון CSS מותאם אישית
export const ThemedSocialFloat: React.FC = () => {
  // אפשר להוסיף סגנונות CSS מותאמים אישית ב-global.css או בקובץ נפרד:
  /*
    :root {
      --social-float-primary: #2563eb;
      --social-float-secondary: #1d4ed8;
      --social-float-background: rgba(255, 255, 255, 0.9);
      --social-float-border: #2563eb;
      --social-float-text: #2563eb;
      --social-float-hover-bg: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      --social-float-hover-text: #ffffff;
      --social-float-shadow: rgba(37, 99, 235, 0.15);
      --social-float-shadow-hover: rgba(37, 99, 235, 0.25);
    }
  */
  
  return (
    <SocialFloat 
      className="themed-social-float"
      position="right"
    />
  );
};

// דוגמה 6: עם CSS Modules מקומי
export const StyledSocialFloat: React.FC = () => {
  const customStyle = {
    '--social-float-primary': '#10b981',
    '--social-float-secondary': '#059669',
    '--social-float-background': 'rgba(255, 255, 255, 0.95)',
    '--social-float-border': '#10b981',
    '--social-float-text': '#10b981',
    '--social-float-hover-bg': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    '--social-float-hover-text': '#ffffff',
    '--social-float-shadow': 'rgba(16, 185, 129, 0.15)',
    '--social-float-shadow-hover': 'rgba(16, 185, 129, 0.25)',
  } as React.CSSProperties;

  return (
    <div style={customStyle}>
      <SocialFloat />
    </div>
  );
};