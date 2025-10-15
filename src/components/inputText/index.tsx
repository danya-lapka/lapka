'use client';
import { ChangeEvent, useState } from "react";
import { BaseProps } from "../props";
import s from './style.module.scss';
import clsx from "clsx";
import { FaSearch } from "react-icons/fa";

type Colors = 'white' | 'black';

interface inputTextProps extends BaseProps {
  color: Colors,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  width?: number,
  name?: string,
  search?: boolean,
  password?: boolean,
  pattern?: string,
  variant?: "default" | "outline",
  hint?: "default" | "placeholder",
}

const InputText: React.FC<inputTextProps> = ({
  children,
  className,
  color,
  width,
  name,
  onChange = ()=>{},
  search,
  password,
  pattern,
  variant = "default",
  hint = "default",
  ...rest
}) => {
  const [isValid, setIsValid] = useState(false);
  const checkIsValid = (e: ChangeEvent<HTMLInputElement>) => {
    setIsValid(e.target.value != '');
  }

  return (
    <label {...rest}
      style={{ width: `${width! / 16}rem` }}
      className={clsx(s[`class-${hint}`], s[`${color}-${variant}`], className, { 
        [s[`valid`]]: isValid,
        [`outline`]: variant == "outline"
      })}>
      <span className="f-r gap-8 j-between">{children}{search ? <FaSearch /> : ""}</span>
      <input onChange={(e) => {
        onChange(e);
        checkIsValid(e);
      }} name={name} type={password ? "password" : "text"} pattern={pattern} />
    </label>
  )
}

export { InputText }