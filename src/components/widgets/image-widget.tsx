"use client";

import { useState, useRef } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { ImageIcon, Upload, X } from "lucide-react";

export function ImageWidget() {
  const [image, setImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <GlassCard className="h-full flex flex-col items-center justify-center min-h-[200px] relative overflow-hidden">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />

      {image ? (
        <>
          <img
            src={image}
            alt="Widget"
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={() => setImage(null)}
              className="w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center gap-3 text-neutral-400 hover:text-white transition-colors"
        >
          <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
            <Upload className="w-6 h-6" />
          </div>
          <span className="text-xs">Upload Image</span>
        </button>
      )}
    </GlassCard>
  );
}
