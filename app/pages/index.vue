<template>
  <div class="flex flex-col items-center h-full gap-y-10">
    <div class="main-form">
      <login-form v-if="state === StateTypes.Login" />

      <div v-if="state === StateTypes.Login" class="mt-2 flex items-center gap-2">
        If you don't have an account
        <UBadge color="info" class="cursor-pointer" @click="state = StateTypes.Register">Register</UBadge>
      </div>

      <register-form v-if="state === StateTypes.Register" />
      <div v-if="state === StateTypes.Register" class="mt-2 flex items-center gap-2">
        <UBadge
          trailing-icon="i-lucide-arrow-right"
          size="md"
          color="info"
          class="cursor-pointer"
          @click="state = StateTypes.Login"
        >
          Sing in
        </UBadge>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RegisterForm from '~/components/auth/RegisterForm.vue';
import LoginForm from '~/components/auth/LoginForm.vue';
import { useAuthStore } from '~/composables/stores/authStore/useAuthStore';

const { get } = useAuthStore();
if (get('user')) {
  await navigateTo('/words/add/');
}
enum StateTypes {
  Login = 'login',
  Register = 'register',
}

const state = ref(StateTypes.Login);
</script>

<style lang="scss" scoped>
.main-form {
  width: 100%;
  max-width: 400px;
}
</style>
