# System Patterns - Bulla Studio

## ארכיטקטורת קומפוננטות
```
App
├── Layout/
│   ├── Header (תפריט מינימלי עם לוגו)
│   ├── Footer (קישורים + מידע קשר)
│   └── Navigation (נייד עם drawer)
├── Pages/
│   ├── HomePage (Hero + קהלי יעד + תהליך + גלריה)
│   ├── ServicesPage (Grid שירותים עם אייקונים)
│   ├── ProjectsPage (גלריה עם סינון)
│   ├── ArchitectsPage (עמוד מותאם לאדריכלים)
│   ├── AboutPage (צוות + מספרים + וידאו)
│   └── ContactPage (טופס + וואטסאפ + מייל)
├── Components/
│   ├── Hero (כותרת ענקה + תמונה + CTA)
│   ├── TargetAudience (3 קהלי יעד בגריד)
│   ├── ProcessSteps (4 שלבים עם אייקונים)
│   ├── WorksGrid (גלריה עם סינון)
│   ├── WorkItem (תמונה + כותרת + פרטים)
│   ├── ServiceCard (אייקון + כותרת + תיאור)
│   ├── TestimonialCarousel (המלצות לקוחות)
│   └── ContactForm (טופס מינימלי)
└── Utils/
    ├── animations (fade-in, slide-up, hover)
    ├── constants (צבעים, breakpoints)
    └── data (פרויקטים, שירותים, צוות)
```

## דפוסי עיצוב עיקריים

### דפוס Layout מינימלי
```css
/* Container מרכזי */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Grid system */
.grid {
  display: grid;
  gap: 2rem;
}

/* Spacing systematic (8px base) */
:root {
  --space-xs: 0.5rem;    /* 8px */
  --space-sm: 1rem;      /* 16px */
  --space-md: 2rem;      /* 32px */
  --space-lg: 4rem;      /* 64px */
  --space-xl: 8rem;      /* 128px */
}
```

### דפוס טיפוגרפיה
```css
:root {
  /* Sizes */
  --text-hero: clamp(3rem, 6vw, 4.5rem);     /* 48-72px */
  --text-h1: clamp(2rem, 4vw, 3rem);        /* 32-48px */
  --text-h2: clamp(1.5rem, 3vw, 2rem);      /* 24-32px */
  --text-body: 1.125rem;                     /* 18px */
  --text-small: 0.875rem;                    /* 14px */
  
  /* Weights */
  --font-extralight: 200;
  --font-light: 300;
  --font-regular: 400;
}

/* גופן אחד עם fallbacks */
body {
  font-family: 'Heebo', 'Inter', system-ui, sans-serif;
  font-weight: var(--font-light);
}
```

### דפוס צבעים
```css
:root {
  /* Primary colors */
  --color-black: #0D0D0D;
  --color-white: #FFFFFF;
  --color-gray-light: #F8F8F8;
  --color-gray-medium: #E5E5E5;
  --color-gray-dark: #666666;
  
  /* Interactive */
  --color-hover: rgba(13, 13, 13, 0.7);
  --color-focus: rgba(13, 13, 13, 0.1);
}
```

### דפוס אנימציות
```css
/* Base transitions */
:root {
  --transition-fast: 0.2s ease;
  --transition-normal: 0.4s ease;
  --transition-slow: 0.6s ease;
}

/* Fade-in pattern */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp var(--transition-slow) forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover pattern */
.hover-lift {
  transition: transform var(--transition-fast);
}

.hover-lift:hover {
  transform: translateY(-2px);
}
```

## דפוסי נתונים

### Project Item Structure
```typescript
interface Project {
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
```

### Service Item Structure
```typescript
interface Service {
  id: string;
  title: string;                   // "ייעוץ ותכנון חוויית לקוח"
  description: string;             // "משפט מחץ"
  icon: string;                    // icon name
  targetAudience: 'business' | 'architects' | 'private' | 'all';
}
```

### Team Member Structure
```typescript
interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}
```

## דפוסי אינטראקציה

### Navigation Pattern
```typescript
// Desktop: תפריט אופקי עליון
const desktopNav = ['בית', 'שירותים', 'פרויקטים', 'אדריכלים', 'אודות', 'צור קשר'];

// Mobile: drawer עם אנימציה עדינה
const mobileNav = {
  trigger: 'כפתור המבורגר',
  style: 'slide-in מימין',
  backdrop: 'אפור שקוף'
};
```

### Gallery Pattern
```css
/* Responsive grid */
.works-grid {
  display: grid;
  grid-template-columns: 1fr;                    /* Mobile */
  gap: var(--space-md);
}

@media (min-width: 768px) {
  .works-grid {
    grid-template-columns: repeat(2, 1fr);       /* Tablet */
  }
}

@media (min-width: 1024px) {
  .works-grid {
    grid-template-columns: repeat(3, 1fr);       /* Desktop */
  }
}

/* Image aspect ratio */
.work-image {
  aspect-ratio: 4/3;
  object-fit: cover;
}
```

### CTA Pattern
```typescript
// Primary CTA
const primaryCTA = {
  style: 'שחור עם טקסט לבן',
  hover: 'שקיפות 0.8',
  text: 'צפו בעבודות'
};

// Secondary CTA  
const secondaryCTA = {
  style: 'קו שחור עם טקסט שחור',
  hover: 'רקע אפור בהיר',
  text: 'איך אנחנו עובדים'
};
```

## דפוסי נגישות

### Semantic HTML
```html
<header role="banner">
<nav role="navigation" aria-label="תפריט ראשי">
<main role="main">
<section aria-labelledby="hero-heading">
<article role="article">
<footer role="contentinfo">
```

### ARIA Labels
```typescript
const ariaLabels = {
  navigation: 'תפריט ראשי',
  gallery: 'גלריית פרויקטים',
  filter: 'סינון פרויקטים לפי קטגוריה',
  contact: 'טופס יצירת קשר'
};
```

### Keyboard Navigation
```css
/* Focus states */
:focus-visible {
  outline: 2px solid var(--color-black);
  outline-offset: 2px;
}

/* Skip links */
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  background: var(--color-black);
  color: var(--color-white);
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: top var(--transition-fast);
}

.skip-link:focus {
  top: 0;
}
``` 