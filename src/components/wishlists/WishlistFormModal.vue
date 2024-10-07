<script setup>
import { ref, computed, watch } from "vue";
import { useWishlistsStore } from "@/stores/wishlistStore";
import BaseHeading from "@/components/base/BaseHeading.vue";
import FormField from "@/components/base/FormField.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseCloseButton from "@/components/base/BaseCloseButton.vue";

const props = defineProps({
  wishlist: {
    type: Object,
    default: null,
  },
  isEditMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "saved"]);

const form = ref({
  title: "",
  description: "",
  shared: false,
});

const wishlistsStore = useWishlistsStore();

const modalTitle = computed(() =>
  props.isEditMode ? "Edit Wishlist" : "Create Wishlist"
);
const submitButtonText = computed(() =>
  props.isEditMode ? "Save changes" : "Create"
);

const initializeForm = () => {
  if (props.isEditMode && props.wishlist) {
    form.value = { ...props.wishlist };
  } else {
    form.value = {
      title: "",
      description: "",
      shared: false,
    };
  }
};

watch(
  () => props.wishlist,
  () => {
    initializeForm();
  },
  { immediate: true }
);

const submitForm = async () => {
  try {
    if (props.isEditMode) {
      await wishlistsStore.updateWishlist(props.wishlist.id, form.value);
    } else {
      await wishlistsStore.createWishlist(form.value);
    }
    emit("saved");
    emit("close");
  } catch (error) {
    console.error("Failed to save wishlist", error);
  }
};
</script>

<template>
  <div
    class="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-black/70"
  >
    <div
      class="relative mx-4 md:mx-16 bg-primary-50 rounded-[20px] max-h-[90vh] overflow-y-auto min-w-[90vw] sm:min-w-[600px] p-6 md:p-10 flex-col gap-6 inline-flex text-secondary-700"
    >
      <BaseCloseButton @close="emit('close')" />

      <BaseHeading level="3" class="pr-10">{{ modalTitle }}</BaseHeading>

      <form @submit.prevent="submitForm" class="space-y-4">
        <FormField
          id="title"
          label="Title"
          v-model="form.title"
          :required="true"
        />

        <div>
          <FormField
            id="description"
            label="Description"
            type="textarea"
            maxlength="255"
            v-model="form.description"
          />
          <div class="text-sm text-secondary-500 mt-1">
            <span>
              {{ 255 - (form.description?.length || 0) }} characters remaining
            </span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <input
            id="shared"
            type="checkbox"
            v-model="form.shared"
            class="w-4 h-4 text-primary-600 bg-secondary-100 border-secondary-300 rounded focus:ring-primary-500"
          />
          <label for="shared">Shared</label>
        </div>

        <div class="flex justify-end space-x-2">
          <BaseButton variant="secondary" @click="emit('close')">
            Cancel
          </BaseButton>
          <BaseButton type="submit">{{ submitButtonText }}</BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>
