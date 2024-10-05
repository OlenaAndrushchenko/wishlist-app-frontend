<script setup>
import { useAuthStore } from '@/stores/authStore';

const store = useAuthStore();

const logout = () => {
  store.logout();
};
</script>

<template>
  <button @click="logout">Logout</button>
</template>