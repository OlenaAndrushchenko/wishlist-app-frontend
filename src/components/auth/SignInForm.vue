<script setup>
import { ref } from "vue";
import FormField from "@/components/base/FormField.vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import BaseButton from "../base/BaseButton.vue";
import BaseHeading from "../base/BaseHeading.vue";

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const authStore = useAuthStore();
const router = useRouter();

const props = defineProps(["closeModal"]);

async function handleLogin() {
  errorMessage.value = "";
  try {
    await authStore.login(email.value, password.value);

    if (authStore.isAuthenticated) {
      email.value = "";
      password.value = "";
      props.closeModal();
      router.push('/wishlists');
    }
  } catch (error) {
    console.error("Login failed:", error);
    errorMessage.value = "Login failed. Please try again.";
  }
}
</script>

<template>
  <div class="flex flex-col gap-2.5">
    <BaseHeading level="3">Welcome!</BaseHeading>
    <p>Login to your Account</p>
  </div>

  <form @submit.prevent="handleLogin" class="flex flex-col gap-8">
    <div class="w-full flex flex-col gap-5">
      <FormField
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        v-model="email"
      />

      <FormField
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        v-model="password"
      />
      
      <p v-if="errorMessage" class="text-red-500 text-sm">
        {{ errorMessage }}
      </p>
    </div>

    <BaseButton type="submit" class="w-full"> Login </BaseButton>
  </form>
</template>
