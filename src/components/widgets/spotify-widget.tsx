"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import {
  Music,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Shuffle,
  Repeat,
  ExternalLink,
} from "lucide-react";

interface SpotifyTrack {
  title: string;
  artist: string;
  album: string;
  albumArt?: string;
  progress: number;
  duration: number;
  isPlaying: boolean;
}

export function SpotifyWidget() {
  const [connected, setConnected] = useState(false);
  const [track, setTrack] = useState<SpotifyTrack>({
    title: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    progress: 45,
    duration: 240,
    isPlaying: true,
  });

  const connectSpotify = () => {
    // In production: redirect to /api/spotify/auth
    window.open("/api/spotify/auth", "_blank", "width=400,height=600");
  };

  if (!connected) {
    return (
      <GlassCard className="h-full flex flex-col items-center justify-center min-h-[200px]">
        <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
          <Music className="w-7 h-7 text-green-500" />
        </div>
        <p className="text-white text-sm font-medium mb-1">Connect Spotify</p>
        <p className="text-neutral-500 text-xs mb-4 text-center">
          Link your account for playback controls
        </p>
        <Button
          onClick={() => setConnected(true)}
          variant="glass"
          size="sm"
          className="gap-2"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Connect
        </Button>
      </GlassCard>
    );
  }

  const progressPercent =
    track.duration > 0 ? (track.progress / track.duration) * 100 : 0;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  return (
    <GlassCard className="h-full flex flex-col min-h-[280px]">
      {/* Album art */}
      <div className="w-full aspect-square max-h-[140px] bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        {track.albumArt ? (
          <img
            src={track.albumArt}
            alt={track.album}
            className="w-full h-full object-cover"
          />
        ) : (
          <Music className="w-10 h-10 text-neutral-600" />
        )}
      </div>

      {/* Track info */}
      <div className="mb-3">
        <p className="text-white text-sm font-medium truncate">{track.title}</p>
        <p className="text-neutral-500 text-xs truncate">{track.artist}</p>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer">
          <div
            className="h-full bg-green-500/80 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-neutral-600 text-[10px]">
            {formatTime(track.progress)}
          </span>
          <span className="text-neutral-600 text-[10px]">
            {formatTime(track.duration)}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button className="text-neutral-500 hover:text-white transition-colors">
          <Shuffle className="w-3.5 h-3.5" />
        </button>
        <button className="text-neutral-300 hover:text-white transition-colors">
          <SkipBack className="w-4 h-4" />
        </button>
        <button
          onClick={() =>
            setTrack({ ...track, isPlaying: !track.isPlaying })
          }
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
        >
          {track.isPlaying ? (
            <Pause className="w-4 h-4 text-black" />
          ) : (
            <Play className="w-4 h-4 text-black ml-0.5" />
          )}
        </button>
        <button className="text-neutral-300 hover:text-white transition-colors">
          <SkipForward className="w-4 h-4" />
        </button>
        <button className="text-neutral-500 hover:text-white transition-colors">
          <Repeat className="w-3.5 h-3.5" />
        </button>
      </div>
    </GlassCard>
  );
}
