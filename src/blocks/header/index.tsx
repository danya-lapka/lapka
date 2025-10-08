import { A, Logo } from '@/components';
import s from './style.module.scss';

const Header = () => {

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

  return (
    <header className = {`${s[`header`]} w-100`}>
      <div className = {`${s[`header-container`]} f-r j-between a-center bg-gray-3 pad-h-24 pad-v-8 rad-all-16`}>
      <A className = {`${s[`header-logo`]} heading-2 f-r a-center`} 
         href='/' 
         color='white'
      >
        <Logo />
      </A>
        <ul className = {`${s[`header-nav`]} body-4 f-r gap-24`}>
        {pages.map((i) => {
          return (
            <li key={i.name}>
              <A color='white' href={i.href}>{i.name}</A>
            </li>
          )
        })}
        </ul>
      </div>
    </header>
  );
}

export { Header }