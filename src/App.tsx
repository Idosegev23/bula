// App.tsx - Bulla Studio
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout Components
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';

// UI Components
import { Hero } from './components/UI/Hero';
import { TargetAudiences } from './components/UI/TargetAudiences';
import { FeaturedProjects } from './components/UI/FeaturedProjects';
import { SocialFloat } from './components/UI/SocialFloat';

// Page Components
import { Services } from './components/Pages/Services';
import { Projects } from './components/Pages/Projects';
import { Architects } from './components/Pages/Architects';
import { About } from './components/Pages/About';
import { Contact } from './components/Pages/Contact';

// Accessibility
import { AccessibilityProvider } from './components/Accessibility/AccessibilityProvider';

// דף הבית השלם
const HomePage: React.FC = () => {
  return (
    <main>
      {/* 1. Hero Section - מכת הפתיחה */}
      <Hero />
      
      {/* 2. שלושת הקהלים */}
      <TargetAudiences />
      
      {/* 3. פרויקטים נבחרים */}
      <FeaturedProjects />
    </main>
  );
};

// דפים
const ServicesPage: React.FC = () => {
  return <Services />;
};

const ProjectsPage: React.FC = () => {
  return <Projects />;
};

const ArchitectsPage: React.FC = () => {
  return <Architects />;
};

const AboutPage: React.FC = () => {
  return <About />;
};

const ContactPage: React.FC = () => {
  return <Contact />;
};

// קומפוננטת האפליקציה הראשית
const App: React.FC = () => {
  return (
    <AccessibilityProvider>
      <Router>
        <div className="App">
          <Header />
          <main id="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/architects" element={<ArchitectsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
          
          {/* כפתורי רשתות חברתיות צפים */}
          <SocialFloat />
        </div>
      </Router>
    </AccessibilityProvider>
  );
};

export default App;
