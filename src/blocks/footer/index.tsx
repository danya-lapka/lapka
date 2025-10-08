import { A, Logo } from '@/components';
import s from './style.module.scss';

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
    <footer className = {`${s[`footer`]} pad-v-48 f-r j-center a-center gap-96 bg-gray-3 rad-all-16`}>
      <ul className = {`${s[`footer-nav`]} body-4 f-c gap-8 a-end`}>
        {pages.map((i) => {
          return (
            <li key={i.name}>
              <A color='white' href={i.href}>{i.name}</A>
            </li>
          )
        })}
        </ul>
      <div className = {`${s[`footer-info`]} f-c a-center gap-20`}>
        <A className = {`${s[`footer-logo`]} f-r a-center`} 
           href='/' 
           color='white' 
        >
          <Logo />
        </A>
        <A className={`body-5`} 
           color='white' 
           href='mailto:danya.lapka.partner@gmail.com'
        >
          danya.lapka.partner@gmail.com
        </A>
      </div>
      <ul className = {`${s[`footer-links`]} body-4 f-c gap-8 a-start`}>
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