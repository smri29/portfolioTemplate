import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  BookOpen,
  BookOpenText,
  Briefcase,
  Cpu,
  GraduationCap,
  Heart,
  Sparkles,
} from 'lucide-react';
import API from '../api/axios';
import { useSiteContext } from '../context/useSiteContext';
import { buildTransition } from '../theme/motion';

const MotionSection = motion.section;
const MotionDiv = motion.div;

const ICON_MAP = {
  education: GraduationCap,
  research: BookOpen,
  leadership: Briefcase,
  skills: Cpu,
  interests: Heart,
  highlight: Sparkles,
};

const FALLBACK_ABOUT = {
  introLabel: 'Introduction',
  headingPrimary: 'Build a compelling',
  headingAccent: 'professional story.',
  description:
    'Use this section to explain your focus, strengths, and the kind of impact you create. Keep it clear, specific, and written in your own voice.',
  highlights: [
    { title: 'Education', detail: 'Add your degree, institution, or academic focus.', iconKey: 'education' },
    { title: 'Research', detail: 'Highlight publications, applied work, or subject expertise.', iconKey: 'research' },
    { title: 'Leadership', detail: 'Showcase leadership, ownership, or community building.', iconKey: 'leadership' },
  ],
};

const About = () => {
  const [content, setContent] = useState(FALLBACK_ABOUT);
  const { siteProfile, appearanceSettings } = useSiteContext();
  const motionPreset = appearanceSettings.motionPreset;

  useEffect(() => {
    const fetchIntroduction = async () => {
      try {
        const { data } = await API.get('/data/introduction');
        setContent({
          introLabel: data?.introLabel || FALLBACK_ABOUT.introLabel,
          headingPrimary: data?.headingPrimary || FALLBACK_ABOUT.headingPrimary,
          headingAccent: data?.headingAccent || FALLBACK_ABOUT.headingAccent,
          description: data?.description || FALLBACK_ABOUT.description,
          highlights: Array.isArray(data?.highlights) && data.highlights.length > 0
            ? data.highlights
            : FALLBACK_ABOUT.highlights,
        });
      } catch (error) {
        console.error('Failed to load introduction content', error);
      }
    };

    fetchIntroduction();
  }, []);

  const highlights = useMemo(
    () =>
      (Array.isArray(content.highlights) ? content.highlights : []).filter(
        (item) => item?.title || item?.detail
      ),
    [content.highlights]
  );

  return (
    <MotionSection
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      className="section-shell zone-olive px-6 py-24 md:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <MotionDiv
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={buildTransition(motionPreset, 0.6)}
            className="relative"
          >
            <div className="glass-card card-sheen overflow-hidden border-white/10 p-3">
              <img
                src={siteProfile.aboutImageUrl || '/template-about.svg'}
                alt={`${siteProfile.fullName} portrait`}
                className="aspect-[4/5] w-full rounded-xl object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -right-5 top-10 hidden h-40 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent lg:block" />
            <div className="pointer-events-none absolute -left-3 bottom-12 hidden h-24 w-24 rounded-full border border-white/8 bg-white/5 blur-xl lg:block" />
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={buildTransition(motionPreset, 0.6, { delay: 0.1 })}
          >
            <p className="section-kicker mb-3">
              {content.introLabel || 'Introduction'}
            </p>
            <h2 className="section-title font-serif text-4xl md:text-5xl">
              {content.headingPrimary}
              {content.headingAccent && <span className="block text-slate-300">{content.headingAccent}</span>}
            </h2>

            <p className="mt-6 text-sm leading-relaxed text-slate-300 md:text-base">{content.description}</p>

            {highlights.length > 0 && (
              <div className="mt-8 grid gap-3">
                {highlights.map((item, index) => {
                  const Icon = ICON_MAP[item.iconKey] || BookOpenText;

                  return (
                    <MotionDiv
                      key={item._id || `${item.title}-${index}`}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={buildTransition(motionPreset, 0.35, { delay: index * 0.06 })}
                      className="glass-card card-sheen flex items-center gap-3 border-white/10 p-4 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.03]"
                    >
                      <div className="rounded-lg border border-white/12 bg-white/5 p-2 text-slate-100">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-100">{item.title}</h3>
                        <p className="text-xs text-slate-400">{item.detail}</p>
                      </div>
                    </MotionDiv>
                  );
                })}
              </div>
            )}
          </MotionDiv>
        </div>
      </div>
    </MotionSection>
  );
};

export default About;
