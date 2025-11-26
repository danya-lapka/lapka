<template>
  <button
  :class="classes"
  :type="type"
  @click="$emit('click', $event)"
  >
  <!--
    @slot Button main content
    @slotname default
    @example
    ```vue
    <Button>Your text</Button>
    ```
  -->
    <slot>Button</slot>
  </button>
</template>
<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ColorPair, Size } from './types';

const attrs = useAttrs();
interface Props {
  /**
   * Button Size
   * @values "xl", "lg", "md", "sm", "xs"
   * @default "md"
   */
  size?: Size,

  /**
   * HTML-type for button
   * @values "button", "submit", "reset"
   * @default "button"
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#type} - MDN docs
   */
  type?: "button"|"submit"|"reset",

  /**
   * Outline button style
   * Modify color with bg prop
   * @default false
   */
  outline?: boolean,

  /**
   * Background for button (default/hover)
   * @default "white/gray1"
   */
  bg?: ColorPair,

  /**
   * Text color for button (default/hover)
   * @default "black/gray3"
   */
  text?: ColorPair
}
const props = withDefaults(defineProps<Props>(),{
  size: "md",
  type: "button",
  outline: false,
  bg: "white/gray1",
  text: "black/gray3",
});

interface Emits {
  /**
   * Button onClick event
   * @event 
   * @param {MouseEvent} event - Default click event
   * @example
   * ```vue
   * <Button @click="handleClick" />
   * ```
   */
  (e: 'click', event: MouseEvent): void
}
const emits = defineEmits<Emits>(); 

const getColors = (colors: ColorPair, prefix: "bg"|"color"|"border"): string => {
  const [baseColor, hoverColor] = colors.split("/");
  return `${prefix}-${baseColor} hover:${prefix}-${hoverColor}`;
}
const getSize = (size: Size): string => {
  let result: string;
  switch (size) {
    case 'xl': result = `body-1 px-20 py-10 g-12 r-12`; break;
    case 'lg': result = `body-2 px-16 py-8 g-10 r-10`; break;
    case 'md': result = `body-3 px-12 py-6 g-8 r-8`; break;
    case 'sm': result = `body-4 px-8 py-4 g-6 r-6`; break;
    case 'xs': result = `body-5 px-4 py-2 g-4 r-4`; break;
  }
  return result;
}
const classColors = (outline: boolean): string => {
  let colors = [];
  if (outline) {
    colors = [
      `border-w-1 border-solid bg-transparent`,
      getColors(props.bg, "color"),
      getColors(props.bg, "border")
    ]
  } else {
    colors = [
      getColors(props.text, "color"),
      getColors(props.bg, "bg")
    ]
  }
  return colors.join(" ");
}

const classes = computed(() => {
  return (
  [
    attrs.class,
    "dis-flex f-row f-nowrap c-pointer",
    classColors(props.outline),
    getSize(props.size)
  ].join(" ")
  );
})

</script>
<style scoped>
</style>
