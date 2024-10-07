<script setup>
import { ref } from "vue";
import { useWishlistsStore } from "@/stores/wishlistStore";
import ConfirmationModal from "@/components/common/ConfirmationModal.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faShareAlt, faLock } from "@fortawesome/free-solid-svg-icons";
import WishlistFormModal from "./WishlistFormModal.vue";
import BaseHeading from "../base/BaseHeading.vue";
import DropdownMenu from "../common/DropdownMenu.vue";

const props = defineProps({
  wishlist: {
    type: Object,
    required: true,
  },
});

const wishlistsStore = useWishlistsStore();

const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);

const dropdownItems = [
  {
    label: 'Edit',
    onClick: () => {
      isEditModalOpen.value = true;
    },
  },
  {
    label: 'Delete',
    onClick: () => {
      isDeleteModalOpen.value = true;
    },
  },
];

const deleteWishlist = async () => {
  try {
    await wishlistsStore.deleteWishlist(props.wishlist.id);
    isDeleteModalOpen.value = false;
  } catch (error) {
    console.error("Failed to delete wishlist", error);
  }
};
</script>

<template>
  <div
    class="bg-white border-2 border-primary-100 text-secondary-700 px-6 pt-14 pb-6 rounded-lg relative transition-transform duration-300 transform hover:scale-105"
  >
    <div class="absolute top-2 right-2">
      <FontAwesomeIcon
        :icon="wishlist.shared ? faShareAlt : faLock"
        class="text-primary-300"
        title="Visibiliry"
      />
    </div>

    <DropdownMenu :items="dropdownItems" class="absolute top-2 left-2" />

    <router-link :to="`/wishlists/${wishlist.id}`">
      <BaseHeading level="5" class="mb-2">{{ wishlist.title }}</BaseHeading>
  
      <p class="mb-4">
        {{
          wishlist.description.length > 50
            ? wishlist.description.slice(0, 50) + "..."
            : wishlist.description
        }}
      </p>
  
      <p class="text-secondary-500">
        Wishes: {{ wishlist.items ? wishlist.items.length : 0 }}
      </p>
    </router-link>

    <WishlistFormModal
      v-if="isEditModalOpen"
      :wishlist="wishlist"
      :is-edit-mode="true"
      @close="isEditModalOpen = false"
    />

    <ConfirmationModal
      v-if="isDeleteModalOpen"
      title="Delete Confirmation"
      message="Are you sure you want to delete this wishlist?"
      @confirm="deleteWishlist"
      @cancel="isDeleteModalOpen = false"
    />
  </div>
</template>
