<script setup>
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import BaseButton from "../base/BaseButton.vue";
import AuthModal from "../auth/AuthModal.vue";

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
};
</script>

<template>
    <div>
        <template v-if="isAuthenticated">
            <button @click="logout" class="text-primary-700 hover:text-primary-800 font-bold">
                Logout
            </button>
        </template>
        <template v-else>
            <BaseButton variant="secondary" @click="openLoginModal">Sign In</BaseButton>
            <BaseButton variant="primary" @click="openRegisterModal" class="ml-2">Sign Up</BaseButton>
        </template>

        <AuthModal v-if="showModal" :initial-form="modalForm" @close="closeModal" @click.self="closeModal" />
    </div>
</template>
