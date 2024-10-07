<script setup>
import BaseHeading from "../base/BaseHeading.vue";
import heroImage from "@/assets/images/hero.jpg";
</script>

<template>
  <section class="bg-primary-100 py-10">
    <div
      class="container mx-auto px-4 flex flex-col-reverse md:flex-row md:gap-8 items-center"
    >
      <div class="md:w-1/2">
        <BaseHeading level="1" class="mb-6">
          Create Your Perfect Wishlist
        </BaseHeading>
        <p class="text-lg md:text-xl mb-8">
          From gifts to experiences, organize everything you desire in one
          place. Share with loved ones and make your dreams come true.
        </p>
      </div>

      <div class="md:w-1/2 mb-8 md:mb-0">
        <img
          :src="heroImage"
          alt="Wishlist Illustration"
          class="w-full h-auto rounded-3xl"
        />
      </div>
    </div>
  </section>
</template>
