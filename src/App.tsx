// App.tsx - Bulla Studio
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ScrollToTop } from './components/UI/ScrollToTop';
// import FloatingServicesFooter from './components/UI/FloatingServicesFooter';


// Layout Components
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';

// UI Components
import { Hero } from './components/UI/Hero';
import { TechnicalServiceCards } from './components/UI/TechnicalServiceCards';
import { InstagramWidget } from './components/UI/InstagramWidget';
// import { SocialFloat } from './components/UI/SocialFloat';
import Spinner from './components/UI/Spinner';

// Page Components
import { Services } from './components/Pages/Services';
import { ServicesIndex } from './components/Pages/ServicesIndex';
import { Projects } from './components/Pages/Projects';
import { Architects } from './components/Pages/Architects';
import { About } from './components/Pages/About';
import { Contact } from './components/Pages/Contact';

// Accessibility
// import { AccessibilityProvider } from './components/Accessibility/AccessibilityProvider';

// דף הבית השלם
const HomePage: React.FC = () => {
  return (
    <>
      {/* 1. Hero Section - מכת הפתיחה */}
      <Hero />
      
      {/* 2. שלושת השירותים - עיצוב הנדסי */}
      <TechnicalServiceCards />
      
      {/* 3. ווידג'ט אינסטגרם */}
      <InstagramWidget />
    </>
  );
};

// דפים
const ServicesPage: React.FC = () => <Services />;
const ServicesIndexPage: React.FC = () => <ServicesIndex />;

const ProjectsPage: React.FC = () => {
  return <Projects />;
};

const ArchitectsPage: React.FC = () => <Architects />;

const AboutPage: React.FC = () => {
  return <About />;
};

const ContactPage: React.FC = () => {
  return <Contact />;
};

// קומפוננטת האפליקציה הראשית
const App: React.FC = () => {
  return (
    // <AccessibilityProvider>
      <Router>
      <ScrollToTop />
        <div className="App">
          {/* Spinner עם GSAP לכל הדפים */}
          <Spinner onFinish={() => {
            // שלח אירוע גלובלי לסיום הספינר כדי שעמודים יוכלו להמתין לפני אנימציות כניסה
            window.dispatchEvent(new CustomEvent('spinner:finished'));
          }} />
          
          <Header />
          <main id="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesIndexPage />} />
              <Route path="/services/one-stop-shop" element={<ServicesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/services/architects" element={<ArchitectsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
          
          {/* כפתורי רשתות חברתיות צפים */}
          {/* <SocialFloat /> */}
          {/* <FloatingServicesFooter /> */}
        </div>
      </Router>
    // </AccessibilityProvider>
  );
};

export default App;
