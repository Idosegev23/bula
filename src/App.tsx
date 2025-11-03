// App.tsx - Bulla Studio
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { ScrollToTop } from './components/UI/ScrollToTop';
// import FloatingServicesFooter from './components/UI/FloatingServicesFooter';


// Layout Components
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';

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

// תוכן האפליקציה הפנימי עם תנאי לפוטר
const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <div className="App">
        {/* Spinner עם GSAP לכל הדפים */}
        <Spinner onFinish={() => {
          window.dispatchEvent(new CustomEvent('spinner:finished'));
        }} />

        <Header />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/architects" element={<ArchitectsPage />} />
            <Route path="/private-clients" element={<PrivateClientsPage />} />
            <Route path="/business-clients" element={<BusinessClientsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </main>
        <Footer />
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
