<script setup>
import BaseHeading from "../base/BaseHeading.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHeart, faShareAlt, faLock } from "@fortawesome/free-solid-svg-icons";

const icons = {
  faHeart,
  faShareAlt,
  faLock,
};

const features = [
  {
    icon: "faHeart",
    title: "Intuitive Interface",
    description:
      "Navigate effortlessly with our user-friendly design, making wishlist management a breeze.",
  },
  {
    icon: "faShareAlt",
    title: "Easy Sharing",
    description:
      "Share your wishlist with friends and family effortlessly, making gift-giving simple and enjoyable.",
  },
  {
    icon: "faLock",
    title: "Secure Privacy",
    description:
      "Keep your wishlist private or share it selectively, ensuring your preferences are always protected.",
  },
];
</script>

<template>
  <section class="py-20">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="flex flex-col items-center text-center p-6 bg-primary-50 rounded-lg transition-transform duration-300 transform hover:scale-105"
        >
          <div class="mb-4">
            <FontAwesomeIcon
              :icon="icons[feature.icon]"
              class="w-10 h-10 text-primary-200"
            />
          </div>
          <BaseHeading level="5" class="mb-2">{{ feature.title }}</BaseHeading>
          <p>
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
