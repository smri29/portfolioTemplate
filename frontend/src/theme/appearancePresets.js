export const APPEARANCE_PALETTES = [
  {
    key: 'olive-teal-glass',
    name: 'Olive Teal',
    description: 'Balanced olive-to-teal glass with a professional dark tone.',
    swatches: ['#4f685a', '#274247', '#1a2430'],
    variables: {
      '--bg-start-rgb': '20 25 21',
      '--bg-mid-rgb': '24 35 33',
      '--bg-end-rgb': '12 22 34',
      '--glow-primary-rgb': '120 155 132',
      '--glow-secondary-rgb': '88 154 166',
      '--accent-100-rgb': '235 252 245',
      '--accent-200-rgb': '193 237 224',
      '--accent-300-rgb': '123 212 194',
      '--accent-400-rgb': '88 168 158',
      '--secondary-100-rgb': '208 226 233',
      '--secondary-200-rgb': '151 184 196',
      '--secondary-300-rgb': '94 129 146',
      '--glass-surface-rgb': '14 21 23',
      '--glass-surface-strong-rgb': '10 15 18',
      '--zone-olive-start-rgb': '26 34 29',
      '--zone-olive-end-rgb': '28 45 41',
      '--zone-blue-start-rgb': '14 24 35',
      '--zone-blue-end-rgb': '8 15 24',
    },
  },
  {
    key: 'obsidian-teal-glass',
    name: 'Obsidian Teal',
    description: 'A darker obsidian palette with cooler teal highlights.',
    swatches: ['#29383b', '#1d2f35', '#0b131b'],
    variables: {
      '--bg-start-rgb': '8 12 14',
      '--bg-mid-rgb': '14 21 24',
      '--bg-end-rgb': '8 14 22',
      '--glow-primary-rgb': '84 133 131',
      '--glow-secondary-rgb': '78 166 181',
      '--accent-100-rgb': '231 248 247',
      '--accent-200-rgb': '184 228 226',
      '--accent-300-rgb': '110 204 200',
      '--accent-400-rgb': '73 153 155',
      '--secondary-100-rgb': '207 223 231',
      '--secondary-200-rgb': '152 178 194',
      '--secondary-300-rgb': '92 121 141',
      '--glass-surface-rgb': '9 14 16',
      '--glass-surface-strong-rgb': '6 10 12',
      '--zone-olive-start-rgb': '14 20 21',
      '--zone-olive-end-rgb': '17 29 31',
      '--zone-blue-start-rgb': '10 20 28',
      '--zone-blue-end-rgb': '7 12 19',
    },
  },
  {
    key: 'graphite-frost-glass',
    name: 'Graphite Frost',
    description: 'Neutral graphite glass with silver-frost accents.',
    swatches: ['#41464d', '#2f3840', '#151a20'],
    variables: {
      '--bg-start-rgb': '12 14 18',
      '--bg-mid-rgb': '18 21 27',
      '--bg-end-rgb': '12 17 23',
      '--glow-primary-rgb': '155 162 173',
      '--glow-secondary-rgb': '130 157 176',
      '--accent-100-rgb': '247 248 250',
      '--accent-200-rgb': '220 226 233',
      '--accent-300-rgb': '171 185 198',
      '--accent-400-rgb': '121 138 153',
      '--secondary-100-rgb': '204 218 228',
      '--secondary-200-rgb': '157 175 189',
      '--secondary-300-rgb': '103 118 132',
      '--glass-surface-rgb': '14 17 21',
      '--glass-surface-strong-rgb': '10 12 15',
      '--zone-olive-start-rgb': '22 24 29',
      '--zone-olive-end-rgb': '31 36 42',
      '--zone-blue-start-rgb': '14 19 25',
      '--zone-blue-end-rgb': '9 13 18',
    },
  },
  {
    key: 'midnight-cobalt-glass',
    name: 'Midnight Cobalt',
    description: 'Dark midnight surfaces with restrained cobalt-blue glass.',
    swatches: ['#243751', '#1d2d44', '#0c1726'],
    variables: {
      '--bg-start-rgb': '8 12 20',
      '--bg-mid-rgb': '14 20 32',
      '--bg-end-rgb': '8 14 24',
      '--glow-primary-rgb': '84 116 166',
      '--glow-secondary-rgb': '95 174 191',
      '--accent-100-rgb': '240 247 255',
      '--accent-200-rgb': '192 220 245',
      '--accent-300-rgb': '126 182 224',
      '--accent-400-rgb': '88 138 185',
      '--secondary-100-rgb': '211 227 240',
      '--secondary-200-rgb': '155 186 211',
      '--secondary-300-rgb': '101 131 158',
      '--glass-surface-rgb': '10 15 24',
      '--glass-surface-strong-rgb': '7 11 17',
      '--zone-olive-start-rgb': '12 19 31',
      '--zone-olive-end-rgb': '19 31 48',
      '--zone-blue-start-rgb': '10 18 31',
      '--zone-blue-end-rgb': '7 12 20',
    },
  },
  {
    key: 'smoke-olive-glass',
    name: 'Smoke Olive',
    description: 'Muted smoky olive glass with a softer teal finish.',
    swatches: ['#586554', '#39463f', '#152128'],
    variables: {
      '--bg-start-rgb': '18 21 18',
      '--bg-mid-rgb': '22 28 24',
      '--bg-end-rgb': '10 18 26',
      '--glow-primary-rgb': '142 159 124',
      '--glow-secondary-rgb': '88 143 151',
      '--accent-100-rgb': '245 249 239',
      '--accent-200-rgb': '218 232 205',
      '--accent-300-rgb': '173 205 166',
      '--accent-400-rgb': '124 157 127',
      '--secondary-100-rgb': '209 227 226',
      '--secondary-200-rgb': '150 184 182',
      '--secondary-300-rgb': '95 129 132',
      '--glass-surface-rgb': '14 18 17',
      '--glass-surface-strong-rgb': '10 13 12',
      '--zone-olive-start-rgb': '26 31 24',
      '--zone-olive-end-rgb': '31 41 34',
      '--zone-blue-start-rgb': '11 20 28',
      '--zone-blue-end-rgb': '8 14 22',
    },
  },
];

