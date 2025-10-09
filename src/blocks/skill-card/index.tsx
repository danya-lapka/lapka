import s from './style.module.scss';
import { BaseProps } from '@/components';

const SkillCard = ({
  children,
  className
}: BaseProps) => {
  return (
    <div className={`${s[`skill-card`]} ${className} f-c gap-16 pad-all-20 bg-white color-black rad-all-12`}>
      {children}
    </div>
  );
}

SkillCard.Name = ({
  children
}: BaseProps) => {
  return (
    <div className={`${s[`skill-name`]} body-1 f-r gap-16 a-center`}>
      {children}
    </div>
  );
}

SkillCard.Icon = ({
  children
}: BaseProps) => {
  return (
    <div className={`${s[`skill-icon`]} f-r`}>
      {children}
    </div>
  );
}

SkillCard.Description = ({
  children
}: BaseProps) => {
  return (
    <div className={`${s[`skill-discription`]} body-5`}>
      {children}
    </div>
  );
}

export { SkillCard }