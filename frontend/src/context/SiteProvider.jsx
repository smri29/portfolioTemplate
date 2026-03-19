import React, { useEffect, useMemo, useState } from 'react';
import API from '../api/axios';
import { DEFAULT_AI_PUBLIC, DEFAULT_APPEARANCE_SETTINGS, DEFAULT_SITE_PROFILE } from './siteDefaults';
import SiteContext from './siteContext';
import { applyAppearanceToDocument } from '../theme/appearancePresets';

export const SiteProvider = ({ children }) => {
  const [siteProfile, setSiteProfile] = useState(DEFAULT_SITE_PROFILE);
  const [assistantConfig, setAssistantConfig] = useState(DEFAULT_AI_PUBLIC);
  const [appearanceSettings, setAppearanceSettings] = useState(DEFAULT_APPEARANCE_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchSiteData = async () => {
      try {
        const [profileRes, aiRes, appearanceRes] = await Promise.all([
          API.get('/data/profile'),
          API.get('/data/ai-public'),
          API.get('/data/appearance'),
        ]);

        if (!isMounted) {
          return;
        }

        setSiteProfile((current) => ({ ...current, ...(profileRes.data || {}) }));
        setAssistantConfig((current) => ({ ...current, ...(aiRes.data || {}) }));
        setAppearanceSettings((current) => ({ ...current, ...(appearanceRes.data || {}) }));
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

  useEffect(() => {
    applyAppearanceToDocument(appearanceSettings);
  }, [appearanceSettings]);

  const value = useMemo(
    () => ({ siteProfile, assistantConfig, appearanceSettings, setAppearanceSettings, loading }),
    [appearanceSettings, assistantConfig, loading, siteProfile]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};
