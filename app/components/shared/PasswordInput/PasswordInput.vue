<template>
  <UInput
    v-model="modelValue"
    :type="showPassword ? 'text' : 'password'"
    class="flex text-lg"
    size="xl"
    @blur="blurHandler"
    @focus="focusHandler"
  >
    <template #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="sm"
        :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
        :aria-pressed="showPassword"
        aria-controls="password"
        @click="showPassword = !showPassword"
    /></template>
  </UInput>
</template>

<script setup lang="ts">
const modelValue = defineModel<string>();
defineProps<{
  blurHandler: () => void;
  focusHandler: () => void;
}>();
const showPassword = ref(false);
</script>

<style scoped></style>
