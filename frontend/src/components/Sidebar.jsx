import React, { useState } from 'react';
import { Book, Plus, Search, Calendar, Trash2, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar({ entries, activeEntryId, onSelectEntry, onNewEntry, onDeleteEntry, onToggleStats }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 h-full flex flex-col gap-6 p-6 bg-slate-900 border-r border-white/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Book className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">MindVault</h1>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleStats}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-indigo-400 transition-colors"
          >
            <BarChart2 className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onNewEntry}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search entries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50 text-white"
        />
      </div>

      <div className="flex-grow overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-10 opacity-20">
            <Calendar className="w-12 h-12 mx-auto mb-2" />
            <p className="text-xs">{searchQuery ? 'No results found' : 'No entries yet'}</p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredEntries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="relative group"
              >
                <button
                  onClick={() => onSelectEntry(entry.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all ${activeEntryId === entry.id
                    ? 'bg-indigo-600/10 border border-indigo-500/20'
                    : 'hover:bg-white/5 border border-transparent'
                    }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${entry.mood === 'radiant' ? 'bg-yellow-400' :
                        entry.mood === 'happy' ? 'bg-green-400' :
                          entry.mood === 'neutral' ? 'bg-blue-400' :
                            entry.mood === 'down' ? 'bg-indigo-400' : 'bg-slate-400'
                        }`} />
                    </div>
                  </div>
                  <h3 className={`font-semibold text-sm truncate ${activeEntryId === entry.id ? 'text-indigo-400' : 'text-slate-200'
                    }`}>
                    {entry.title || 'Untitled Entry'}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {entry.content || 'Start writing...'}
                  </p>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteEntry(entry.id);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      <div className="pt-6 border-t border-white/5">
        <div className="flex items-center gap-3 px-2 opacity-50">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
          <div>
            <p className="text-xs font-bold">Candidate</p>
            <p className="text-[10px]">Vault Explorer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
