<template>
  <div class="flex flex-col justify-center items-center h-full gap-y-10">
    <h1 class="text-2xl">Sign in:</h1>

    <div class="main-form">
      <UForm :state="form" class="space-y-4 w-full flex flex-col gap-4" @submit="onSubmit">
        <UFormField label="Username" name="username" class="text-lg" :error="errorsToShow('username')[0]">
          <UInput
            v-model="form.values.username as string"
            class="flex text-lg"
            size="xl"
            @blur="
              setInFocusValue('username', true);
              validateField('username');
            "
            @focus="setInFocusValue('username', false)"
          />
        </UFormField>
        <UFormField label="Password" name="password" class="text-lg" :error="errorsToShow('password')[0]">
          <UInput
            v-model="form.values.password as string"
            type="text"
            class="flex text-lg"
            size="xl"
            @blur="
              setInFocusValue('password', true);
              validateField('password');
            "
            @focus="setInFocusValue('password', false)"
          />
        </UFormField>
        {{ form.values.password }}
        <UButton type="submit" class="text-lg flex justify-center items-center"> Submit </UButton>
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFormWithValidation } from '~/composables/formValidation/useFormWithValidation';
import { ValidationRules } from '~/composables/formValidation/types';
import { ResponseStatus } from '~/shared/Response/ResponseStatus';
import { useAuthStore } from '~/composables/stores/authStore/useAuthStore';

const { $api } = useNuxtApp();

const { form, errorsToShow, setInFocusValue, validateField, sendForm } = useFormWithValidation([
  {
    name: 'username',
    value: '',
    rules: [{ type: ValidationRules.MinLength, value: 4, message: 'Name must be at least 4 characters long' }],
  },
  {
    name: 'password',
    value: '',
    rules: [{ type: ValidationRules.MinLength, value: 4, message: 'Name must be at least 4 characters long' }],
  },
]);

const toast = useToast();

async function onSubmit() {
  await sendForm({
    send: $api.auth.login.bind($api.auth),
    afterSend: async (res, form) => {
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
