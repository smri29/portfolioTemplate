import React, { useEffect, useMemo, useRef, useState } from 'react';
import API from '../api/axios';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Loader2, MessageSquare, Send, Sparkles, X } from 'lucide-react';
import { useSiteContext } from '../context/useSiteContext';
import { buildTransition, getHoverScale, getTapScale } from '../theme/motion';

const MotionButton = motion.button;
const MotionDiv = motion.div;
const MAX_HISTORY_FOR_API = 8;

const QUICK_PROMPTS = [
  'What roles is this person currently targeting?',
  'Summarize this profile for a recruiter in 4 lines.',
  'List the strongest technical projects.',
  'Highlight the strongest research or technical work.',
  'How can I get in touch?',
];

const cleanAssistantText = (text) => {
  if (!text) return '';

  return String(text)
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '- ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { siteProfile, assistantConfig, appearanceSettings } = useSiteContext();
  const motionPreset = appearanceSettings.motionPreset;
  const subjectLabel = siteProfile.fullName || 'this profile';
  const initialMessage = useMemo(
    () => ({
      role: 'ai',
      text: `Hi, I'm ${assistantConfig.assistantName}, ${assistantConfig.assistantSubtitle}. Ask anything about ${subjectLabel}.`,
    }),
    [assistantConfig.assistantName, assistantConfig.assistantSubtitle, subjectLabel]
  );
  const [messages, setMessages] = useState([initialMessage]);

  const messagesEndRef = useRef(null);

  const visibleQuickPrompts = useMemo(() => QUICK_PROMPTS.slice(0, 4), []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  useEffect(() => {
    setMessages([initialMessage]);
  }, [initialMessage]);

  const sendPrompt = async (rawPrompt) => {
    const prompt = rawPrompt.trim();
    if (!prompt || loading) {
      return;
    }

    const userMessage = { role: 'user', text: prompt };
    const nextMessages = [...messages, userMessage];
    const history = nextMessages.slice(-MAX_HISTORY_FOR_API).map((item) => ({
      role: item.role,
      text: item.text,
    }));

    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const { data } = await API.post('/data/chat', { prompt, history });
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: cleanAssistantText(data.reply) || 'No response available yet.' },
      ]);
    } catch (error) {
      const fallback = error.response?.data?.reply || 'The assistant is unavailable right now. Please try again.';
      setMessages((prev) => [...prev, { role: 'ai', text: fallback }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendPrompt(input);
  };

  const handleQuickPrompt = async (prompt) => {
    setIsOpen(true);
    await sendPrompt(prompt);
  };

  return (
    <div className="pointer-events-auto fixed bottom-5 right-5 z-[9999] flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={buildTransition(motionPreset, 0.24)}
            className="mb-3 flex h-[520px] w-[330px] flex-col overflow-hidden rounded-[28px] border border-white/12 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_rgba(16,16,18,0.97)_36%,_rgba(7,8,10,0.99)_100%)] shadow-[0_20px_66px_rgba(0,0,0,0.52)] md:w-[390px]"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-white/10 via-white/4 to-transparent px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="rounded-lg border border-white/12 bg-white/6 p-2 text-slate-100">
                  <Bot size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-100">{assistantConfig.assistantName}</p>
                  <p className="text-[11px] text-slate-400">{assistantConfig.assistantSubtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 transition hover:text-slate-100"
                type="button"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            <div className="border-b border-white/10 bg-slate-900/35 px-3 py-2 backdrop-blur-sm">
              <div className="flex flex-wrap gap-2">
                {visibleQuickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleQuickPrompt(prompt)}
                    disabled={loading}
                    className="rounded-full border border-white/10 bg-black/35 px-2.5 py-1 text-[11px] text-slate-300 transition hover:border-white/20 hover:bg-white/6 hover:text-white disabled:opacity-60"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-[linear-gradient(180deg,rgba(8,14,24,0.1),rgba(6,11,20,0.34))] p-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'rounded-tr-sm bg-white text-black'
                        : 'rounded-tl-sm border border-white/10 bg-black/45 text-slate-200 backdrop-blur-sm'
                    }`}
                  >
                    {message.role === 'ai' && (
                      <span className="mb-1 inline-flex items-center gap-1 text-[10px] uppercase tracking-wide text-slate-400">
                        <Sparkles size={10} /> {assistantConfig.assistantName}
                      </span>
                    )}
                    <p className="whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-xs text-slate-300">
                  <Loader2 size={12} className="animate-spin" />
                  Thinking...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2 border-t border-white/10 bg-slate-950/60 p-3 backdrop-blur-sm">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={`Ask anything about ${subjectLabel}...`}
                className="flex-1 rounded-xl border border-white/10 bg-black/45 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-white/25"
                maxLength={1200}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="rounded-xl border border-white/15 bg-white p-2 text-black transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </form>
          </MotionDiv>
        )}
      </AnimatePresence>

      {!isOpen && (
        <div className="mb-2 max-w-[240px] rounded-xl border border-white/10 bg-black/72 px-3 py-2 text-[11px] text-slate-300 shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-white/18">
          {`Ask anything about ${subjectLabel}.`}
        </div>
      )}

      <MotionButton
        whileHover={{ scale: getHoverScale(motionPreset, 1.04) }}
        whileTap={{ scale: getTapScale(motionPreset, 0.97) }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white px-4 py-3 text-sm font-bold text-black shadow-[0_10px_28px_rgba(255,255,255,0.08)]"
      >
        <MessageSquare size={18} />
        {isOpen ? 'Close' : `Ask ${assistantConfig.assistantName}`}
      </MotionButton>
    </div>
  );
};

export default ChatWidget;
