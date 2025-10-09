'use client';
import { A, Logo } from '@/components';
import s from './style.module.scss';
import { useViewport } from '@/hooks';
import { BaseProps } from '@/components';
import { pages, links } from '@/blocks/info';

let c = {
  main: `${s[`footer`]} pad-v-48 j-center a-center bg-gray-3 rad-all-16`,
  nav: `${s[`footer-nav`]} body-4 f-c gap-8`,
  info: `${s[`footer-info`]} f-c a-center gap-20`,
  logo: `${s[`footer-logo`]} f-r a-center`,
  links: `${s[`footer-links`]} body-4 f-c gap-8`
}

const Pages: React.FC<BaseProps> = ({className}) => {
  return (
    <ul className={className}>
      {pages.map((i) => {
        return (
          <li key={i.name}>
            <A color='white' href={i.href}>{i.name}</A>
          </li>
        )
      })}
    </ul>
  );
}
const Links: React.FC<BaseProps> = ({className}) => {
  return (
    <ul className={className}>
      {links.map((i) => {
        return (
          <li key={i.name}>
            <A target="_blank" color='white' href={i.href}>{i.name}</A>
          </li>
        )
      })}
    </ul>
  )
}

const Info = () => {
  return (
    <div className={c.info}>
      <A className={c.logo}
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
  )
}

const Footer = () => {
  const { width } = useViewport();

  if (width < 768) {
    return (
      <footer className={`${c.main} f-c gap-32 margin-bottom-0`}>
        <Pages className={`${c.nav} a-center`}/>
        <Links className={`${c.links} a-center`}/>
        <Info />
      </footer>
    );
  } else if (width < 1440) {
    return (
      <footer className={`${c.main} f-r gap-72 margin-bottom-16`}>
        <Pages className={`${c.nav} a-end`}/>
        <Info />
        <Links className={`${c.links} a-start`}/>
      </footer>
    );
  } else {
    return (
      <footer className={`${c.main} f-r gap-96 margin-bottom-16`}>
        <Pages className={`${c.nav} a-end`}/>
        <Info />
        <Links className={`${c.links} a-start`}/>
      </footer>
    );
  }
  
}

export { Footer }