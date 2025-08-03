<template>
  <div>
    <h1>All your words here:</h1>
    <ul v-if="words" class="mt-4">
      <li v-for="word in words" :key="word.ID" class="word-wrapper">
        <div class="cell">{{ word.text }}</div>
        <div class="cell">{{ word.translation }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import useSsrFetch from '~/composables/useSsrFetch';

const { $api } = useNuxtApp();
const words = await useSsrFetch('words-data', () => $api.words.getWords());
</script>

<style scoped>
.word-wrapper {
  display: flex;
  gap: 10px;
  border: 1px solid #fff;
}

.cell {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 50%;

  &:first-child {
    border-right: 1px solid #fff;
  }
}
</style>
