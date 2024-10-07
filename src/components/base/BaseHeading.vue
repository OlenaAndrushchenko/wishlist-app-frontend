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
    default: 'font-medium text-primary-900',
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

  const responsiveSizeMapping = {
    '5xl': '6xl',
    '4xl': '5xl',
    '3xl': '4xl',
    '2xl': '3xl',
    'xl': '2xl',
    'lg': 'xl'
  };

  const baseSize = sizeMapping[props.level] || '3xl';
  const responsiveSize = responsiveSizeMapping[baseSize] || '4xl';

  return `text-${baseSize} md:text-${responsiveSize}`;
});
</script>

<template>
  <component :is="'h' + props.level" :class="[textSizeClass, props.style]">
    <slot />
  </component>
</template>
