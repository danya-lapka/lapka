'use client';
import { useRef, useCallback } from 'react';

export function useSoundHold(soundPath: string, interval: number = 1100) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const initializeAudio = useCallback(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio(soundPath);
    }
  }, [soundPath]);

  const play = useCallback(() => {
    if (!audioRef.current) {
      initializeAudio();
    }
    
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.error('Ошибка воспроизведения:', error);
      });
    }
  }, [initializeAudio]);

  const start = useCallback(() => {
    // Воспроизводим сразу
    play();
    
    // Устанавливаем интервал для повторения
    intervalRef.current = setInterval(play, interval);
  }, [play, interval]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  // Очистка
  const cleanup = useCallback(() => {
    stop();
  }, [stop]);

  return {
    start,
    stop,
    cleanup
  };
}