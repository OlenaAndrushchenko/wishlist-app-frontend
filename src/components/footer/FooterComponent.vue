<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-primary-800 text-primary-200 py-4">
    <div
      class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between"
    >
      <p class="text-sm">
        &copy; {{ currentYear }} Wishlist App. All rights reserved.
      </p>

      <p class="text-sm mt-2 md:mt-0">
        Developed by
        <a
          href="https://github.com/OlenaAndrushchenko"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary-100 hover:text-primary-50"
        >
          Olena
        </a>
      </p>
    </div>
  </footer>
</template>
