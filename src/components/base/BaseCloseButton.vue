<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const emit = defineEmits(["close"]);

function emitClose() {
  emit("close");
}
</script>

<template>
  <button
    @click="emitClose"
    class="w-10 h-10 absolute right-5 top-5 rounded-full flex justify-center items-center bg-primary-100 hover:bg-primary-200"
  >
    <FontAwesomeIcon
      :icon="faTimes"
      class="text-xl text-primary-700 hover:text-primary-800"
    />
  </button>
</template>
