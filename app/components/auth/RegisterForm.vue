<template>
  <div class="flex flex-col justify-center items-center h-full gap-y-10">
    <h1 class="text-2xl">Sign up:</h1>

    <div class="main-form">
      <UForm :state="form" class="space-y-4 w-full flex flex-col gap-4" @submit="onSubmit">
        <UFormField label="Username" name="username" class="text-lg" :error="errorsToShow('username')[0]">
          <UInput
            v-model="form.values.username as string"
            class="flex text-lg"
            size="xl"
            @blur="
              setInFocusValue('username', false);
              validateField('username');
            "
            @focus="setInFocusValue('username', true)"
          />
        </UFormField>
        <UFormField label="Password" name="password" class="text-lg" :error="errorsToShow('password')[0]">
          <PasswordInput
            v-model="form.values.password as string"
            :blur-handler="
              () => {
                setInFocusValue('password', false);
                validateField('password');
              }
            "
            :focus-handler="
              () => {
                setInFocusValue('password', true);
              }
            "
          />
        </UFormField>
        <UFormField label="Email" name="email" class="text-lg" :error="errorsToShow('email')[0]">
          <UInput
            v-model="form.values.email as string"
            type="text"
            class="flex text-lg"
            size="xl"
            @blur="
              setInFocusValue('email', false);
              validateField('email');
            "
            @focus="setInFocusValue('email', true)"
          />
        </UFormField>
        <UButton
          :loading="loading"
          loading-icon="i-lucide-loader"
          type="submit"
          class="text-lg flex justify-center items-center"
        >
          Submit
        </UButton>
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFormWithValidation } from '~/composables/formValidation/useFormWithValidation';
import { ValidationRules } from '~/composables/formValidation/types';
import { ResponseStatus } from '~/shared/Response/ResponseStatus';
import { useAuthStore } from '~/composables/stores/authStore/useAuthStore';
import PasswordInput from '~/components/shared/PasswordInput/PasswordInput.vue';

const { $api } = useNuxtApp();
const loading = ref(false);
const { form, errorsToShow, setInFocusValue, validateField, sendForm } = useFormWithValidation([
  {
    name: 'username',
    value: '',
    rules: [{ type: ValidationRules.MinLength, value: 4, message: 'Name must be at least 4 characters long' }],
  },
  {
    name: 'email',
    value: '',
    rules: [{ type: ValidationRules.isEmail, message: 'Invalid email format' }],
  },
  {
    name: 'password',
    value: '',
    rules: [{ type: ValidationRules.MinLength, value: 4, message: 'Password must be at least 4 characters long' }],
  },
]);

const toast = useToast();

async function onSubmit() {
  await sendForm({
    beforeSend: async () => {
      loading.value = true;
    },
    send: $api.auth.register.bind($api.auth),
    afterSend: async (res) => {
      loading.value = false;
      if (res.status === ResponseStatus.Error) {
        toast.add({
          title: 'Error',
          description: res.message,
          color: 'error',
        });
      }

      if (res.status === ResponseStatus.Success) {
        toast.add({
          title: 'Success',
          description: res.message,
          color: 'success',
        });

        const { set } = useAuthStore();
        set('user', res.user);

        await navigateTo('/words/add/');
      }
    },
  });
}
</script>

<style lang="scss" scoped>
.main-form {
  width: 100%;
  max-width: 400px;
}
</style>
