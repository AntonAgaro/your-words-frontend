<template>
  <header class="p-4 flex justify-between">
    <div class="right-side flex items-center gap-6 cursor-pointer">
      <ColorModeIcon />
      <LangIcon />
    </div>
    <div class="left-side cursor-pointer">
      <UIcon name="i-ic-baseline-account-box" size="32" />
    </div>
  </header>
</template>

<script setup lang="ts">
import LangIcon from '~/components/shared/LangIcon.vue';
import ColorModeIcon from '~/components/shared/PasswordInput/ColorModeIcon.vue';
</script>

<style scoped></style>
