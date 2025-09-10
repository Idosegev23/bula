// App.tsx - Bulla Studio - גלילה אופקית מלאה
import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { ScrollToTop } from './components/UI/ScrollToTop';
// import FloatingServicesFooter from './components/UI/FloatingServicesFooter';


// Layout Components
import { Header } from './components/Layout/Header';
// import { Footer } from './components/Layout/Footer'; // לא בשימוש בגלילה אופקית

// UI Components
import { HorizontalScrollSections } from './components/UI/HorizontalScrollSections';
// import { SocialFloat } from './components/UI/SocialFloat';
import Spinner from './components/UI/Spinner';

// Page Components
import { Services } from './components/Pages/Services';

import { Projects } from './components/Pages/Projects';
import { Architects } from './components/Pages/Architects';
import { About } from './components/Pages/About';

import { PrivateClients } from './components/Pages/PrivateClients';
import { BusinessClients } from './components/Pages/BusinessClients';

// Accessibility
// import { AccessibilityProvider } from './components/Accessibility/AccessibilityProvider';

// דף הבית השלם
const HomePage: React.FC = () => {
  return (
    <>
      {/* תמונה רחבה לאורך 3 סקשנים והרקע נע אלכסונית עם הגלילה */}
      <HorizontalScrollSections imageUrl="/homep.png" />
    </>
  );
};

// רכיב גלילה אופקית לכל הדפים
const HorizontalScroller: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  
  // כל הדפים של האתר כרכיבים
  const pages = [
    { path: '/', component: <HomePage />, title: 'דף הבית' },
    { path: '/services', component: <ServicesPage />, title: 'שירותים' },
    { path: '/projects', component: <ProjectsPage />, title: 'פרויקטים' },
    { path: '/architects', component: <ArchitectsPage />, title: 'אדריכלים' },
    { path: '/private-clients', component: <PrivateClientsPage />, title: 'לקוחות פרטיים' },
    { path: '/business-clients', component: <BusinessClientsPage />, title: 'לקוחות עסקיים' },
    { path: '/about', component: <AboutPage />, title: 'אודות' }
  ];

  // מציאת האינדקס של הדף הנוכחי
  useEffect(() => {
    const currentIndex = pages.findIndex(page => page.path === location.pathname);
    if (currentIndex !== -1) {
      setCurrentPageIndex(currentIndex);
      
      // גלילה לדף הנכון
      if (scrollContainerRef.current) {
        const pageWidth = window.innerWidth;
        scrollContainerRef.current.scrollTo({
          left: currentIndex * pageWidth,
          behavior: 'smooth'
        });
      }
    }
  }, [location.pathname]);

  // טיפול בגלילה עם גלגל העכבר
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!scrollContainerRef.current) return;
      
      e.preventDefault();
      
      // גלילה אופקית עם גלגל העכבר
      const scrollAmount = e.deltaY > 0 ? window.innerWidth : -window.innerWidth;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll = Math.max(0, Math.min(
        currentScroll + scrollAmount,
        (pages.length - 1) * window.innerWidth
      ));
      
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    };

    // טיפול בעדכון האינדקס בזמן גלילה
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const pageWidth = window.innerWidth;
      const newIndex = Math.round(scrollLeft / pageWidth);
      
      if (newIndex !== currentPageIndex) {
        setCurrentPageIndex(newIndex);
        
        // עדכון ה-URL
        const newPath = pages[newIndex]?.path;
        if (newPath && newPath !== location.pathname) {
          window.history.pushState({}, '', newPath);
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    // טיפול בניווט עם מקלדת
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!scrollContainerRef.current) return;
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = Math.min(currentPageIndex + 1, pages.length - 1);
        scrollContainerRef.current.scrollTo({
          left: nextIndex * window.innerWidth,
          behavior: 'smooth'
        });
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = Math.max(currentPageIndex - 1, 0);
        scrollContainerRef.current.scrollTo({
          left: prevIndex * window.innerWidth,
          behavior: 'smooth'
        });
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pages.length, currentPageIndex, location.pathname]);

  return (
    <>
      <div className="horizontal-scroller" ref={scrollContainerRef}>
        {pages.map((page) => (
          <div key={page.path} className="page-container">
            {page.component}
          </div>
        ))}
      </div>
      
      {/* אינדיקטור עמודים */}
      <div className="page-indicator">
        {pages.map((page, index) => (
          <div 
            key={page.path}
            className={`page-indicator-dot ${currentPageIndex === index ? 'active' : ''}`}
            onClick={() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({
                  left: index * window.innerWidth,
                  behavior: 'smooth'
                });
              }
            }}
            title={page.title}
          />
        ))}
      </div>
    </>
  );
};

// תוכן האפליקציה הפנימי עם גלילה אופקית
const AppContent: React.FC = () => {

  return (
    <>
      <ScrollToTop />
      <div className="App horizontal-app">
        {/* Spinner עם GSAP לכל הדפים */}
        <Spinner onFinish={() => {
          window.dispatchEvent(new CustomEvent('spinner:finished'));
        }} />

        <Header />
        <main id="main-content" className="horizontal-main">
          <Routes>
            <Route path="*" element={<HorizontalScroller />} />
          </Routes>
        </main>
        {/* Footer רק בדף הבית יישאר כמו שהוא */}
        {/* כפתורי רשתות חברתיות צפים */}
        {/* <SocialFloat /> */}
        {/* <FloatingServicesFooter /> */}
      </div>
    </>
  );
};

// דפים
const ServicesPage: React.FC = () => <Services />;
const ProjectsPage: React.FC = () => {
  return <Projects />;
};

const ArchitectsPage: React.FC = () => <Architects />;

const AboutPage: React.FC = () => {
  return <About />;
};

const PrivateClientsPage: React.FC = () => {
  return <PrivateClients />;
};

const BusinessClientsPage: React.FC = () => {
  return <BusinessClients />;
};

// קומפוננטת האפליקציה הראשית
const App: React.FC = () => {
  return (
    // <AccessibilityProvider>
      <Router>
        <AppContent />
      </Router>
    // </AccessibilityProvider>
  );
};

export default App;
