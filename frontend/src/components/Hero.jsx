import React, { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import {
  ArrowDown,
  Dribbble,
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  MonitorPlay,
  Sparkles,
  Twitter,
} from 'lucide-react';
import API from '../api/axios';
import { useSiteContext } from '../context/useSiteContext';
import { buildTransition } from '../theme/motion';

const MotionSection = motion.section;
const MotionDiv = motion.div;

const FALLBACK_HERO = {
  availabilityText: 'Open to relevant opportunities',
  roleTitles: ['Your Title', 'Your Specialty', 'Your Focus Area'],
  summary:
    'Write a short, high-signal summary about what you build, what you specialize in, and the type of work or impact you want visitors to remember.',
};

const SOCIAL_ICON_MAP = {
  website: Globe,
  github: Github,
  linkedin: Linkedin,
  kaggle: Sparkles,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  youtube: MonitorPlay,
  dribbble: Dribbble,
  behance: Dribbble,
};

const Hero = () => {
  const [content, setContent] = useState(FALLBACK_HERO);
  const { siteProfile, appearanceSettings } = useSiteContext();
  const motionPreset = appearanceSettings.motionPreset;

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const { data } = await API.get('/data/hero');
        setContent({
          availabilityText: data?.availabilityText || FALLBACK_HERO.availabilityText,
          roleTitles:
            Array.isArray(data?.roleTitles) && data.roleTitles.length > 0
              ? data.roleTitles
              : FALLBACK_HERO.roleTitles,
          summary: data?.summary || FALLBACK_HERO.summary,
        });
      } catch (error) {
        console.error('Failed to load hero content', error);
      }
    };

    fetchHeroContent();
  }, []);

  const nameParts = String(siteProfile.fullName || 'Your Name')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const accentName = nameParts.length > 1 ? nameParts.pop() : nameParts[0] || 'Name';
  const primaryName = nameParts.length > 0 ? nameParts.join(' ') : '';

  return (
    <MotionSection
      id="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={buildTransition(motionPreset, 0.6)}
      className="zone-olive relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-16 pt-24 md:px-8"
    >
      <div className="pointer-events-none absolute inset-0 subtle-grid opacity-20" />
      <div className="pointer-events-none absolute left-[8%] top-[16%] h-32 w-32 rounded-full border border-white/10 bg-white/6 blur-2xl" />
      <div className="pointer-events-none absolute bottom-[12%] right-[10%] h-28 w-28 rounded-full border border-white/8 bg-white/5 blur-2xl" />
      <MotionDiv
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={buildTransition(motionPreset, 0.8)}
        className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center"
      >
        <div>
          <MotionDiv
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={buildTransition(motionPreset, 0.45, { delay: 0.08 })}
            className="section-kicker mb-5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" />
            {content.availabilityText}
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={buildTransition(motionPreset, 0.55, { delay: 0.15 })}
          >
            <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-slate-100 sm:text-6xl md:text-7xl">
              {primaryName || siteProfile.fullName}
              <span className="block bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                {accentName}
              </span>
            </h1>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={buildTransition(motionPreset, 0.55, { delay: 0.22 })}
          >
            <p className="mt-6 h-8 text-base text-slate-300 md:text-xl">
              <Typewriter
                words={content.roleTitles}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={54}
                deleteSpeed={30}
                delaySpeed={1800}
              />
            </p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={buildTransition(motionPreset, 0.55, { delay: 0.3 })}
          >
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
              {content.summary}
            </p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={buildTransition(motionPreset, 0.55, { delay: 0.38 })}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              to="projects"
              smooth
              offset={-72}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-black shadow-[0_16px_38px_rgba(255,255,255,0.08)] transition hover:scale-[1.02] hover:bg-slate-200"
            >
              Explore Projects
              <ArrowDown size={14} />
            </Link>

            {siteProfile.socialLinks?.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                {siteProfile.socialLinks.map((link, index) => {
                  const Icon = SOCIAL_ICON_MAP[link.iconKey] || Globe;

                  return (
                    <a
                      key={link._id || `${link.label}-${index}`}
                      href={link.url}
                      target={link.iconKey === 'mail' ? undefined : '_blank'}
                      rel={link.iconKey === 'mail' ? undefined : 'noreferrer'}
                      className="rounded-full border border-white/12 bg-white/5 p-2.5 text-slate-300 transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/8 hover:text-white"
                      title={link.label || link.iconKey}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            )}
          </MotionDiv>
        </div>

        <MotionDiv
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={buildTransition(motionPreset, 0.8, { delay: 0.15 })}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="pointer-events-none absolute -inset-3 rounded-[38px] border border-white/10" />
          <div className="pointer-events-none absolute -right-4 top-6 h-[92%] w-[92%] rounded-[34px] border border-white/8" />
          <div className="glass-card card-sheen animate-float overflow-hidden border-white/10 p-3">
            <img
              src={siteProfile.heroImageUrl || '/template-hero.svg'}
              alt={siteProfile.fullName}
              className="aspect-[4/5] w-full rounded-xl object-cover"
              loading="eager"
            />
          </div>
        </MotionDiv>
      </MotionDiv>
    </MotionSection>
  );
};

export default Hero;
