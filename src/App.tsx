import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { ShowreelModal } from './components/ShowreelModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { HomePage } from './pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';

export function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [quoteInitialService, setQuoteInitialService] = useState<string | undefined>(undefined);

  const handleOpenQuote = (serviceName?: string) => {
    setQuoteInitialService(serviceName);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-studio-950 text-white selection:bg-electric selection:text-white">
      {/* Fixed Frosted Navbar */}
      <Navbar onOpenQuote={() => handleOpenQuote()} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onOpenQuote={handleOpenQuote}
              onShowreelClick={() => setIsShowreelOpen(true)}
            />
          }
        />
        <Route
          path="/gallery"
          element={<GalleryPage onOpenQuote={() => handleOpenQuote()} />}
        />
      </Routes>

      {/* Footer */}
      <Footer />

      {/* Interactive Global Modals */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialService={quoteInitialService}
      />

      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />

      {/* Floating Circular WhatsApp Contact Button */}
      <WhatsAppButton />
    </div>
  );
}

export default App;
