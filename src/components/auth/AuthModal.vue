<script setup>
import { ref, watch } from 'vue'
import SignInForm from './SignInForm.vue'
import SignUpForm from './SignUpForm.vue'
import BaseCloseButton from '../base/BaseCloseButton.vue';

const props = defineProps({
  initialForm: {
    type: String,
    default: 'login',
  },
});

const emit = defineEmits(['close']);

const currentForm = ref(props.initialForm);

watch(
  () => props.initialForm,
  (newVal) => {
    currentForm.value = newVal;
  }
);

function switchForm(form) {
    currentForm.value = form;
}

const closeModal = () => {
    emit('close');
}
</script>

<template>
  <div class="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-black/70">
    <div class="relative mx-4 md:mx-16 bg-primary-50 rounded-[20px] max-h-[90vh] overflow-y-auto">
      
      <div class="min-w-[90vw] sm:min-w-[500px] px-10 py-10 flex-col gap-6 inline-flex text-secondary-700">
        <component :is="currentForm === 'login' ? SignInForm : SignUpForm" :close-modal="closeModal" />
    
        <div v-if="currentForm === 'login'" class="flex flex-wrap gap-1.5">
          <span>Don't have an account?</span>
          <button @click="switchForm('register')" class="text-primary-700 hover:text-primary-800 font-bold"> Sign Up </button>
        </div>
        <div v-else class="flex flex-wrap gap-1.5">
          <span>Have an account?</span>
          <button @click="switchForm('login')" class="text-primary-700 hover:text-primary-800 font-bold"> Login </button>
        </div>
      </div>
      
      <BaseCloseButton @click="closeModal" />
    </div>
  </div>
</template>