<script setup>
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import BaseButton from "../base/BaseButton.vue";
import AuthModal from "../auth/AuthModal.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);

const showModal = ref(false);
const modalForm = ref("login");

const openLoginModal = () => {
  modalForm.value = "login";
  showModal.value = true;
};

const openRegisterModal = () => {
  modalForm.value = "register";
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>

<template>
  <div>
    <div v-if="isAuthenticated">
      <button
        @click="logout"
        class="text-primary-700 hover:text-primary-800 font-bold"
      >
        Logout
      </button>
    </div>
    <div v-else>
      <BaseButton variant="secondary" @click="openLoginModal">
        Sign In
      </BaseButton>
      <BaseButton variant="primary" @click="openRegisterModal" class="ml-2">
        Sign Up
      </BaseButton>
    </div>

    <AuthModal v-if="showModal" :initial-form="modalForm" @close="closeModal" />
  </div>
</template>
