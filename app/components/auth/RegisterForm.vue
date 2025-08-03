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
              setInFocusValue('username', true);
              validateField('username');
            "
            @focus="setInFocusValue('username', false)"
          />
        </UFormField>
        <UFormField label="Password" name="password" class="text-lg" :error="errorsToShow('password')[0]">
          <UInput
            v-model="form.values.email as string"
            type="text"
            class="flex text-lg"
            size="xl"
            @blur="
              setInFocusValue('email', true);
              validateField('email');
            "
            @focus="setInFocusValue('email', false)"
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
import useSsrFetch from '~/composables/useSsrFetch';
import { useFormWithValidation } from '~/composables/formValidation/useFormWithValidation';
import { ValidationRules } from '~/composables/formValidation/types';

const { $api } = useNuxtApp();

const { form, errorsToShow, setInFocusValue, validateField } = useFormWithValidation([
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
    rules: [{ type: ValidationRules.MinLength, value: 4, message: 'Name must be at least 4 characters long' }],
  },
]);

const toast = useToast();
const topics = await useSsrFetch('topics-data', () => $api.topics.getTopics());
const selectTopics = topics.map((t) => t.name);
const topicValue = ref(selectTopics[0]);

async function onSubmit() {}
</script>

<style lang="scss" scoped>
.main-form {
  width: 100%;
  max-width: 400px;
}
</style>
