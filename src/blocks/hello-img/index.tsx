'use client';
import Image from "next/image";
import { Fragment, useState } from "react";
import styles from './style.module.scss';
import clsx from "clsx";
import { useSoundHold } from "@/hooks";

const Hello_Img = () => {
  const isProd = process.env.NODE_ENV === 'production';
  const [state, setState] = useState(false);
  let url = state ? '/hello-img2': '/hello-img';
  const { start, stop } = useSoundHold(`${isProd ? '/lapka' : ''}/sound/meow.mp3`, 1200);

  const meowing = () => {
    setState(true); 
    start();
  }
  const stopMeowing = () => {
    setState(false); 
    stop();
  }

  return (
    <Fragment>
      <Image src={`${isProd ? '/lapka' : ''}${url}.png`} alt={url} fill className={clsx({
        [`image c-pointer`]: true,
        [styles[`image`]]: true
      })}
      onMouseDown={meowing}
      onMouseUp={stopMeowing}
      onMouseLeave={stopMeowing}
      onTouchStart={meowing}
      onTouchEnd={stopMeowing}/>
    </Fragment>
  )
}

export { Hello_Img }