import React from 'react';
import { Hero } from '../components/Hero';
import { TrustSection } from '../components/TrustSection';
import { Services } from '../components/Services';
import { FeaturedWork } from '../components/FeaturedWork';
import { AboutStudio } from '../components/AboutStudio';
import { ReviewsAndFAQ } from '../components/ReviewsAndFAQ';
import { FinalCTA } from '../components/FinalCTA';

interface HomePageProps {
  onOpenQuote: (serviceName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuote }) => {
  const handleExploreClick = () => {
    const galleryElem = document.getElementById('gallery');
    if (galleryElem) {
      galleryElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    const ctaElem = document.getElementById('cta');
    if (ctaElem) {
      ctaElem.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#cta');
    } else {
      onOpenQuote();
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <Hero
        onExploreClick={handleExploreClick}
        onContactClick={handleContactClick}
      />

      {/* Trust & Key Stats Section */}
      <TrustSection />

      {/* Services */}
      <Services onSelectService={(service) => onOpenQuote(service)} />

      {/* Featured Work */}
      <FeaturedWork onOpenQuote={onOpenQuote} />

      {/* About Studio */}
      <AboutStudio onMeetStudio={() => onOpenQuote('Wedding Photography')} />

      {/* Client Reviews & Frequently Asked Questions (Merged) */}
      <ReviewsAndFAQ onOpenQuote={() => onOpenQuote()} />

      {/* Final CTA */}
      <FinalCTA onOpenQuote={() => onOpenQuote()} />
    </main>
  );
};
