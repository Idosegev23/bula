# Tech Context - Bulla Studio

## סטק טכנולוגיות
- **Frontend Framework**: React 18+ עם TypeScript (מותקן)
- **Routing**: React Router v7 (מותקן)
- **Styling**: CSS Modules + CSS Custom Properties
- **Build Tool**: Vite לביצועים מיטביים (מותקן)
- **Package Manager**: npm

## מבנה פרויקט מתוכנן
```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── UI/
│   │   ├── Hero.tsx
│   │   ├── TargetAudience.tsx
│   │   ├── ProcessSteps.tsx
│   │   ├── WorksGrid.tsx
│   │   ├── WorkItem.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── TestimonialCarousel.tsx
│   │   └── ContactForm.tsx
│   └── Pages/
│       ├── HomePage.tsx
│       ├── ServicesPage.tsx
│       ├── ProjectsPage.tsx
│       ├── ArchitectsPage.tsx
│       ├── AboutPage.tsx
│       └── ContactPage.tsx
├── styles/
│   ├── globals.css (reset + base styles)
│   ├── variables.css (CSS custom properties)
│   └── components/ (CSS Modules לכל קומפוננטה)
├── utils/
│   ├── animations.ts
│   ├── constants.ts
│   └── data.ts (נתונים אמוקים)
├── types/
│   └── index.ts (TypeScript interfaces)
├── assets/
│   ├── images/
│   └── icons/
└── hooks/ (אם נצטרך)
```

## Dependencies נוכחיות
```json
{
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.6.2",
    "@types/react-router-dom": "^5.3.3"
  },
  "devDependencies": {
    "@types/react": "^19.1.8",
    "@types/react-dom": "^19.1.6",
    "@vitejs/plugin-react": "^4.5.2",
    "typescript": "~5.8.3",
    "vite": "^7.0.0"
  }
}
```

## Dependencies נוספות לשקול
```bash
# Icons
npm install lucide-react

# Image optimization
npm install sharp

# Forms (אם נצטרך)
npm install react-hook-form

# Animations (אם נצטרך מעבר ל-CSS)
npm install framer-motion
```

## כללי קוד
- **TypeScript strict mode** - סוג מוגדר לכל prop ו-state
- **Component Props Interface** - כל קומפוננטה עם interface מוגדר
- **CSS Custom Properties** - משתנים גלובליים לצבעים, גדלים ו-breakpoints
- **הערות בעברית** - לפני כל קומפוננטה הסבר מה היא עושה
- **File naming**: PascalCase לקומפוננטות, camelCase לשאר

## CSS Architecture
```css
/* Variables בסיסיות */
:root {
  /* Colors */
  --color-black: #0D0D0D;
  --color-white: #FFFFFF;
  --color-gray-light: #F8F8F8;
  --color-gray-medium: #E5E5E5;
  --color-gray-dark: #666666;
  
  /* Typography */
  --font-family: 'Heebo', 'Inter', system-ui, sans-serif;
  --font-extralight: 200;
  --font-light: 300;
  --font-regular: 400;
  
  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;
  
  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.4s ease;
  --transition-slow: 0.6s ease;
  
  /* Breakpoints */
  --mobile: 320px;
  --tablet: 768px;
  --desktop: 1024px;
  --wide: 1200px;
}
```

## גופנים
```css
/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@200;300;400;700&display=swap');

/* Fallback strategy */
body {
  font-family: 'Heebo', 'Inter', 
               'SF Pro Display', 
               -apple-system, 
               BlinkMacSystemFont, 
               'Segoe UI', 
               Roboto, 
               sans-serif;
  font-weight: var(--font-light);
}
```

## Responsive Design
```css
/* Mobile First Approach */
.container {
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 0 2rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 3rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

## אנימציות ומעברים
```css
/* Base animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Intersection Observer עבור animations */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Performance אופטימיזציות
- **Code Splitting**: React.lazy() לעמודים
- **Image Optimization**: WebP עם fallback
- **Lazy Loading**: תמונות בגלריה
- **Critical CSS**: inline CSS חיוני
- **Bundle Analysis**: vite-bundle-analyzer

## SEO ונגישות
```typescript
// Meta tags template
interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

// Semantic HTML structure
const semanticStructure = {
  header: 'role="banner"',
  nav: 'role="navigation"',
  main: 'role="main"',
  section: 'aria-labelledby',
  footer: 'role="contentinfo"'
};

// ARIA labels
const ariaLabels = {
  navigation: 'תפריט ראשי',
  gallery: 'גלריית פרויקטים',
  filter: 'סינון פרויקטים',
  contact: 'טופס יצירת קשר'
};
```

## Development Workflow
```bash
# הפעלת dev server
npm run dev

# בדיקת TypeScript
npm run build

# Lint
npm run lint

# Preview production build
npm run preview
``` 

## Environment Variables
```env
# .env.local
VITE_SITE_URL=https://bullastudio.co.il
VITE_CONTACT_EMAIL=info@bullastudio.co.il
VITE_WHATSAPP_NUMBER=+972501234567
```

## טיפים טכניים
- **Vite HMR**: שמירה מהירה ועדכון מיידי
- **TypeScript**: strict mode מופעל לבטיחות מקסימלית
- **CSS Modules**: scoped styles למניעת קונפליקטים
- **Tree Shaking**: רק הקוד הנצרך נכלל בבנייה סופית
- **Modern JS**: ES2022+ עם פוליפילים לפי הצורך 