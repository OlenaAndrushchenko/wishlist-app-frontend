<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const email = ref('');
const password = ref('');
const error = ref('');

const store = useAuthStore();

const login = async () => {
  try {
    await store.login(email.value, password.value);
    email.value = '';
    password.value = '';
  } catch (err) {
    error.value = err.message;
    console.error("Login error:", err);
  }
};
</script>

<template>
  <div class="form">
    <h1>Login</h1>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
