'use client';
import { useRef, useState, useCallback } from 'react';

export function useSound(soundPath: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Инициализация audio элемента
  const initializeAudio = useCallback(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(soundPath);
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
      audioRef.current.addEventListener('pause', () => setIsPlaying(false));
    }
  }, [soundPath]);

  const play = useCallback(() => {
    if (!audioRef.current) {
      initializeAudio();
    }
    
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => console.error('Ошибка воспроизведения:', error));
    }
  }, [initializeAudio]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  return {
    play,
    pause,
    stop,
    isPlaying,
  };
}