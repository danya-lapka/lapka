'use client';
import Image from "next/image";
import { useState } from "react";
import styles from './style.module.scss';
import clsx from "clsx";

const Hello_Img = () => {
  const [state, setState] = useState(false);

  let url = state ? '/hello-img2': '/hello-img';

  return (
    <Image src={`${url}.png`} alt={url} onClick={() => { setState(!state); }} fill className={clsx({
      [`image c-pointer`]: true,
      [styles[`image`]]: true
    })}/>
  )
}

export { Hello_Img }