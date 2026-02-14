import React from 'react';
import { motion } from 'framer-motion';

export default function JournalEditor({ title, content, onTitleChange, onContentChange, onSave }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6 h-full p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl"
    >
      <input
        type="text"
        placeholder="Entry Title..."
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="text-4xl font-bold bg-transparent border-none outline-none placeholder:text-slate-700 text-white"
      />

      <div className="flex-grow">
        <textarea
          placeholder="What's on your mind today?"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full h-full bg-transparent border-none outline-none resize-none text-lg text-slate-300 placeholder:text-slate-800 leading-relaxed"
        />
      </div>

      <div className="flex justify-end pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSave}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-colors"
        >
          Save to Vault
        </motion.button>
      </div>
    </motion.div>
  );
}
