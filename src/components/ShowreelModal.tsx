import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  if (!isOpen) return null;

  return (
    <div
      id="showreel-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 sm:p-8 md:p-12 transition-all duration-500 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="showreel-title"
    >
      <div className="relative w-full max-w-5xl aspect-video bg-[#0c0e12] rounded-xl overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col justify-between">
        {/* Top bar */}
        <div className="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <h3 id="showreel-title" className="text-xs font-mono tracking-[0.25em] text-white/90 uppercase">
              KAMAL AZAM // DIRECTORS REEL 2026
            </h3>
          </div>
          <button
            id="close-showreel-button"
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white rounded-full bg-black/40 hover:bg-white/10 transition-colors"
            aria-label="Close Showreel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cinematic Video Layer */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <video
            autoPlay
            loop
            playsInline
            muted={isMuted}
            className="w-full h-full object-cover"
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            poster="/src/assets/images/hero_cinematic_automotive_1789133676136.jpg"
          />
          {/* Subtle anamorphic vignette overlay */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
        </div>

        {/* Bottom player controls bar */}
        <div className="absolute bottom-0 left-0 w-full z-20 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <span className="text-[11px] font-mono tracking-widest text-white/60">
              01:42 / 02:30
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
              4K DCI • 2.39:1 • ProRes HQ
            </span>
            <button
              onClick={() => {
                const elem = document.getElementById('showreel-modal');
                if (elem?.requestFullscreen) {
                  elem.requestFullscreen().catch(() => {});
                }
              }}
              className="p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
