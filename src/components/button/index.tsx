import { BaseProps } from "../props";
import s from './style.module.scss';
import clsx from "clsx";

type Colors = "white"|"black"|"gray-1"|"gray-3"|"white-accent"|"black-accent"|"accent"|"accent-alt"|"accent-1"|"accent-3"|"info"|"error"|"success"|"warn";

interface ButtonProps extends BaseProps {
  color: Colors,
  onClick?: React.MouseEventHandler,
  variant?: "default"|"outline",
  disabled?: boolean,
  type?: "submit" | "reset" | "button"
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  color,
  onClick,
  variant = "default",
  disabled = false,
  type,
  ...rest
}) => {
  return (
    <button {...rest}
         type={type} 
         onClick={disabled? undefined : onClick} 
         className={clsx(s.class, s[`${color}-${variant}`], className, {
          [`outline`]: variant == "outline",
          [`${s[`disabled`]}`]: disabled
         })}
    >
      {children}
    </button>
  )
}

export { Button }