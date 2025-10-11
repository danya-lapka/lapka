'use client';
import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import s from './style.module.scss';
import { useSound } from "@/hooks";

class SimpleInterval {
  private timer: NodeJS.Timeout | null = null;
  
  start(callback: () => void, delay: number): void {
    this.stop();
    this.timer = setInterval(callback, delay);
  }
  
  stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
  
  isRunning(): boolean {
    return this.timer !== null;
  }
}

const HelloImg = () => {

  const [state, setState] = useState(false);
  let url = state ? '/hello-img2' : '/hello-img';
  
  const Meow = useSound(`/sound/meow.mp3`);
  const Purr = useSound(`/sound/purr.mp3`);

  const intervalRef = useRef<SimpleInterval>(new SimpleInterval());
  const isPurrRef = useRef<boolean>(false);

  const getRandomChance = (percent: number) => {
    return Math.random() * 100 < percent;
  }

  const meowing = useCallback(() => {
    setState(true);
    const interval = intervalRef.current;
    
    interval.start(() => {
      isPurrRef.current = getRandomChance(20);
      if (isPurrRef.current) {
        Meow.stop();
        Purr.play();
      } else {
        Purr.stop();
        Meow.play();
      }
    }, 1200);
  }, [Meow, Purr]);

  const stopMeowing = useCallback(() => {
    setState(false);
    const interval = intervalRef.current;
    interval.stop();
    Meow.stop();
    Purr.stop();
  }, [Meow, Purr]);

  return (
      <Image className = {`${s[`image`]} c-pointer hello-img`} 
             src = {`${url}.png`} 
             alt = {url} 
             fill
             onMouseDown = {meowing}
             onMouseUp = {stopMeowing}
             onMouseLeave = {stopMeowing}
             onTouchStart = {meowing}
             onTouchEnd = {stopMeowing}
      />
  )
}

export { HelloImg }