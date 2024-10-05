<script setup>
import { computed } from 'vue';

const props = defineProps({
  level: {
    type: String,
    default: '1',
    validator: (value) => ['1', '2', '3', '4', '5'].includes(value)
  },
  style: {
    type: String,
    default: 'text-secondary-900 font-medium',
  },
  text: String
});

const textSizeClass = computed(() => {
  const sizeMapping = {
    '1': '5xl',
    '2': '4xl',
    '3': '3xl',
    '4': '2xl',
    '5': 'xl'
  };
  const baseSize = sizeMapping[props.level] || '3xl';
  const responsiveSize = `md:text-${parseInt(baseSize.slice(0, -2)) + 1}xl`;
  return `text-${baseSize} ${responsiveSize}`;
});
</script>

<template>
  <component :is="'h' + props.level" :class="[textSizeClass, props.style]">
    <slot />
  </component>
</template>
