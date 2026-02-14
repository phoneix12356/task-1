import React from 'react';
import { Smile, Frown, Meh, Sun, Moon, CloudRain } from 'lucide-react';
import { motion } from 'framer-motion';

const moods = [
  { icon: Sun, label: 'Radiant', color: 'text-yellow-400', id: 'radiant' },
  { icon: Smile, label: 'Happy', color: 'text-green-400', id: 'happy' },
  { icon: Meh, label: 'Neutral', color: 'text-blue-400', id: 'neutral' },
  { icon: Frown, label: 'Down', color: 'text-indigo-400', id: 'down' },
  { icon: CloudRain, label: 'Gloomy', color: 'text-slate-400', id: 'gloomy' },
];

export default function MoodSelector({ activeMood, onMoodSelect }) {
  return (
    <div className="flex gap-4 p-4 justify-center bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
      {moods.map((mood) => {
        const Icon = mood.icon;
        const isActive = activeMood === mood.id;

        return (
          <motion.button
            key={mood.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMoodSelect(mood.id)}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${isActive
                ? 'bg-white/10 ring-2 ring-indigo-500/50'
                : 'hover:bg-white/5'
              }`}
          >
            <Icon className={`w-6 h-6 ${isActive ? mood.color : 'text-slate-400'}`} />
            <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-slate-500'}`}>
              {mood.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
