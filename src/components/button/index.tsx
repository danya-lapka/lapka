import { BaseProps } from "../props";
import s from './style.module.scss';
import clsx from "clsx";

interface ButtonProps extends BaseProps {
  color?: string,
  onClick?: React.MouseEventHandler
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  color = 'white',
  onClick,
  ...rest
}) => {
  return (
    <div {...rest} onClick={onClick} className={clsx({
      [`${className}`]: className,
      [s[`${color}`]]: true
    })}>
      {children}
    </div>
  )
}

export { Button }