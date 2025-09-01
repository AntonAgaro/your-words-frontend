<template>
  <header class="p-4 flex justify-between">
    <div class="right-side flex items-center gap-6 cursor-pointer">
      <ColorModeIcon />
      <LangIcon />
    </div>
    <div class="left-side cursor-pointer flex items-center gap-6">
      <NuxtLink v-if="!isMobile && authStore.get('user')" to="/words/all">
        <UIcon name="i-material-symbols-dictionary" size="32" />
      </NuxtLink>
      <NuxtLink v-if="!isMobile && authStore.get('user')" to="/games/match">
        <UIcon name="i-mdi-gamepad-variant" size="32" />
      </NuxtLink>
      <NuxtLink v-if="!isMobile && authStore.get('user')" to="/words/add">
        <UIcon v-if="!isMobile && authStore.get('user')" name="i-material-symbols-add-notes" size="32" />
      </NuxtLink>

      <LogoutButton v-if="authStore.get('user')" />
    </div>
  </header>
</template>

<script setup lang="ts">
import LangIcon from '~/components/shared/LangIcon.vue';
import ColorModeIcon from '~/components/shared/PasswordInput/ColorModeIcon.vue';
import { useAuthStore } from '~/composables/stores/authStore/useAuthStore';
import LogoutButton from '~/components/auth/LogoutButton.vue';

const { isMobile } = useDevice();
const authStore = useAuthStore();
</script>

<style scoped></style>
