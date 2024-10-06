<script setup>
import BaseButton from '@/components/base/BaseButton.vue';
import BaseHeading from '@/components/base/BaseHeading.vue';
import BaseCloseButton from '@/components/base/BaseCloseButton.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Confirmation',
  },
  message: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['confirm', 'cancel']);
</script>

<template>
  <div
    class="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-black/70"
  >
    <div
      class="relative mx-4 md:mx-16 bg-primary-50 rounded-[20px] max-h-[90vh] overflow-y-auto min-w-[90vw] sm:min-w-[600px] p-6 md:p-10 flex-col gap-6 inline-flex text-secondary-700"
    >

      <BaseCloseButton @close="emit('cancel')" />

      <BaseHeading level="3" class="pr-10">{{ title }}</BaseHeading>

      <div class="modal-body">
        <p>{{ message }}</p>
      </div>

      <div class="flex justify-end space-x-2">
        <BaseButton variant="secondary" @click="emit('cancel')">Cancel</BaseButton>
        <BaseButton variant="danger" @click="emit('confirm')">Confirm</BaseButton>
      </div>
    </div>
  </div>
</template>
