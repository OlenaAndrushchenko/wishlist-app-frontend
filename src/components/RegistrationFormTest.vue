<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const username = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const successMessage = ref('');

const store = useAuthStore();

const register = async () => {
  try {
    await store.register(username.value, email.value, password.value);
    username.value = '';
    email.value = '';
    password.value = '';
    successMessage.value = 'Registration successful!';
  } catch (err) {
    error.value = err.response?.data || err.message;
  }
};
</script>

<template>
  <div class="form">
    <h1>Register</h1>
    <input v-model="username" placeholder="Username" />
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="register">Register</button>
    <p v-if="error">{{ error }}</p>
    <p v-if="successMessage">{{ successMessage }}</p>
  </div>
</template>
