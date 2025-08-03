// TypeScript Interfaces - Bulla Studio

// ======= פרויקט =======
export interface Project {
  id: string;
  title: string;                    // "משרדי הייטק, תל אביב"
  category: 'commercial' | 'residential' | 'furniture';
  images: {
    thumbnail: string;
    gallery: string[];
  };
  location?: string;                // "תל אביב"
  year?: number;                   // 2024
  client?: string;                 // "חברת הייטק מובילה"
  description?: string;            // תיאור קצר
}

// ======= שירות =======
export interface Service {
  id: string;
  title: string;                   // "ייעוץ ותכנון חוויית לקוח"
  description: string;             // "משפט מחץ"
  icon: string;                    // icon name
  targetAudience: 'business' | 'architects' | 'private' | 'all';
}

// ======= איש צוות =======
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

// ======= המלצה =======
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating?: number;
}

// ======= שלב תהליך =======
export interface ProcessStep {
  step: number;                    // 1-4
  title: string;                   // "רעיון"
  description: string;             // תיאור השלב
  icon: string;                    // icon name
  details?: string[];              // פרטים נוספים
}

// ======= קהל יעד =======
export interface TargetAudience {
  id: string;
  title: string;                   // "עיצוב מסחרי"
  subtitle: string;                // "לבעלי עסקים"
  description: string;             // תיאור קצר
  icon: string;                    // icon name
  link: string;                    // לינק לעמוד המתאים
}

// ======= פרטי יצירת קשר =======
export interface ContactInfo {
  phone: string;
  email: string;
  whatsapp: string;
  address?: string;
  socialMedia?: {
    instagram?: string;
    linkedin?: string;
  };
}

// ======= מטא נתונים לSEO =======
export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

// ======= רשתות חברתיות =======
export interface SocialLink {
  name: 'facebook' | 'instagram' | 'whatsapp' | 'linkedin' | 'email' | 'twitter' | 'youtube';
  url: string;
  icon: React.ReactNode;
  label: string;
  isExternal?: boolean;
}

export interface SocialFloatProps {
  className?: string;
  position?: 'left' | 'right';
  showLabels?: boolean;
  customLinks?: SocialLink[];
} 