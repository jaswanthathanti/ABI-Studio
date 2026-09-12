import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollManager: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      
      const scrollToTarget = () => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return true;
        }
        return false;
      };

      // Try immediately
      if (!scrollToTarget()) {
        // If element is not rendered yet, retry with small staggered delays
        const timer1 = setTimeout(scrollToTarget, 80);
        const timer2 = setTimeout(scrollToTarget, 250);
        const timer3 = setTimeout(scrollToTarget, 500);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
          clearTimeout(timer3);
        };
      }
    } else {
      // Normal route change without hash -> smoothly scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  return null;
};
