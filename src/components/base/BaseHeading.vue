<script setup>
import { computed } from 'vue';

const props = defineProps({
  level: {
    type: String,
    default: '1',
    validator: (value) => ['1', '2', '3', '4', '5'].includes(value)
  },
  text: String
});

const textSizeClass = computed(() => {
  const levelInt = parseInt(props.level);
  return `text-${levelInt}xl md:text-${levelInt + 1}xl`;
});
</script>

<template>
  <component :is="'h' + props.level" :class="textSizeClass">
    <slot />
  </component>
</template>

