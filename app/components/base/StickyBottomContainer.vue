<template>
  <div class="fixed bottom-0 left-0 right-0 flex fle-col gap-4">
    <MobileMenu v-if="isMobile && useAuthStore().get('user')" />
  </div>
</template>

<script setup lang="ts">
import MobileMenu from '~/components/navigation/MobileMenu.vue';
import { useAuthStore } from '~/composables/stores/authStore/useAuthStore';
const { isMobile } = useDevice();
</script>

<style scoped></style>
