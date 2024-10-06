<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useWishlistsStore } from "@/stores/wishlistStore";
import ConfirmationModal from "@/components/common/ConfirmationModal.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faShareAlt, faLock, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import WishlistFormModal from "./WishListFormModal.vue";
import BaseHeading from "../base/BaseHeading.vue";

const props = defineProps({
  wishlist: {
    type: Object,
    required: true,
  },
});

const wishlistsStore = useWishlistsStore();

const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const isDropdownOpen = ref(false);

const openEditModal = () => {
  isEditModalOpen.value = true;
};

const openDeleteModal = () => {
  isDeleteModalOpen.value = true;
};

const deleteWishlist = async () => {
  try {
    await wishlistsStore.deleteWishlist(props.wishlist.id);
    isDeleteModalOpen.value = false;
  } catch (error) {
    console.error("Failed to delete wishlist", error);
  }
};

const dropdownRef = ref(null);

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div
    class="bg-white border-2 border-primary-100 text-secondary-700 px-6 pt-14 pb-6 rounded-lg relative"
  >
    <div class="absolute top-2 right-2">
      <FontAwesomeIcon
        :icon="wishlist.shared ? faShareAlt : faLock"
        class="text-primary-300"
        title="Visibiliry"
      />
    </div>

    <div class="absolute top-2 left-2 z-10" ref="dropdownRef">
      <button
        @click.stop="isDropdownOpen = !isDropdownOpen"
        class="w-10 h-10 rounded-full flex justify-center items-center bg-primary-50 hover:bg-primary-100"
      >
        <FontAwesomeIcon
          :icon="faEllipsisV"
          class="text-primary-700 hover:text-primary-800"
        />
      </button>
      <div
        v-if="isDropdownOpen"
        class="min-w-[150px] absolute bg-white border rounded shadow mt-2"
      >
        <button
          @click.prevent="openEditModal"
          class="px-4 py-2 text-left w-full hover:bg-primary-200"
        >
          Edit
        </button>
        <button
          @click.prevent="openDeleteModal"
          class="px-4 py-2 text-left w-full hover:bg-primary-200"
        >
          Delete
        </button>
      </div>
    </div>

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
