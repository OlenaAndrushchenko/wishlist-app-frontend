<script setup>
import { ref } from "vue";
import WishCard from "./WishCard.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import WishFormModal from "./WishFormModal.vue";
import BaseHeading from "../base/BaseHeading.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const props = defineProps({
  wishes: {
    type: Array,
    default: () => [],
  },
  wishlistId: {
    type: Number,
    required: true,
  },
});

const isCreateModalOpen = ref(false);

const openCreateModal = () => {
  isCreateModalOpen.value = true;
};

const closeCreateModal = () => {
  isCreateModalOpen.value = false;
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center py-4 border-t">
      <BaseHeading level="4">Wishes</BaseHeading>
      <BaseButton @click="openCreateModal">Add New Wish</BaseButton>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <WishCard
        v-for="wish in wishes"
        :key="wish.id"
        :wish="wish"
        :wishlist-id="wishlistId"
      />

      <div
        class="border-dashed border-2 border-primary-200 p-4 rounded-lg flex items-center justify-center cursor-pointer"
        @click="openCreateModal"
      >
        <div class="text-center text-primary-700 hover:text-primary-800">
          <FontAwesomeIcon :icon="faPlusCircle" class="text-3xl mb-2" />
          <p class="font-bold">Add New Wish</p>
        </div>
      </div>
    </div>

    <WishFormModal
      v-if="isCreateModalOpen"
      :wishlist-id="wishlistId"
      @close="closeCreateModal"
    />
  </div>
</template>
