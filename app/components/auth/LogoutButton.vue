<template>
  <UIcon name="i-mdi-logout" size="32" @click="logout" />
</template>

<script setup lang="ts">
import { useAuthStore } from '~/composables/stores/authStore/useAuthStore';
import { ResponseStatus } from '~/shared/Response/ResponseStatus';
const { $api } = useNuxtApp();
async function logout() {
  const res = await $api.auth.logout();
  if (res.status === ResponseStatus.Success) {
    useAuthStore().set('user', null);
    await navigateTo('/');
  }
}
</script>

<style scoped></style>
