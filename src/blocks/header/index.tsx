'use client';
import { A, Logo } from '@/components';
import s from './style.module.scss';
import { useViewport } from '@/hooks';
import { BaseProps } from '@/components';
import { pages } from '@/blocks/info';

const Pages: React.FC<BaseProps> = ({ className }) => {
  return (
    <ul className={`${s[`header-nav`]} body-4 f-r gap-24`}>
      {pages.map((i) => {
        return (
          <li key={i.name}>
            <A color='white' href={i.href}>{i.name}</A>
          </li>
        )
      })}
    </ul>
  )
}

const HeaderContainer: React.FC<BaseProps> = ({ className }) => {
  return (
    <div className={`${s[`header-container`]} f-r j-between a-center pad-h-24 pad-v-8 ${className}`}>
      <A className={`${s[`header-logo`]} heading-2 f-r a-center`}
        href='/'
        color='white'
      >
        <Logo />
      </A>
      <Pages />
    </div>
  )
}

const Header = () => {
  const {width} = useViewport();
  if (width < 768) {
    return (
      <header className={`${s[`header`]} pad-all-0 top-0`}>
        <HeaderContainer className='rad-all-0'/>
      </header>
    );
  } else if (width < 1024) {
    return (
      <header className={`${s[`header`]} pad-h-16 top-16`}>
        <HeaderContainer className='rad-all-16'/>
      </header>
    );
  } else if (width < 1440) {
    return (
      <header className={`${s[`header`]} pad-h-64 top-16`}>
        <HeaderContainer className='rad-all-16'/>
      </header>
    );
  } else if (width < 1920) {
    return (
      <header className={`${s[`header`]} pad-h-160 top-16`}>
        <HeaderContainer className='rad-all-16'/>
      </header>
    );
  } else {
    return (
      <header className={`${s[`header`]} pad-h-240 top-16`}>
        <HeaderContainer className='rad-all-16'/>
      </header>
    );
  }
}

export { Header }