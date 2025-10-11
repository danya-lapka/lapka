import { BaseProps } from "../props";
import s from './style.module.scss';
import clsx from "clsx";

type Colors = 'white' | 'black';

interface inputTextProps extends BaseProps {
  color: Colors,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  width?: number,
  name?: string
}

const InputText: React.FC<inputTextProps> = ({
  children,
  className,
  color,
  width,
  name,
  onChange,
  ...rest
}) => {
  return (
    <label {...rest}
           style={{ width: `${width! / 16}rem` }}
           className={clsx(s.class, s[color], className)}>
      <span>{children}</span>
      <input onChange={onChange} name={name} type="text" />
    </label>
  )
}

export { InputText }