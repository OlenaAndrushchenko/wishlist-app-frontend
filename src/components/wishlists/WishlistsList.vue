<script setup>
import { useWishlistsStore } from "@/stores/wishlistStore";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import WishlistCard from "./WishlistCard.vue";
import WishlistFormModal from "./WishlistFormModal.vue";

const wishlistsStore = useWishlistsStore();
const { wishlists } = storeToRefs(wishlistsStore);

const isCreateModalOpen = ref(false);

onMounted(() => {
  wishlistsStore.getWishlists();
});

const openCreateModal = () => {
  isCreateModalOpen.value = true;
};
</script>

<template>
  <div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <div
        class="border-dashed border-2 border-primary-200 p-4 rounded-lg flex items-center justify-center cursor-pointer"
        @click="openCreateModal"
      >
        <div class="text-center text-primary-700 hover:text-primary-800">
          <FontAwesomeIcon :icon="faPlusCircle" class="text-3xl mb-2" />
          <p class="font-bold">Create Wishlist</p>
        </div>
      </div>
      <WishlistCard
        v-for="wishlist in wishlists"
        :key="wishlist.id"
        :wishlist="wishlist"
      />
    </div>

    <WishlistFormModal
      v-if="isCreateModalOpen"
      @close="isCreateModalOpen = false"
    />
  </div>
</template>
