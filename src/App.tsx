import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { ShowreelModal } from './components/ShowreelModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { HomePage } from './pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';
import { QuotePage } from './pages/QuotePage';

export function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [quoteInitialService, setQuoteInitialService] = useState<string | undefined>(undefined);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isQuotePage = location.pathname === '/quote';

  const handleOpenQuote = (serviceName?: string) => {
    setQuoteInitialService(serviceName);
    setIsQuoteOpen(true);
  };

  useEffect(() => {
    if (searchParams.get('quote') === 'true') {
      const service = searchParams.get('service') || undefined;
      handleOpenQuote(service);
      searchParams.delete('quote');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="min-h-screen bg-studio-950 text-white selection:bg-electric selection:text-white">
      {/* Fixed Frosted Navbar (hidden on standalone quote page) */}
      {!isQuotePage && <Navbar onOpenQuote={() => handleOpenQuote()} />}

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
        <Route path="/quote" element={<QuotePage />} />
      </Routes>

      {/* Footer (hidden on standalone quote page) */}
      {!isQuotePage && <Footer />}

      {/* Interactive Global Modals */}
      {isQuoteOpen && (
        <QuoteModal
          isOpen={isQuoteOpen}
          onClose={() => setIsQuoteOpen(false)}
          initialService={quoteInitialService}
        />
      )}

      {isShowreelOpen && (
        <ShowreelModal
          isOpen={isShowreelOpen}
          onClose={() => setIsShowreelOpen(false)}
        />
      )}

      {/* Floating Circular WhatsApp Contact Button */}
      <WhatsAppButton />
    </div>
  );
}

export default App;
