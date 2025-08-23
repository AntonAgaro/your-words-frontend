<template>
  <div class="w-full flex items-center justify-between gap-4 p-2 bg-white dark:text-white dark:bg-[#0f172b]">
    <NuxtLink to="/">
      <div class="flex flex-col gap-2 items-center">
        <UIcon name="i-mdi-database-marker-outline" size="32" />
        Add
      </div>
    </NuxtLink>
    <NuxtLink to="/games/match">
      <div class="flex flex-col gap-2 items-center">
        <UIcon name="i-mdi-gamepad-variant" size="32" />
        Play
      </div>
    </NuxtLink>
    <NuxtLink to="/words/all">
      <div class="flex flex-col gap-2 items-center">
        <UIcon name="i-mdi-file-document-outline" size="32" />
        Words
      </div>
    </NuxtLink>
    <NuxtLink to="/words/all">
      <div class="flex flex-col gap-2 items-center">
        <UIcon name="i-ic-baseline-account-box" size="32" />
        Profile
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
