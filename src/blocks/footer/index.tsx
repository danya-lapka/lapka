import { A, Logo } from '@/components';
import styles from './style.module.scss';
import clsx from "clsx";

const Footer = () => {

  const pages: {
    name:string, 
    href:string
  }[] = [
    {
      name: "Ссылки",
      href: "/links"
    },
    {
      name: "Таблица",
      href: "/table"
    }
  ]

  const links: {
    name:string, 
    href:string
  }[] = [
    {
      name: "Telegram",
      href: "https://t.me/danya_lapka"
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@DanyaLapka"
    },
    {
      name: "Twitch",
      href: "https://www.twitch.tv/danya_lapka"
    },
    {
      name: "Discord",
      href: "https://discord.gg/wUexGQSy6P"
    },
    {
      name: "GitHub",
      href: "https://github.com/danya-lapka"
    },
  ]

  return (
    <footer className={clsx({
      [styles[`footer`]]: true,
      [`pad-v-48 f-r j-center a-center gap-96 bg-gray-3 rad-all-16`]: true
    })}>
      <ul className={clsx({
      [styles[`footer-nav`]]: true,
      [`body-4 f-c gap-8 a-end`]: true
    })}>
        {pages.map((i) => {
          return (
            <li key={i.name}>
              <A color='white' href={i.href}>{i.name}</A>
            </li>
          )
        })}
        </ul>
      <div className={clsx({
        [styles[`footer-info`]]: true,
        [`f-c a-center gap-20`]: true
      })}>
        <A href='/' color='white' className={clsx({
        [styles[`footer-logo`]]: true,
        [`f-r a-center`]: true
      })}>
          <Logo />
        </A>
        <A className={clsx({
          [`body-5`]: true
        })} color='white' href='mailto:danya.lapka.partner@gmail.com'>
          danya.lapka.partner@gmail.com
        </A>
      </div>
      <ul className={clsx({
      [styles[`footer-links`]]: true,
      [`body-4 f-c gap-8 a-start`]: true
    })}>
        {links.map((i) => {
          return (
            <li key={i.name}>
              <A target="_blank" color='white' href={i.href}>{i.name}</A>
            </li>
          )
        })}
        </ul>
    </footer>
  );
}

export { Footer }