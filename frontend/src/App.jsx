import Sidebar from './components/Sidebar';
import MoodSelector from './components/MoodSelector';
import JournalEditor from './components/JournalEditor';
import Stats from './components/Stats';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const moodGradients = {
  radiant: 'from-orange-600/20 via-slate-950 to-slate-950',
  happy: 'from-emerald-600/20 via-slate-950 to-slate-950',
  neutral: 'from-blue-600/20 via-slate-950 to-slate-950',
  down: 'from-indigo-600/20 via-slate-950 to-slate-950',
  ominous: 'from-slate-600/20 via-slate-950 to-slate-950',
};

const moodShadows = {
  radiant: 'shadow-orange-500/10',
  happy: 'shadow-emerald-500/10',
  neutral: 'shadow-blue-500/10',
  down: 'shadow-indigo-500/10',
  ominous: 'shadow-slate-500/10',
};

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
  const [showStats, setShowStats] = useState(false);

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

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this memory?')) {
      const updatedEntries = entries.filter(e => e.id !== id);
      setEntries(updatedEntries);
      if (activeEntry.id === id) {
        handleNewEntry();
      }
    }
  };

  const currentGradient = moodGradients[activeEntry.mood] || moodGradients.neutral;

  return (
    <div className={`flex h-screen w-full bg-slate-950 bg-gradient-to-br ${currentGradient} transition-all duration-1000 overflow-hidden font-sans text-slate-200`}>
      <Sidebar
        entries={entries}
        activeEntryId={activeEntry.id}
        onSelectEntry={handleSelectEntry}
        onNewEntry={handleNewEntry}
        onDeleteEntry={handleDelete}
        onToggleStats={() => setShowStats(!showStats)}
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
          <AnimatePresence>
            {showStats && (
              <Stats entries={entries} onClose={() => setShowStats(false)} />
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {isEditing ? (
              <JournalEditor
                key="editor"
                title={activeEntry.title}
                content={activeEntry.content}
                image={activeEntry.image}
                onTitleChange={(title) => setActiveEntry({ ...activeEntry, title })}
                onContentChange={(content) => setActiveEntry({ ...activeEntry, content })}
                onImageChange={(image) => setActiveEntry({ ...activeEntry, image })}
                onSave={handleSave}
              />
            ) : (
              <motion.div
                key="viewer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className={`h-full p-12 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 flex flex-col gap-6 overflow-y-auto custom-scrollbar shadow-2xl ${moodShadows[activeEntry.mood] || moodShadows.neutral}`}
              >
                <div className="flex justify-between items-start">
                  <h1 className="text-6xl font-black text-white">{activeEntry.title || 'Untitled'}</h1>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Edit Entry
                    </button>
                    <button
                      onClick={() => handleDelete(activeEntry.id)}
                      className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {activeEntry.image && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-h-[400px] rounded-2xl overflow-hidden border border-white/10"
                  >
                    <img src={activeEntry.image} alt="Journal" className="w-full h-full object-cover" />
                  </motion.div>
                )}

                <div className="flex-grow pr-8">
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
