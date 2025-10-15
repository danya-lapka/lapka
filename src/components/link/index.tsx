import { BaseProps } from "../props";
import Link from "next/link";
import s from './style.module.scss';
import clsx from "clsx";

export type ColorsDefault = "white"|"black"|"gray-1"|"gray-3"|"white-gray-2"|"black-gray-2"|"white-accent"|"black-accent"|"white-accent-alt"|"black-accent-alt"|"accent"|"accent-alt"|"accent-1"|"accent-3";
export type ColorsUnderline = "white"|"black"|"gray-1"|"gray-2"|"gray-3"|"accent"|"accent-1"|"accent-2"|"accent-3";

interface AProps extends BaseProps {
  href?: string,
  target?: string
}
interface APropsDefault extends AProps {
  color: ColorsDefault
}
interface APropsUnderline extends AProps {
  color: ColorsUnderline
}

const A: React.FC<APropsDefault> = ({
  children,
  className,
  color,
  href = '#',
  target = '_self',
  ...rest
}) => {
  return (
    <Link {...rest} 
          href={href} 
          target={target} 
          className={clsx(s[color], className)}>
      {children}
    </Link>
  )
}

const AUnderline: React.FC<APropsDefault> = ({
  children,
  className,
  color,
  href = '#',
  target = '_self',
  ...rest
}) => {
  return (
    <Link {...rest} 
          href={href} 
          target={target} 
          className={clsx(s[`${color}-underline`], className)}>
      {children}
    </Link>
  )
}

export { A, AUnderline }