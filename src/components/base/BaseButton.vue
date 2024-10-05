<script setup>
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  variant: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "md",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case "primary":
      return "text-primary-50 inline-flex items-center bg-primary-700 hover:bg-primary-800 border-2 border-transparent font-medium text-center";
    case "secondary":
      return "text-primary-900 inline-flex items-center border-2 border-primary-700 hover:bg-primary-700/15 font-medium text-center";
    case "danger":
      return "text-red-50 inline-flex items-center bg-red-700 hover:bg-red-800 border-2 border-transparent font-medium text-center";
    default:
      return "text-primary-50 inline-flex items-center bg-primary-700 hover:bg-primary-800 font-medium text-center";
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "px-3 py-1 text-sm";
    case "md":
      return "px-5 py-2.5 text-base";
    case "lg":
      return "px-6 py-3 text-lg";
    default:
      return "px-5 py-2.5 text-base";
  }
});
</script>

<template>
  <button
    :type="props.type"
    :class="[
      'base-button',
      variantClasses,
      sizeClasses,
      {
        'opacity-50 cursor-not-allowed': disabled,
      },
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  border-radius: 0.375rem;
  transition: background-color 0.3s;
}
</style>
