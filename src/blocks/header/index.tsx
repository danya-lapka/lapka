import { A, Logo } from '@/components';
import styles from './style.module.scss';
import clsx from "clsx";

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
    <header className={clsx({
      [styles[`header`]]: true,
      [`w-100`]: true
    })}>
      <div className={clsx({
      [styles[`header-container`]]: true,
      [`f-r j-between a-center bg-gray-3 pad-h-24 pad-v-8 rad-all-16`]: true
    })}>
      <A href='/' color='white' className={clsx({
      [styles[`header-logo`]]: true,
      [`heading-2 f-r a-center`]: true
    })}>
        <Logo />
      </A>
        <ul className={clsx({
      [styles[`header-nav`]]: true,
      [`body-4 f-r gap-24`]: true
    })}>
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