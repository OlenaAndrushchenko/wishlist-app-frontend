<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import AuthButtons from './AuthButtons.vue';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
</script>

<template>
  <header class="border-b">
    <div class="container mx-auto flex flex-row justify-between items-center p-4">
      <RouterLink to="/"> LOGO </RouterLink>
      <nav class="w-fit">
        <div v-if="isAuthenticated">
          <RouterLink to="/wishlists"> My Wishlists </RouterLink>
        </div>
      </nav>
      <AuthButtons />
    </div>
  </header>
</template>

<style scoped>
header {
    line-height: 1.5;
  }
  
  nav {
    text-align: center;
  }
  
  nav a {
    margin-left: 10px;
  }
</style>