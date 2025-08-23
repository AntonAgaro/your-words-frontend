<template>
  <header class="p-4 flex justify-between">
    <div class="right-side flex items-center gap-6 cursor-pointer">
      <ColorModeIcon />
      <LangIcon />
    </div>
    <div v-if="!isMobile && useAuthStore().get('user')" class="left-side cursor-pointer flex items-center gap-6">
      <UIcon name="i-mdi-gamepad-variant" size="32" />
      <UIcon name="i-ic-baseline-account-box" size="32" />
    </div>
  </header>
</template>

<script setup lang="ts">
import LangIcon from '~/components/shared/LangIcon.vue';
import ColorModeIcon from '~/components/shared/PasswordInput/ColorModeIcon.vue';
import { useAuthStore } from '~/composables/stores/authStore/useAuthStore';

const { isMobile } = useDevice();
</script>

<style scoped></style>
