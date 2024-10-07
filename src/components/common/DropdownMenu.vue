<script setup>
import { ref, onMounted, onUnmounted, defineProps } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  buttonClass: {
    type: String,
    default: 'w-10 h-10 rounded-full flex justify-center items-center bg-primary-50 hover:bg-primary-100',
  },
  icon: {
    type: Object,
    default: faEllipsisV,
  },
  menuClass: {
    type: String,
    default: 'min-w-[150px] bg-white border rounded shadow mt-2 z-10',
  },
  buttonIconClass: {
    type: String,
    default: 'text-primary-700 hover:text-primary-800',
  },
});

const isOpen = ref(false);
const dropdownRef = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div ref="dropdownRef">
    <button @click.stop="toggleDropdown" :class="buttonClass">
      <FontAwesomeIcon :icon="icon" :class="buttonIconClass" />
    </button>

    <div v-if="isOpen" :class="menuClass">
      <button
        v-for="(item, index) in items"
        :key="index"
        @click="item.onClick(); isOpen = false"
        class="px-4 py-2 text-left w-full hover:bg-primary-200"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>
