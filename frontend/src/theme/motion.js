import { scaleMotionDuration } from './appearancePresets';

export const buildTransition = (
  motionPreset,
  baseDuration,
  extra = {}
) => ({
  duration: scaleMotionDuration(baseDuration, motionPreset),
  ease: 'easeOut',
  ...extra,
});

export const buildFadeUpVariant = (motionPreset, distance = 18, duration = 0.45) => ({
  hidden: { opacity: 0, y: distance },
  visible: { opacity: 1, y: 0, transition: buildTransition(motionPreset, duration) },
});

export const buildFadeInVariant = (motionPreset, duration = 0.4) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: buildTransition(motionPreset, duration) },
});

export const buildStaggerVariant = (
  motionPreset,
  {
    distance = 16,
    duration = 0.45,
    childStagger = 0.05,
  } = {}
) => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...buildTransition(motionPreset, duration),
      staggerChildren: scaleMotionDuration(childStagger, motionPreset, 0.01),
    },
  },
});

export const buildExitTransition = (motionPreset, duration = 0.2) => ({
  opacity: 0,
  y: -10,
  transition: buildTransition(motionPreset, duration),
});

export const getHoverScale = (motionPreset, normal = 1.04) => {
  if (motionPreset === 'none') {
    return 1;
  }

  if (motionPreset === 'minimal') {
    return 1.01;
  }

  if (motionPreset === 'subtle') {
    return 1.02;
  }

  return normal;
};

export const getTapScale = (motionPreset, normal = 0.97) => {
  if (motionPreset === 'none') {
    return 1;
  }

  if (motionPreset === 'minimal') {
    return 0.99;
  }

  if (motionPreset === 'subtle') {
    return 0.985;
  }

  return normal;
};