export const MOTION_PRESETS = [
  {
    key: 'cinematic',
    name: 'Cinematic',
    description: 'Slower reveals, richer drift, and more noticeable motion.',
    multiplier: 1.25,
    css: {
      '--motion-duration-fast': '320ms',
      '--motion-duration-base': '420ms',
      '--motion-duration-slow': '760ms',
      '--motion-drift-duration-primary': '24s',
      '--motion-drift-duration-secondary': '29s',
      '--motion-float-duration': '7.8s',
      '--motion-sheen-duration': '880ms',
    },
  },
  {
    key: 'balanced',
    name: 'Balanced',
    description: 'Professional default with subtle motion throughout the site.',
    multiplier: 1,
    css: {
      '--motion-duration-fast': '240ms',
      '--motion-duration-base': '320ms',
      '--motion-duration-slow': '620ms',
      '--motion-drift-duration-primary': '18s',
      '--motion-drift-duration-secondary': '22s',
      '--motion-float-duration': '6.5s',
      '--motion-sheen-duration': '700ms',
    },
  },
  {
    key: 'subtle',
    name: 'Subtle',
    description: 'Faster and lighter motion with less movement distance.',
    multiplier: 0.82,
    css: {
      '--motion-duration-fast': '190ms',
      '--motion-duration-base': '260ms',
      '--motion-duration-slow': '500ms',
      '--motion-drift-duration-primary': '14s',
      '--motion-drift-duration-secondary': '17s',
      '--motion-float-duration': '5.2s',
      '--motion-sheen-duration': '540ms',
    },
  },
  {
    key: 'minimal',
    name: 'Minimal',
    description: 'Almost static, with only restrained fades and light feedback.',
    multiplier: 0.62,
    css: {
      '--motion-duration-fast': '150ms',
      '--motion-duration-base': '210ms',
      '--motion-duration-slow': '360ms',
      '--motion-drift-duration-primary': '12s',
      '--motion-drift-duration-secondary': '14s',
      '--motion-float-duration': '4.4s',
      '--motion-sheen-duration': '420ms',
    },
  },
  {
    key: 'none',
    name: 'None',
    description: 'Disables decorative motion for a near-static experience.',
    multiplier: 0,
    css: {
      '--motion-duration-fast': '0ms',
      '--motion-duration-base': '0ms',
      '--motion-duration-slow': '0ms',
      '--motion-drift-duration-primary': '0s',
      '--motion-drift-duration-secondary': '0s',
      '--motion-float-duration': '0s',
      '--motion-sheen-duration': '0ms',
    },
  },
];

export const DEFAULT_APPEARANCE_SETTINGS = {
  paletteKey: 'olive-teal-glass',
  motionPreset: 'balanced',
};

export const getPaletteByKey = (key) =>
  APPEARANCE_PALETTES.find((palette) => palette.key === key) || APPEARANCE_PALETTES[0];

export const getMotionPresetByKey = (key) =>
  MOTION_PRESETS.find((preset) => preset.key === key) || MOTION_PRESETS[1];

export const applyAppearanceToDocument = (appearanceSettings) => {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  const palette = getPaletteByKey(appearanceSettings?.paletteKey);
  const motion = getMotionPresetByKey(appearanceSettings?.motionPreset);

  Object.entries(palette.variables).forEach(([variable, value]) => {
    root.style.setProperty(variable, value);
  });

  Object.entries(motion.css).forEach(([variable, value]) => {
    root.style.setProperty(variable, value);
  });

  root.dataset.palette = palette.key;
  root.dataset.motion = motion.key;
};

export const getMotionMultiplier = (motionPreset) => getMotionPresetByKey(motionPreset).multiplier;

export const scaleMotionDuration = (baseDuration, motionPreset, minDuration = 0.12) => {
  const multiplier = getMotionMultiplier(motionPreset);
  if (multiplier === 0) {
    return 0;
  }

  return Number(Math.max(baseDuration * multiplier, minDuration).toFixed(3));
};
