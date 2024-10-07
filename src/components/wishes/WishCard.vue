<script setup>
import { ref, computed } from "vue";
import { useWishStore } from "@/stores/wishStore";
import ConfirmationModal from "@/components/common/ConfirmationModal.vue";
import WishFormModal from "./WishFormModal.vue";
import BaseHeading from "@/components/base/BaseHeading.vue";
import DropdownMenu from "../common/DropdownMenu.vue";
import placeholderImage from "@/assets/images/landscape-placeholder.svg";

const props = defineProps({
  wish: {
    type: Object,
    required: true,
  },
  wishlistId: {
    type: Number,
    required: true,
  },
});

const wishStore = useWishStore();

const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);

const dropdownItems = [
  {
    label: "Edit",
    onClick: () => {
      isEditModalOpen.value = true;
    },
  },
  {
    label: "Delete",
    onClick: () => {
      isDeleteModalOpen.value = true;
    },
  },
];

const deleteWish = async () => {
  try {
    await wishStore.deleteWish(props.wish.id);
    isDeleteModalOpen.value = false;
  } catch (error) {
    console.error("Failed to delete wish", error);
  }
};

const imageSrc = computed(() => {
  return props.wish.imageUrl || placeholderImage;
});
</script>

<template>
  <div
    class="bg-white border-2 border-primary-100 text-secondary-700 p-6 rounded-lg relative flex flex-col gap-2"
  >
    <DropdownMenu :items="dropdownItems" class="absolute top-2 left-2" />

    <img
      :src="imageSrc"
      :alt="wish.imageUrl ? 'Wish Image' : 'Default Placeholder Image'"
      class="w-full h-48 object-cover rounded"
      loading="lazy"
    />

    <BaseHeading level="5">{{ wish.name }}</BaseHeading>
    <p>
      {{
        wish.description.length > 50
          ? wish.description.slice(0, 50) + "..."
          : wish.description
      }}
    </p>

    <div v-if="wish.itemUrl">
      <a
        :href="wish.itemUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary-600 hover:underline"
      >
        Visit Store
      </a>
    </div>

    <WishFormModal
      v-if="isEditModalOpen"
      :wish="wish"
      :is-edit-mode="true"
      :wishlist-id="wishlistId"
      @close="isEditModalOpen = false"
    />

    <ConfirmationModal
      v-if="isDeleteModalOpen"
      title="Delete Confirmation"
      message="Are you sure you want to delete this wish?"
      @confirm="deleteWish"
      @cancel="isDeleteModalOpen = false"
    />
  </div>
</template>
