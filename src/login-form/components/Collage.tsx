import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star, Send, Volume2, Sparkles, Smile, MoreHorizontal } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FloatingReaction {
  id: number;
  emoji: string;
  x: number;
}

export const Collage: React.FC = () => {
  const { t } = useLanguage();
  const [isHeartLiked, setIsHeartLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(248);
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingReaction[]>([]);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

  const triggerReaction = (emoji: string) => {
    setSelectedReaction(emoji);
    const newReaction: FloatingReaction = {
      id: Date.now() + Math.random(),
      emoji,
      x: Math.random() * 80 - 40,
    };
    setFloatingEmojis((prev) => [...prev.slice(-8), newReaction]);
    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 1800);
  };

  const handleHeartClick = () => {
    setIsHeartLiked(!isHeartLiked);
    setLikeCount((prev) => (isHeartLiked ? prev - 1 : prev + 1));
    triggerReaction('❤️');
  };

  return (
    <div className="relative w-full max-w-[560px] mx-auto flex items-center justify-center select-none py-4">
      {/* Background ambient lighting glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-rose-500/15 via-purple-600/15 to-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Floating Emojis Animation Layer */}
      <div className="absolute inset-0 pointer-events-none z-40 overflow-visible">
        <AnimatePresence>
          {floatingEmojis.map((reaction) => (
            <motion.div
              key={reaction.id}
              initial={{ opacity: 1, y: 320, x: reaction.x + 180, scale: 0.6 }}
              animate={{
                opacity: [1, 1, 0],
                y: 40,
                x: reaction.x + 180 + (Math.sin(reaction.id) * 40),
                scale: [0.6, 1.4, 1.1],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: 'easeOut' }}
              className="absolute text-3xl drop-shadow-md"
            >
              {reaction.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* LEFT CARD (Tilted behind center) - hidden on small mobile for clean fast layout */}
      <motion.div
        initial={{ opacity: 0, x: -30, rotate: -12 }}
        animate={{ opacity: 1, x: 0, rotate: -9 }}
        whileHover={{ rotate: -5, scale: 1.02 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="hidden sm:block absolute left-2 sm:left-6 w-[180px] sm:w-[220px] aspect-[9/15] rounded-[26px] overflow-hidden border border-white/10 shadow-2xl shadow-black/80 bg-neutral-900 z-10 cursor-pointer"
        onClick={() => triggerReaction('✨')}
      >
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
          alt="Friend portrait"
          className="w-full h-full object-cover brightness-95 contrast-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        {/* Gradient dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* User tag on left card */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full ring-1 ring-white/50 overflow-hidden bg-neutral-800">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="Avatar"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-[11px] font-medium text-white/90 drop-shadow">marcus.t</span>
        </div>

        {/* Music sticker */}
        <div className="absolute bottom-3 left-3 right-3 bg-black/40 backdrop-blur-md rounded-full px-2.5 py-1 border border-white/10 flex items-center gap-1.5">
          <Volume2 className="w-3 h-3 text-rose-400 shrink-0" />
          <span className="text-[10px] text-white/90 truncate font-medium">Late Night Groove • 2:14</span>
        </div>
      </motion.div>

      {/* RIGHT CARD (Tilted behind center) - hidden on small mobile */}
      <motion.div
        initial={{ opacity: 0, x: 30, rotate: 12 }}
        animate={{ opacity: 1, x: 0, rotate: 9 }}
        whileHover={{ rotate: 5, scale: 1.02 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        className="hidden sm:block absolute right-2 sm:right-6 w-[180px] sm:w-[220px] aspect-[9/15] rounded-[26px] overflow-hidden border border-white/10 shadow-2xl shadow-black/80 bg-neutral-900 z-10 cursor-pointer"
        onClick={() => triggerReaction('🎸')}
      >
        <img
          src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80"
          alt="Acoustic jam session"
          className="w-full h-full object-cover brightness-95"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full ring-1 ring-white/50 overflow-hidden bg-neutral-800">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
              alt="Avatar"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-[11px] font-medium text-white/90 drop-shadow">maya.chords</span>
        </div>

        {/* Location sticker */}
        <div className="absolute bottom-3 left-3 right-3 bg-black/40 backdrop-blur-md rounded-full px-2.5 py-1 border border-white/10 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
          <span className="text-[10px] text-white/90 truncate font-medium">Acoustic Sunset Rooftop</span>
        </div>
      </motion.div>

      {/* FLOATING 3D-STYLE GRADIENT HEART (Left decorative sticker) */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => triggerReaction('💖')}
        aria-label="Send Heart Reaction"
        className="hidden sm:block absolute -left-3 sm:left-4 bottom-24 z-30 cursor-pointer drop-shadow-[0_12px_24px_rgba(244,63,94,0.4)]"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-rose-600 via-fuchsia-500 to-amber-400 p-[2px] flex items-center justify-center">
          <div className="w-full h-full bg-[#111116] rounded-full flex items-center justify-center">
            <Heart className="w-7 h-7 sm:w-8 sm:h-8 fill-rose-500 text-rose-500 stroke-[1.5]" />
          </div>
        </div>
      </motion.button>

      {/* FLOATING CLOSE FRIENDS GREEN STAR BADGE (Top Right of Collage) */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.06 }}
        className="absolute -right-2 sm:right-10 top-16 sm:top-20 z-30 flex items-center gap-1.5 bg-emerald-500 text-neutral-950 font-bold px-3 py-1 rounded-full text-[11px] shadow-lg shadow-emerald-500/30 border border-emerald-300/40 select-none cursor-default"
      >
        <Star className="w-3.5 h-3.5 fill-current text-neutral-950" />
        <span>Close Friends</span>
        <span className="text-[9px] opacity-75">▾</span>
      </motion.div>

      {/* FLOATING REACTION BUBBLE (Above center card) */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="absolute -top-3 z-30 bg-neutral-900/90 backdrop-blur-xl border border-white/15 px-3.5 py-1.5 rounded-full shadow-xl flex items-center gap-2.5 text-base"
      >
        <button
          type="button"
          onClick={() => triggerReaction('🔮')}
          className="hover:scale-130 transition-transform active:scale-95 cursor-pointer"
          title="Magic crystal"
        >
          🔮
        </button>
        <button
          type="button"
          onClick={() => triggerReaction('😍')}
          className="hover:scale-130 transition-transform active:scale-95 cursor-pointer"
          title="Heart Eyes"
        >
          😍
        </button>
        <button
          type="button"
          onClick={() => triggerReaction('🔥')}
          className="hover:scale-130 transition-transform active:scale-95 cursor-pointer"
          title="Fire"
        >
          🔥
        </button>
      </motion.div>

      {/* CENTER STORY CARD (Hero Element) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-[230px] sm:w-[270px] aspect-[9/16] rounded-[32px] overflow-hidden border-[2.5px] border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] bg-neutral-900 z-20"
      >
        {/* Hero Photo - Candid Close Friends */}
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80"
          alt="Close friends sharing everyday moments"
          className="w-full h-full object-cover brightness-[0.98] contrast-105"
          referrerPolicy="no-referrer"
        />

        {/* Top & Bottom Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 pointer-events-none" />

        {/* STORY PROGRESS BARS */}
        <div className="absolute top-3 left-3.5 right-3.5 flex gap-1 z-10">
          <div className="h-1 flex-1 bg-white rounded-full" />
          <div className="h-1 flex-1 bg-white rounded-full" />
          <div className="h-1 flex-1 bg-white/40 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-white rounded-full animate-pulse" />
          </div>
        </div>

        {/* STORY HEADER USER BAR */}
        <div className="absolute top-6 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            {/* User Avatar with Close Friends green ring */}
            <div className="p-[2px] bg-gradient-to-tr from-emerald-400 to-emerald-600 rounded-full">
              <div className="w-7 h-7 rounded-full overflow-hidden bg-neutral-800">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Julian & crew"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-white leading-none">julian.vibes</span>
                <span className="text-[10px] text-white/60">2h</span>
              </div>
              <span className="text-[9px] font-medium text-emerald-400 flex items-center gap-0.5">
                <Star className="w-2.5 h-2.5 fill-emerald-400" /> {t.closeFriends}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="text-white/70 hover:text-white transition-colors p-1"
            aria-label="Story Options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* INTERACTIVE STORY BOTTOM ACTION BAR */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center gap-2">
          {/* Send message pill */}
          <div
            onClick={() => triggerReaction('💬')}
            className="flex-1 bg-black/50 backdrop-blur-md border border-white/20 rounded-full px-3 py-2 flex items-center justify-between cursor-pointer group hover:border-white/40 transition-colors"
          >
            <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors">
              {t.sendMessage}
            </span>
            <Smile className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
          </div>

          {/* Interactive Heart Reaction Button */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.75 }}
            onClick={handleHeartClick}
            aria-label="Like story"
            className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors cursor-pointer shrink-0 relative"
          >
            <Heart
              className={`w-5 h-5 transition-all duration-300 ${
                isHeartLiked
                  ? 'fill-rose-500 text-rose-500 scale-110'
                  : 'text-white hover:text-rose-400'
              }`}
            />
          </motion.button>
        </div>
      </motion.div>

      {/* FLOATING MINI PROFILE AVATAR WITH GRADIENT STORY RING (Bottom Right Overlap) */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => triggerReaction('👋')}
        className="absolute right-2 sm:right-12 bottom-12 z-30 cursor-pointer"
        title="View story"
      >
        <div className="p-[2.5px] bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 rounded-full shadow-xl shadow-rose-900/30">
          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden border-2 border-[#09090b] bg-neutral-800">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
              alt="Story creator"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <div className="absolute -bottom-1 right-0 bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-[#09090b]">
          NEW
        </div>
      </motion.div>
    </div>
  );
};
