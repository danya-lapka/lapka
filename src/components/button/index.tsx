import { BaseProps } from "../props";
import s from './style.module.scss';
import clsx from "clsx";

type Colors = "white"|"black"|"gray-1"|"gray-3"|"white-accent"|"black-accent"|"accent"|"accent-alt"|"accent-1"|"accent-3";

interface ButtonProps extends BaseProps {
  color: Colors,
  onClick?: React.MouseEventHandler,
  variant?: "default"|"outline"
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  color,
  onClick,
  variant = "default",
  ...rest
}) => {
  return (
    <div {...rest} 
         onClick={onClick} 
         className={clsx(s.class, s[`${color}-${variant}`], className, {
          [`outline`]: variant == "outline"
         })}
    >
      {children}
    </div>
  )
}

export { Button }