"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { StickyNote, Plus, Trash2 } from "lucide-react";

interface Note {
  id: string;
  content: string;
  createdAt: Date;
}

export function NotesWidget() {
  const [notes, setNotes] = useState<Note[]>([
    { id: "1", content: "Review component architecture", createdAt: new Date() },
    { id: "2", content: "Deploy staging environment", createdAt: new Date() },
  ]);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes([
      { id: Date.now().toString(), content: newNote, createdAt: new Date() },
      ...notes,
    ]);
    setNewNote("");
  };

  const removeNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <GlassCard className="h-full flex flex-col min-h-[200px]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <StickyNote className="w-4 h-4 text-neutral-400" />
        <h3 className="text-white text-sm font-medium">Quick Notes</h3>
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 mb-3">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
          placeholder="Add a note..."
          className="flex-1 h-8 px-3 rounded-md bg-white/5 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[var(--accent-color)] transition-colors"
        />
        <button
          onClick={addNote}
          className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1.5">
        {notes.map((note) => (
          <div
            key={note.id}
            className="group flex items-start gap-2 p-2 rounded-md bg-white/[0.02] hover:bg-white/5 transition-colors"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-1.5 flex-shrink-0" />
            <span className="text-neutral-300 text-xs flex-1 leading-relaxed">
              {note.content}
            </span>
            <button
              onClick={() => removeNote(note.id)}
              className="opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-red-400 transition-all"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
