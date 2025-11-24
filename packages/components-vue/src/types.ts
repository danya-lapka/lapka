type Sizes = "xl"|"lg"|"md"|"sm"|"xs";

type ColorsGray = "white"|"gray1"|"gray2"|"gray3"|"black";
type ColorsAccent = "accent"|"accent1"|"accent2"|"accent3";
type ColorsStatus = "info"|"info-alt"|"success"|"success-alt"|"warn"|"warn-alt"|"error"|"error-alt";
type Colors = ColorsGray | ColorsAccent | ColorsStatus;

interface DefaultProps {
  class?: string; 
  size?: Sizes;
  bg?: `${Colors}-${Colors}`;
  color?: `${Colors}-${Colors}`;
}

export const getColorClasses = (input: `${Colors}-${Colors}`, prefix: "bg"|"color") => {
  const idx = input.lastIndexOf("-");
  if (idx === -1) {
    throw new Error(`Invalid format "${input}". Expected "<bg>-<hover>", colors may contain "-" inside.`);
  }

  const def = input.slice(0, idx);
  const hover = input.slice(idx + 1);
  if (!def || !hover) {
    throw new Error(`Invalid color pair string: "${input}". Expected format "white-black".`);
  }

  return `${prefix}-${def} hover:${prefix}-${hover}`;
}

export type { DefaultProps };
