import React, { createContext, useContext, useState, useEffect } from 'react';
import type { DynamicSiteContent } from './types';
import { staticFailsafeContent, fetchSiteContent } from './sanityService';

interface SiteContentContextValue {
  content: DynamicSiteContent;
  isLoading: boolean;
  isFromSanity: boolean;
  refreshContent: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextValue>({
  content: staticFailsafeContent,
  isLoading: false,
  isFromSanity: false,
  refreshContent: async () => {},
});

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start immediately with static baseline data so initial paint is instantaneous
  const [content, setContent] = useState<DynamicSiteContent>(staticFailsafeContent);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const dynamicData = await fetchSiteContent();
      setContent(dynamicData);
    } catch {
      // Keep existing static failsafe on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchSiteContent()
      .then((dynamicData) => {
        if (isMounted) {
          setContent(dynamicData);
        }
      })
      .catch(() => {
        // Keep existing static failsafe on error
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SiteContentContext.Provider
      value={{
        content,
        isLoading,
        isFromSanity: content.isFromSanity,
        refreshContent: loadData,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export function useSiteContent(): SiteContentContextValue {
  return useContext(SiteContentContext);
}
