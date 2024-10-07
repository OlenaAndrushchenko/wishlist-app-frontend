<script setup>
import { ref, computed, watch } from "vue";
import { useWishStore } from "@/stores/wishStore";
import BaseHeading from "@/components/base/BaseHeading.vue";
import FormField from "@/components/base/FormField.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseCloseButton from "@/components/base/BaseCloseButton.vue";

const props = defineProps({
  wish: {
    type: Object,
    default: null,
  },
  isEditMode: {
    type: Boolean,
    default: false,
  },
  wishlistId: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["close", "saved"]);

const wishStore = useWishStore();

const form = ref({
  name: "",
  description: "",
  itemUrl: "",
  imageUrl: "",
  wishlistId: props.wishlistId,
});

let selectedFile = "";

const modalTitle = computed(() =>
  props.isEditMode ? "Edit wish" : "Add new wish"
);
const submitButtonText = computed(() =>
  props.isEditMode ? "Save changes" : "Add wish"
);

const initializeForm = () => {
  if (props.isEditMode && props.wish) {
    form.value = { ...props.wish };
  } else {
    form.value = {
      name: "",
      description: "",
      itemUrl: "",
      imageUrl: "",
      wishlistId: props.wishlistId,
    };
  }
};

watch(
  () => props.wish,
  () => {
    initializeForm();
  },
  { immediate: true }
);

const handleFileUpload = (event) => {
  selectedFile = event.target.files[0] || "";

  if (selectedFile !== "") {
    const reader = new FileReader();
    reader.onload = (e) => {
      form.value.imageUrl = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  } else {
    form.value.imageUrl = props.wish?.imageUrl || "";
  }
};

const submitForm = async () => {
  try {
    if (!form.value.wishlistId) {
      console.error("wishlistId is missing");
      return;
    }

    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    formData.append("data", JSON.stringify(form.value));

    if (props.isEditMode) {
      await wishStore.updateWish(form.value.id, formData);
    } else {
      await wishStore.createWish(formData);
    }
    emit("saved");
    emit("close");
  } catch (error) {
    console.error("Failed to save wish", error);
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

      <BaseHeading level="3">{{ modalTitle }}</BaseHeading>

      <form @submit.prevent="submitForm" class="space-y-4">
        <FormField
          id="name"
          label="Name"
          v-model="form.name"
          placeholder="Enter the name of your wish"
          :required="true"
        />

        <div>
          <FormField
            id="description"
            label="Description"
            type="textarea"
            maxlength="255"
            v-model="form.description"
            placeholder="Describe your wish or add some comments like size, color, etc."
          />
          <div class="text-sm text-secondary-500 mt-1">
            <span>
              {{ 255 - (form.description?.length || 0) }} characters remaining
            </span>
          </div>
        </div>

        <FormField
          id="itemUrl"
          label="Item URL"
          v-model="form.itemUrl"
          placeholder="https://example.com/item"
        />

        <div>
          <label for="image" class="text-secondary-700 text-sm font-medium">
            Image
          </label>
          <div
            class="flex items-center border-dashed border-2 border-primary-200 p-4 rounded-lg justify-center"
          >
            <input
              type="file"
              id="image"
              accept="image/*"
              @change="handleFileUpload"
              class="w-full p-2.5 text-sm rounded-md"
            />
            <img
              v-if="form.imageUrl"
              :src="form.imageUrl"
              alt="Current Wish Image"
              class="w-24 h-24 object-cover rounded"
            />
          </div>
        </div>

        <div class="flex justify-end space-x-2">
          <BaseButton variant="secondary" @click="emit('close')"> Cancel </BaseButton>
          <BaseButton type="submit"> {{ submitButtonText }} </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>
