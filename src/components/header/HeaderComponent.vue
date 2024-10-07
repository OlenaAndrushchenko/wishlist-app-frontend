<script setup>
import { RouterLink, useRoute } from "vue-router";
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import AuthButtons from "./AuthButtons.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const route = useRoute();

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <header class="bg-white shadow-md shadow-primary-900/5">
    <div
      class="container mx-auto flex flex-wrap gap-2 justify-between items-center p-4"
    >
      <RouterLink to="/" class="text-2xl font-bold text-primary-700">
        WishlistApp
      </RouterLink>

      <button
        @click="toggleMenu"
        class="md:hidden text-primary-700 focus:outline-none"
        aria-label="Toggle Navigation Menu"
      >
        <FontAwesomeIcon
          :icon="isMenuOpen ? faTimes : faBars"
          class="h-6 w-6"
        />
      </button>
      <nav
        :class="{
          block: isMenuOpen,
          hidden: !isMenuOpen,
          'md:block': true,
        }"
        class="absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300 ease-in-out"
      >
        <ul class="flex flex-col md:flex-row md:space-x-6">
          <li v-if="isAuthenticated">
            <RouterLink
              to="/wishlists"
              class="block px-4 py-2 text-primary-700 hover:text-primary-800 transition-colors duration-200"
              :class="{
                'font-semibold text-primary-700': route.name === 'wishlists',
              }"
              @click="closeMenu"
            >
              My Wishlists
            </RouterLink>
          </li>
        </ul>
      </nav>
      <AuthButtons />
    </div>
  </header>
</template>
