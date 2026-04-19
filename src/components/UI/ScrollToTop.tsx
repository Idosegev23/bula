import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  // גולל לראש הדף בכל ניווט לנתיב חדש (ללא hash).
  // משתמש ב-useLayoutEffect כדי להפעיל לפני הציור הראשון של הדף החדש,
  // ודוחה את scroll-behavior:smooth הגלובלי כדי שתהיה קפיצה מיידית.
  useLayoutEffect(() => {
    if (hash) return;

    const html = document.documentElement;
    const previousBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    html.scrollTop = 0;

    html.style.scrollBehavior = previousBehavior;
  }, [pathname, hash]);

  return null;
};
