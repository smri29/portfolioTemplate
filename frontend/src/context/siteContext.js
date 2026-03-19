import { createContext } from 'react';
import { DEFAULT_AI_PUBLIC, DEFAULT_APPEARANCE_SETTINGS, DEFAULT_SITE_PROFILE } from './siteDefaults';

const SiteContext = createContext({
  siteProfile: DEFAULT_SITE_PROFILE,
  assistantConfig: DEFAULT_AI_PUBLIC,
  appearanceSettings: DEFAULT_APPEARANCE_SETTINGS,
  setAppearanceSettings: () => {},
  loading: true,
});

export default SiteContext;
