'use client';
import { A } from '@/components';
import s from './style.module.scss';
import { BaseProps } from '@/components';

interface LinkCardProps extends BaseProps {
  href: string,
  tooltip?: string
}

const LinkCard: React.FC<LinkCardProps> = ({ children, href, tooltip }) => {
  return (
    <div className={`${s[`link-card`]}`}>
      <span className={`${s[`link-card-tooltip`]} body-6 bg-accent-3 color-white pad-all-8 rad-all-8`}>
        {tooltip}
      </span>
      <A color='black-accent-alt' href={href} target='_blank' className={`${s[`link-card-name`]} f-r heading-4 gap-16 bg-white pad-h-24 pad-v-16 rad-all-16 a-center`}>
        {children}
      </A>
    </div>
  );
}

export { LinkCard }