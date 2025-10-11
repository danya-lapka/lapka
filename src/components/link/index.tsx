import { BaseProps } from "../props";
import Link from "next/link";
import s from './style.module.scss';
import clsx from "clsx";

export type Colors = 'white'|'black'|'accent'|'gray-3'|'gray-1'|'accent-alt'|'white-accent'|'black-accent'|'accent-1'|'accent-3'|'white-accent-alt'|'black-accent-alt'|'white-alt'|'black-alt';

interface AProps extends BaseProps {
  href?: string,
  target?: string,
  color: Colors
}

const A: React.FC<AProps> = ({
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

export { A }