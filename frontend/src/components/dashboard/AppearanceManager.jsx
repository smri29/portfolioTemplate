import React, { useCallback, useEffect, useState } from 'react';
import { Palette, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';
import API from '../../api/axios';
import { useSiteContext } from '../../context/useSiteContext';
import {
  APPEARANCE_PALETTES,
  DEFAULT_APPEARANCE_SETTINGS,
  MOTION_PRESETS,
} from '../../theme/appearancePresets';

const AppearanceManager = () => {
  const { setAppearanceSettings } = useSiteContext();
  const [formData, setFormData] = useState(DEFAULT_APPEARANCE_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchAppearance = useCallback(async () => {
    try {
      const { data } = await API.get('/data/appearance');
      const next = {
        paletteKey: data?.paletteKey || DEFAULT_APPEARANCE_SETTINGS.paletteKey,
        motionPreset: data?.motionPreset || DEFAULT_APPEARANCE_SETTINGS.motionPreset,
      };
      setFormData(next);
      setAppearanceSettings(next);
    } catch (error) {
      toast.error('Failed to load appearance settings');
    } finally {
      setLoading(false);
    }
  }, [setAppearanceSettings]);

  useEffect(() => {
    fetchAppearance();
  }, [fetchAppearance]);

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const { data } = await API.post('/data/appearance', formData);
      const next = {
        paletteKey: data?.paletteKey || formData.paletteKey,
        motionPreset: data?.motionPreset || formData.motionPreset,
      };
      setFormData(next);
      setAppearanceSettings(next);
      toast.success('Appearance settings updated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not save appearance settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-7">
        <h2 className="inline-flex items-center gap-2 text-2xl font-semibold text-slate-100">
          <Palette className="text-cyan-200" size={22} /> Appearance Studio
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Choose the glassmorphism color combination and motion style for the full template.
        </p>
      </div>

      <form onSubmit={handleSave} className="glass-card border-white/10 p-6 md:p-7">
        <div className="grid gap-8">
          <section className="grid gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-100">Color Combination</h3>
              <p className="mt-1 text-sm text-slate-400">
                Every option keeps the same polished glass feel, with different dark professional tones.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {APPEARANCE_PALETTES.map((palette) => {
                const isActive = formData.paletteKey === palette.key;

                return (
                  <button
                    key={palette.key}
                    type="button"
                    onClick={() => setFormData((current) => ({ ...current, paletteKey: palette.key }))}
                    className={`rounded-[24px] border p-4 text-left transition ${
                      isActive
                        ? 'border-cyan-300/40 bg-cyan-300/10 shadow-[0_18px_40px_rgba(56,189,248,0.12)]'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="mb-4 flex gap-2">
                      {palette.swatches.map((swatch) => (
                        <span
                          key={swatch}
                          className="h-10 flex-1 rounded-2xl border border-white/10"
                          style={{ background: swatch }}
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-100">{palette.name}</p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-400">{palette.description}</p>
                      </div>
                      {isActive && (
                        <span className="rounded-full border border-cyan-300/30 bg-cyan-300/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-100">
                          Active
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="grid gap-4">
            <div>
              <h3 className="inline-flex items-center gap-2 text-lg font-semibold text-slate-100">
                <Sparkles className="text-cyan-200" size={18} /> Animation Control
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Pick how animated or restrained the template should feel across reveals, hover feedback, and glass effects.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {MOTION_PRESETS.map((preset) => {
                const isActive = formData.motionPreset === preset.key;

                return (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => setFormData((current) => ({ ...current, motionPreset: preset.key }))}
                    className={`rounded-[22px] border p-4 text-left transition ${
                      isActive
                        ? 'border-cyan-300/40 bg-cyan-300/10'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-100">{preset.name}</p>
                      {isActive && (
                        <span className="rounded-full border border-cyan-300/30 bg-cyan-300/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-100">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed text-slate-400">{preset.description}</p>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <button
          type="submit"
          disabled={loading || saving}
          className="mt-8 w-full rounded-xl border border-cyan-300/40 bg-cyan-300 py-3 text-sm font-bold uppercase tracking-wide text-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {saving ? 'Saving Appearance...' : 'Save Appearance'}
        </button>
      </form>
    </div>
  );
};

export default AppearanceManager;
