export type Colors = "white"|"gray1"|"gray2"|"gray3"|"black"|
"accent"|"accent1"|"accent2"|"accent3"|
"success"|"success-alt"|"warn"|"warn-alt"|"info"|"info-alt"|"error"|"error-alt";

export type ColorPair = `${Colors}/${Colors}`

export interface DefaultProps {
  class?: string  
}