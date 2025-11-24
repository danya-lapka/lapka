<template>
  
  <button
    :type="type"
    :class="`${classes} ${props.class}`"
    @click="$emit('click', $event)"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @keydown="$emit('keydown', $event)">
    <slot name="default">
      Button
    </slot>
  </button>

</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { DefaultProps } from '../types';
import { getColorClasses } from '../types';

interface Props extends DefaultProps {
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  size: 'md',
  type: 'button',
  bg: 'white-gray1',
  color: 'black-gray3'
});

const sizeClasses = {
  xs: 'body-5 px-4  py-2  r-4  g-4',
  sm: 'body-4 px-8  py-4  r-6  g-6',
  md: 'body-3 px-12 py-6  r-8  g-8',
  lg: 'body-2 px-16 py-8  r-10 g-10',
  xl: 'body-1 px-20 py-10 r-12 g-12',
} as const;

const getSizeClasses = (size: typeof props.size) => sizeClasses[size];

const classes = computed(() => {
  return [
    'flex f-row f-nowrap ai-center jc-center',
    getSizeClasses(props.size),
    getColorClasses(props.bg, 'bg'),
    getColorClasses(props.color, 'color')
  ].join(' ');
});

const emit = defineEmits<{
  click: [event: MouseEvent];
  mouseenter: [event: MouseEvent];
  mouseleave: [event: MouseEvent];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  keydown: [event: KeyboardEvent];
}>();

</script>
<style scoped>
</style>
