<template>
  <button
  :class="classes"
  :type="type"
  @click="$emit('click', $event)"
  >
  <slot>Button</slot>
  </button>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { DefaultProps, ColorPair } from './types';

/**
 * Button Props
 */
interface Props extends DefaultProps {
  /**
   * HTML-type for button
   * @values "button", "submit", "reset"
   * @default "button"
   */
  type?: "button"|"submit"|"reset",

  /**
   * Outline button style
   * @default false
   */
  outline?: boolean,

  /**
   * Background for button (default-hover)
   * @default white/gray1
   */
  bg?: ColorPair,

  /**
   * Text color for button (default/hover)
   * @default black/gray3
   */
  text?: ColorPair
}
const props = withDefaults(defineProps<Props>(),{
  type: "button",
  outline: false,
  bg: "white/gray1",
  text: "black/gray3"
});

/**
 * Button emits
 */
interface Emits {
  /**
   * onClick event
   * @param event MouseEvent
   */
  (e: 'click', event: MouseEvent): void
}
const emits = defineEmits<Emits>(); 

const getColors = (colors: ColorPair, prefix: "bg"|"color"): string => {
  const [baseColor, hoverColor] = colors.split("/");
  return `${prefix}-${baseColor} hover:${prefix}-${hoverColor}`;
} 

const classes = computed(() => {
  return (
  [
    props.class,
    getColors(props.bg, "bg"),
    getColors(props.text, "color")
  ].join(" ")
  );
})

</script>
<style scoped>
</style>
