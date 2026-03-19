import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Download, Menu, X } from 'lucide-react';
import { useSiteContext } from '../context/useSiteContext';
import { buildTransition } from '../theme/motion';

const MotionDiv = motion.div;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { siteProfile, appearanceSettings } = useSiteContext();
  const motionPreset = appearanceSettings.motionPreset;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = useMemo(
    () => [
      { name: 'About', to: 'about' },
      { name: 'Experience', to: 'experience' },
      { name: 'Projects', to: 'projects' },
      { name: 'Research', to: 'research' },
      { name: 'Skills', to: 'skills' },
      { name: 'Certifications', to: 'certifications' },
      { name: 'Hobbies', to: 'hobbies' },
      { name: 'Contact', to: 'contact' },
    ],
    []
  );

  const hasResume = Boolean(siteProfile.resumeUrl);
  const resumeIsExternal = /^https?:\/\//i.test(siteProfile.resumeUrl || '');

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-white/10 bg-black/72 py-3 backdrop-blur-xl'
          : 'border-transparent bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <button
          className="group inline-flex items-center gap-3 text-left"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          type="button"
          aria-label="Scroll to top"
        >
          <img
            src={siteProfile.logoImageUrl || '/template-mark.svg'}
            alt={`${siteProfile.fullName} mark`}
            className="h-8 w-8 rounded-xl border border-white/15 bg-white/5 p-1 object-cover"
          />
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">{siteProfile.siteLabel}</p>
            <p className="font-serif text-lg text-slate-100 group-hover:text-white">{siteProfile.fullName}</p>
          </div>
        </button>

        <div className="hidden items-center gap-1 rounded-[22px] border border-white/10 bg-black/35 px-2 py-2 backdrop-blur-xl xl:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              spy
              offset={-80}
              className="cursor-pointer rounded-[16px] px-3 py-1.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/8 hover:text-white"
              activeClass="text-white"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {hasResume && (
            <a
              href={siteProfile.resumeUrl}
              target={resumeIsExternal ? '_blank' : undefined}
              rel={resumeIsExternal ? 'noreferrer' : undefined}
              download={resumeIsExternal ? undefined : siteProfile.resumeFileName || true}
              className="hidden items-center gap-2 rounded-full border border-white/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-black transition hover:-translate-y-0.5 hover:bg-slate-200 md:inline-flex"
            >
              <Download size={14} />
              Resume
            </a>
          )}

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black/35 text-slate-200 transition hover:border-white/30 hover:text-white xl:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            type="button"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={buildTransition(motionPreset, 0.18)}
            className="border-t border-white/10 bg-black/90 px-6 py-5 backdrop-blur-xl xl:hidden"
          >
            <div className="grid gap-4">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth
                  offset={-74}
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer rounded-xl border border-transparent px-3 py-2 text-slate-200 transition hover:border-white/10 hover:bg-white/5 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
