<script setup>
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import BaseButton from "../base/BaseButton.vue";
import AuthModal from "../auth/AuthModal.vue";
import { useRouter } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserPlus, faSignIn, faPersonWalkingDashedLineArrowRight } from "@fortawesome/free-solid-svg-icons";

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
      <BaseButton variant="secondary" @click="logout">
        Logout
        <FontAwesomeIcon :icon="faPersonWalkingDashedLineArrowRight" class="ml-2" />
      </BaseButton>
    </div>
    <div v-else>
      <BaseButton variant="secondary" @click="openLoginModal">
        <FontAwesomeIcon :icon="faSignIn" class="mr-2 hidden md:inline" />
        Sign In
      </BaseButton>
      <BaseButton variant="primary" @click="openRegisterModal" class="ml-3">
        <FontAwesomeIcon :icon="faUserPlus" class="mr-2 hidden md:inline" />
        Sign Up
      </BaseButton>
    </div>

    <AuthModal v-if="showModal" :initial-form="modalForm" @close="closeModal" />
  </div>
</template>
