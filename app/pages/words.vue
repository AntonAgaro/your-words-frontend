<template>
  <div>
    <h1>All your words here:</h1>
    <ul class="mt-4" v-if="words.data.value">
      <li v-for="word in words.data.value" :key="word.ID" class="word-wrapper">
        <div class="cell">{{word.text}}</div>
        <div class="cell">{{word.translation}}</div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

const words = await useFetch('http://localhost:8080/words')
console.log(words.data.value)
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