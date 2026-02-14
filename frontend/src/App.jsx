import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MoodSelector from './components/MoodSelector';
import JournalEditor from './components/JournalEditor';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('mindvault_entries');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeEntry, setActiveEntry] = useState({
    id: Date.now().toString(),
    title: '',
    content: '',
    mood: 'neutral',
    date: new Date().toISOString()
  });

  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    localStorage.setItem('mindvault_entries', JSON.stringify(entries));
  }, [entries]);

  const handleSave = () => {
    const existingIndex = entries.findIndex(e => e.id === activeEntry.id);
    if (existingIndex >= 0) {
      const updatedEntries = [...entries];
      updatedEntries[existingIndex] = activeEntry;
      setEntries(updatedEntries);
    } else {
      setEntries([activeEntry, ...entries]);
    }
    setIsEditing(false);
  };

  const handleNewEntry = () => {
    const newEntry = {
      id: Date.now().toString(),
      title: '',
      content: '',
      mood: 'neutral',
      date: new Date().toISOString()
    };
    setActiveEntry(newEntry);
    setIsEditing(true);
  };

  const handleSelectEntry = (id) => {
    const entry = entries.find(e => e.id === id);
    if (entry) {
      setActiveEntry(entry);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 overflow-hidden font-sans">
      <Sidebar
        entries={entries}
        activeEntryId={activeEntry.id}
        onSelectEntry={handleSelectEntry}
        onNewEntry={handleNewEntry}
      />

      <main className="flex-grow flex flex-col p-8 gap-8 overflow-hidden">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 mb-1">
              {isEditing ? 'New Reflection' : 'Vault Entry'}
            </h2>
            <p className="text-slate-400 text-xs">
              {new Date(activeEntry.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          <MoodSelector
            activeMood={activeEntry.mood}
            onMoodSelect={(mood) => setActiveEntry({ ...activeEntry, mood })}
          />
        </header>

        <section className="flex-grow overflow-hidden relative">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <JournalEditor
                key="editor"
                title={activeEntry.title}
                content={activeEntry.content}
                onTitleChange={(title) => setActiveEntry({ ...activeEntry, title })}
                onContentChange={(content) => setActiveEntry({ ...activeEntry, content })}
                onSave={handleSave}
              />
            ) : (
              <motion.div
                key="viewer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="h-full p-12 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 flex flex-col gap-6"
              >
                <div className="flex justify-between items-start">
                  <h1 className="text-6xl font-black text-white">{activeEntry.title || 'Untitled'}</h1>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Edit Entry
                  </button>
                </div>
                <div className="flex-grow overflow-y-auto pr-8 custom-scrollbar">
                  <p className="text-2xl text-slate-400 leading-relaxed whitespace-pre-wrap font-light">
                    {activeEntry.content || 'Memory is empty...'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}

export default App;
