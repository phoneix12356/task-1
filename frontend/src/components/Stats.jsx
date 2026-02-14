import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, Smile, Meh, Frown, Sun, Cloud } from 'lucide-react';

export default function Stats({ entries, onClose }) {
  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const moods = [
    { id: 'radiant', label: 'Radiant', icon: Sun, color: 'bg-yellow-400' },
    { id: 'happy', label: 'Happy', icon: Smile, color: 'bg-green-400' },
    { id: 'neutral', label: 'Neutral', icon: Meh, color: 'bg-blue-400' },
    { id: 'down', label: 'Down', icon: Frown, color: 'bg-indigo-400' },
    { id: 'ominous', label: 'Ominous', icon: Cloud, color: 'bg-slate-400' },
  ];

  const maxCount = Math.max(...Object.values(moodCounts), 0) || 1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-slate-950/80 backdrop-blur-md"
    >
      <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <BarChart2 className="w-6 h-6 text-indigo-500" />
            <h2 className="text-2xl font-bold text-white">Mood Analytics</h2>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm transition-colors"
          >
            Back to Vault
          </button>
        </div>

        <div className="grid gap-6">
          {moods.map((mood) => {
            const count = moodCounts[mood.id] || 0;
            const percentage = (count / maxCount) * 100;

            return (
              <div key={mood.id} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-slate-400">
                    <mood.icon className="w-4 h-4" />
                    <span>{mood.label}</span>
                  </div>
                  <span className="font-bold text-white">{count} entries</span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full ${mood.color} rounded-full`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-indigo-600/10 rounded-2xl border border-indigo-500/20 flex items-center gap-4">
          <TrendingUp className="w-8 h-8 text-indigo-400" />
          <div>
            <h3 className="text-lg font-bold text-white">Vault Insight</h3>
            <p className="text-sm text-slate-400">
              You've recorded {entries.length} memories so far. Keep building your digital legacy.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
