<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import FormField from "@/components/base/FormField.vue";
import BaseButton from "../base/BaseButton.vue";
import BaseHeading from "../base/BaseHeading.vue";

const props = defineProps(["closeModal"]);

const authStore = useAuthStore();

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const errorMessage = ref("");
const passwordError = ref("");
const successMessage = ref("");


const validateForm = () => {
  passwordError.value = "";
  errorMessage.value = "";
  let isValid = true;

  if (password.value !== confirmPassword.value) {
    passwordError.value = "Passwords do not match.";
    isValid = false;
  }

  if (password.value.length < 5) {
    passwordError.value = "Password must be at least 5 characters long.";
    isValid = false;
  }

  return isValid;
};

async function handleSignUp() {
  if (validateForm()) {
    try {
      await authStore.register(username.value, email.value, password.value);

      username.value = "";
      password.value = "";
      confirmPassword.value = "";
      email.value = "";
      successMessage.value = "Registration successful! You can now log in.";
    } catch (error) {
      console.error("Registration failed:", error);
      errorMessage.value = authStore.errorMessage || "Registration failed. Please try again.";
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-2.5">
    <BaseHeading level="3">Sign Up</BaseHeading>
    <p class="text-secondary-700">Create your Account</p>
  </div>

  <form @submit.prevent="handleSignUp" class="flex flex-col gap-8">
    <div class="w-full flex flex-col gap-5">
      <FormField
        id="username"
        label="Username"
        type="text"
        placeholder="Enter your username"
        :required="true"
        v-model="username"
      />

      <FormField
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        :required="true"
        v-model="email"
      />

      <FormField
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        :required="true"
        v-model="password"
        :error="passwordError"
      />

      <FormField
        id="confirm-password"
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        :required="true"
        v-model="confirmPassword"
        :error="passwordError"
      />
    </div>
    
    <BaseButton type="submit" class="w-full"> Sign Up </BaseButton>
  </form>
  <p v-if="successMessage" class="text-green-700 text-sm">
    {{ successMessage }}
  </p>

  <p v-if="errorMessage" class="text-red-500 text-sm">
    {{ errorMessage }}
  </p>
</template>
