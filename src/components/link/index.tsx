import { BaseProps } from "../props";
import Link from "next/link";
import styles from './style.module.scss';
import clsx from "clsx";

interface AProps extends BaseProps {
  href?: string,
  target?: string,
  color?: string
}

const A: React.FC<AProps> = ({
  children,
  className,
  color = 'white',
  href = '#',
  target = '_self',
  ...rest
}) => {
  return (
    <Link {...rest} href={href} target={target} className={clsx({
      [`${className}`]: className,
      [styles[`${color}`]]: true
    })}>
      {children}
    </Link>
  )
}

export { A }