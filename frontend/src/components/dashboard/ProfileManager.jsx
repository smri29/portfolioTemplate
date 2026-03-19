import React, { useCallback, useEffect, useState } from 'react';
import { IdCard, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import API from '../../api/axios';

const SOCIAL_ICON_OPTIONS = [
  { value: 'website', label: 'Website' },
  { value: 'github', label: 'GitHub' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'kaggle', label: 'Kaggle' },
  { value: 'twitter', label: 'Twitter / X' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'dribbble', label: 'Dribbble' },
  { value: 'behance', label: 'Behance' },
];

const emptyState = {
  siteLabel: '',
  fullName: '',
  professionalTitle: '',
  logoImageUrl: '',
  heroImageUrl: '',
  aboutImageUrl: '',
  resumeUrl: '',
  resumeFileName: '',
  contactEmail: '',
  socialLinks: [],
  contactHeading: '',
  contactDescription: '',
  footerText: '',
  seoTitle: '',
  seoDescription: '',
};

const ProfileManager = () => {
  const [formData, setFormData] = useState(emptyState);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await API.get('/data/profile');
      setFormData({
        siteLabel: data?.siteLabel || '',
        fullName: data?.fullName || '',
        professionalTitle: data?.professionalTitle || '',
        logoImageUrl: data?.logoImageUrl || '',
        heroImageUrl: data?.heroImageUrl || '',
        aboutImageUrl: data?.aboutImageUrl || '',
        resumeUrl: data?.resumeUrl || '',
        resumeFileName: data?.resumeFileName || '',
        contactEmail: data?.contactEmail || '',
        socialLinks: Array.isArray(data?.socialLinks)
          ? data.socialLinks.map((link, index) => ({
              id: link._id || `${index}`,
              label: link.label || '',
              iconKey: link.iconKey || 'website',
              url: link.url || '',
            }))
          : [],
        contactHeading: data?.contactHeading || '',
        contactDescription: data?.contactDescription || '',
        footerText: data?.footerText || '',
        seoTitle: data?.seoTitle || '',
        seoDescription: data?.seoDescription || '',
      });
    } catch (error) {
      toast.error('Failed to load profile settings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await API.post('/data/profile', formData);
      toast.success('Profile settings updated');
      fetchProfile();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Save failed');
    }
  };

  const handleChange = (field) => (event) => {
    setFormData((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSocialLinkChange = (index, field, value) => {
    setFormData((current) => ({
      ...current,
      socialLinks: current.socialLinks.map((link, linkIndex) =>
        linkIndex === index ? { ...link, [field]: value } : link
      ),
    }));
  };

  const addSocialLink = () => {
    setFormData((current) => ({
      ...current,
      socialLinks: [
        ...current.socialLinks,
        {
          id: `${Date.now()}-${current.socialLinks.length}`,
          label: '',
          iconKey: 'website',
          url: '',
        },
      ],
    }));
  };

  const removeSocialLink = (index) => {
    setFormData((current) => ({
      ...current,
      socialLinks: current.socialLinks.filter((_, linkIndex) => linkIndex !== index),
    }));
  };

  return (
    <div>
      <div className="mb-7">
        <h2 className="inline-flex items-center gap-2 text-2xl font-semibold text-slate-100">
          <IdCard className="text-cyan-200" size={22} /> Profile Settings
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Control the reusable identity layer for this template: name, branding, images, resume, contact links, and SEO.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card border-white/10 p-6 md:p-7">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm">
            <span className="text-slate-300">Site Label</span>
            <input className="rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/60" value={formData.siteLabel} onChange={handleChange('siteLabel')} />
          </label>

          <label className="grid gap-2 text-sm">
            <span className="text-slate-300">Full Name</span>
            <input className="rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/60" value={formData.fullName} onChange={handleChange('fullName')} required />
          </label>

          <label className="md:col-span-2 grid gap-2 text-sm">
            <span className="text-slate-300">Professional Title</span>
            <input className="rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/60" value={formData.professionalTitle} onChange={handleChange('professionalTitle')} />
          </label>

          <label className="grid gap-2 text-sm">
            <span className="text-slate-300">Logo Image URL or Public Path</span>
            <input className="rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/60" value={formData.logoImageUrl} onChange={handleChange('logoImageUrl')} />
          </label>

          <label className="grid gap-2 text-sm">
            <span className="text-slate-300">Hero Image URL or Public Path</span>
            <input className="rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/60" value={formData.heroImageUrl} onChange={handleChange('heroImageUrl')} />
          </label>

          <label className="grid gap-2 text-sm">
            <span className="text-slate-300">About Image URL or Public Path</span>
            <input className="rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/60" value={formData.aboutImageUrl} onChange={handleChange('aboutImageUrl')} />
          </label>

          <label className="grid gap-2 text-sm">
            <span className="text-slate-300">Resume URL or Public Path</span>
            <input className="rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/60" value={formData.resumeUrl} onChange={handleChange('resumeUrl')} />
          </label>

          <label className="grid gap-2 text-sm">
            <span className="text-slate-300">Resume Download Name</span>
            <input className="rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/60" value={formData.resumeFileName} onChange={handleChange('resumeFileName')} />
          </label>

          <label className="grid gap-2 text-sm">
            <span className="text-slate-300">Contact Email</span>
            <input className="rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/60" value={formData.contactEmail} onChange={handleChange('contactEmail')} />
          </label>

          <div className="md:col-span-2 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-100">Social Links</p>
                <p className="text-xs text-slate-400">
                  These links control the icon buttons beside `Explore Projects` and the social icons in the contact section.
                </p>
              </div>
              <button
                type="button"
                onClick={addSocialLink}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:border-white/20 hover:bg-white/8"
              >
                <Plus size={14} />
                Add Link
              </button>
            </div>

            {formData.socialLinks.length === 0 ? (
              <p className="text-sm text-slate-500">No social links added yet.</p>
            ) : (
              <div className="grid gap-3">
                {formData.socialLinks.map((link, index) => (
                  <div key={link.id} className="grid gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-4 md:grid-cols-[1fr_1fr_1.2fr_auto]">
                    <label className="grid gap-2 text-sm">
                      <span className="text-slate-300">Label</span>
                      <input
                        className="rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/60"
                        value={link.label}
                        onChange={(event) => handleSocialLinkChange(index, 'label', event.target.value)}
                      />
                    </label>

                    <label className="grid gap-2 text-sm">
                      <span className="text-slate-300">Icon</span>
                      <select
                        className="rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/60"
                        value={link.iconKey}
                        onChange={(event) => handleSocialLinkChange(index, 'iconKey', event.target.value)}
                      >
                        {SOCIAL_ICON_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="grid gap-2 text-sm">
                      <span className="text-slate-300">URL</span>
                      <input
                        className="rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/60"
                        value={link.url}
                        onChange={(event) => handleSocialLinkChange(index, 'url', event.target.value)}
                      />
                    </label>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeSocialLink(index)}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-slate-900/50 text-slate-300 transition hover:border-red-400/35 hover:text-red-300"
                        aria-label="Remove social link"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <label className="grid gap-2 text-sm">
            <span className="text-slate-300">Contact Heading</span>
            <input className="rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/60" value={formData.contactHeading} onChange={handleChange('contactHeading')} />
          </label>

          <label className="md:col-span-2 grid gap-2 text-sm">
            <span className="text-slate-300">Contact Description</span>
            <textarea className="h-28 rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/60" value={formData.contactDescription} onChange={handleChange('contactDescription')} />
          </label>

          <label className="md:col-span-2 grid gap-2 text-sm">
            <span className="text-slate-300">Footer Text</span>
            <input className="rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/60" value={formData.footerText} onChange={handleChange('footerText')} />
          </label>

          <label className="md:col-span-2 grid gap-2 text-sm">
            <span className="text-slate-300">SEO Title</span>
            <input className="rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/60" value={formData.seoTitle} onChange={handleChange('seoTitle')} />
          </label>

          <label className="md:col-span-2 grid gap-2 text-sm">
            <span className="text-slate-300">SEO Description</span>
            <textarea className="h-24 rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/60" value={formData.seoDescription} onChange={handleChange('seoDescription')} />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl border border-cyan-300/40 bg-cyan-300 py-3 text-sm font-bold uppercase tracking-wide text-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Save Profile Settings
        </button>
      </form>
    </div>
  );
};

export default ProfileManager;
