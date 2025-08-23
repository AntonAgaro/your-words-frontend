<template>
  <div class="flex flex-col items-center h-full gap-y-10">
    <h1 class="text-2xl">Add new word:</h1>

    <div class="main-form">
      <UForm :validate="validate" :state="state" class="space-y-4 w-full flex flex-col gap-4" @submit="onSubmit">
        <UFormField label="Text" name="text" class="text-lg">
          <UInput v-model="state.text" class="flex text-lg" size="xl" />
        </UFormField>

        <UFormField label="Translation" name="translation" class="text-lg">
          <UInput v-model="state.translation" type="text" class="flex text-lg" size="xl" />
        </UFormField>

        <UFormField v-if="topics" label="Topic" name="topic" class="text-lg">
          <USelectMenu v-model="topicValue" :items="selectTopics" class="w-full text-lg" />
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
import type { FormError } from '@nuxt/ui';
import useSsrFetch from '~/composables/useSsrFetch';

const state = reactive({
  text: '',
  translation: '',
});
const loading = ref(false);
const { $api } = useNuxtApp();
const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.text) errors.push({ name: 'text', message: 'Required' });
  if (!state.translation) errors.push({ name: 'translation', message: 'Required' });
  return errors;
};

const toast = useToast();
const topics = await useSsrFetch('topics-data', () => $api.topics.getTopics());
const selectTopics = topics.map((t) => t.name);
const topicValue = ref(selectTopics[0]);

async function onSubmit() {
  if (!topics?.length) {
    console.log('No topics available');
    return;
  }

  const data = {
    text: state.text,
    translation: state.translation,
    topicId: parseInt(topics.find((t) => t.name === topicValue.value).ID),
  };
  loading.value = true;
  //TODO обработать 409
  const res = await $api.words
    .saveWord(data)
    .catch((err) => {
      console.log(err);
      toast.add({ title: err.status, description: err.message, color: 'danger' });
    })
    .finally(() => {
      loading.value = false;
    });

  if (res.status === 'success') {
    toast.add({ title: res.status, description: res.message, color: 'success' });
  }

  state.translation = '';
  state.text = '';
}
</script>

<style lang="scss" scoped>
.main-form {
  width: 100%;
  max-width: 400px;
}
</style>
