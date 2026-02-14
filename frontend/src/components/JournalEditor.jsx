import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, X } from 'lucide-react';

export default function JournalEditor({ title, content, image, onTitleChange, onContentChange, onImageChange, onSave }) {
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    onImageChange(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6 h-full p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-y-auto custom-scrollbar"
    >
      <input
        type="text"
        placeholder="Entry Title..."
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="text-4xl font-bold bg-transparent border-none outline-none placeholder:text-slate-700 text-white w-full"
      />

      <div className="flex gap-4 items-center">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-slate-400 hover:text-white transition-colors border border-white/5"
        >
          <ImageIcon className="w-4 h-4" />
          {image ? 'Change Image' : 'Add Image'}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
        {image && (
          <button
            onClick={removeImage}
            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {image && (
        <div className="relative group w-full max-h-64 rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50">
          <img src={image} alt="Preview" className="w-full h-full object-contain" />
        </div>
      )}

      <div className="flex-grow min-h-[200px]">
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
