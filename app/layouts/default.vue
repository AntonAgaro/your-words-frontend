<template>
  <UApp>
    <div class="container wrapper">
      <header class="flex gap-2">
        <NuxtLink to="/">Main</NuxtLink>
        <NuxtLink to="/words/all">Words</NuxtLink>
      </header>
      <div class="main mt-4">
        <slot />
      </div>
      <footer>Footer</footer>
    </div>
  </UApp>
</template>

<script setup lang="ts"></script>
