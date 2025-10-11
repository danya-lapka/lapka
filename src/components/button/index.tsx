import { BaseProps } from "../props";
import s from './style.module.scss';
import clsx from "clsx";

type Colors = 'white'|'black'|'accent'|'accent-alt'|'white-accent'|'black-accent';

interface ButtonProps extends BaseProps {
  color: Colors,
  onClick?: React.MouseEventHandler
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  color,
  onClick,
  ...rest
}) => {
  return (
    <div {...rest} 
         onClick={onClick} 
         className={clsx(s.class, s[color], className)}
    >
      {children}
    </div>
  )
}

export { Button }