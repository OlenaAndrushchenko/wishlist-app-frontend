<script setup>
const props = defineProps({
  id: String,
  label: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: [String, Number],
  required: {
    type: Boolean,
    default: false,
  },
  error: String,
  maxlength: [Number, String],
  minlength: [Number, String],
});

const emit = defineEmits(["update:modelValue"]);

function updateValue(event) {
  emit("update:modelValue", event.target.value);
}
</script>

<template>
  <div class="flex flex-col items-start gap-1.5 w-full">
    <label :for="id" class="text-secondary-700 text-sm font-medium">
      {{ label }}
      <span v-if="required" class="text-red">*</span>
    </label>
    <component
      :is="type === 'textarea' ? 'textarea' : 'input'"
      :id="id"
      :type="type !== 'textarea' ? type : undefined"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue"
      :required="required"
      :aria-required="required"
      :aria-invalid="!!error"
      :maxlength="maxlength"
      :minlength="minlength"
      class="w-full p-2.5 bg-white text-secondary-700 text-sm rounded-md placeholder:text-secondary-400 border border-transparent hover:border-primary-300 focus:outline-none focus:ring-primary-600 focus:border-primary-600 block"
    />
    <p v-if="error" class="text-red-500 text-sm" aria-live="polite">
      {{ error }}
    </p>
  </div>
</template>
