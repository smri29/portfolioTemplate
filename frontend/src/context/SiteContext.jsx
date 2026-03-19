import React, { useEffect, useMemo, useState } from 'react';
import API from '../api/axios';
import { DEFAULT_AI_PUBLIC, DEFAULT_SITE_PROFILE } from './siteDefaults';
import SiteContext from './siteContext';

export const SiteProvider = ({ children }) => {
  const [siteProfile, setSiteProfile] = useState(DEFAULT_SITE_PROFILE);
  const [assistantConfig, setAssistantConfig] = useState(DEFAULT_AI_PUBLIC);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchSiteData = async () => {
      try {
        const [profileRes, aiRes] = await Promise.all([
          API.get('/data/profile'),
          API.get('/data/ai-public'),
        ]);

        if (!isMounted) {
          return;
        }

        setSiteProfile((current) => ({ ...current, ...(profileRes.data || {}) }));
        setAssistantConfig((current) => ({ ...current, ...(aiRes.data || {}) }));
      } catch (error) {
        console.error('Failed to load reusable site settings', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSiteData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    document.title = siteProfile.seoTitle || DEFAULT_SITE_PROFILE.seoTitle;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute(
        'content',
        siteProfile.seoDescription || DEFAULT_SITE_PROFILE.seoDescription
      );
    }
  }, [siteProfile.seoDescription, siteProfile.seoTitle]);

  const value = useMemo(
    () => ({ siteProfile, assistantConfig, loading }),
    [assistantConfig, loading, siteProfile]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};
