<template>
  <div class="translator w-full flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <h2>{{ `Translator from ${langFrom.toUpperCase()} to ${langTo.toUpperCase()}` }}</h2>
      <UIcon name="i-material-symbols-change-circle-rounded" class="cursor-pointer" size="32" @click="changeLang" />
    </div>
    <div class="translator__wrapper w-full flex justify-between flex-col gap-4 md:flex-row">
      <UTextarea v-model="originalValue" class="translator__text-area w-full md:w-[30%]" :rows="10" />
      <div class="translator__area-inner relative w-full md:w-[30%]">
        <div v-if="isTranslateLoading" class="absolute w-full h-full bg-transparent flex items-center justify-center">
          <UIcon name="i-lucide-loader" class="animate-spin" size="32" />
        </div>
        <UTextarea
          v-model="translatedValue"
          :disabled="isTranslateLoading"
          class="translator__text-area w-full"
          placeholder="Translate..."
          :rows="10"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const langTo = ref('ru');
const langFrom = ref('en');
const originalValue = ref('');
const translatedValue = ref('');
const isTranslateLoading = ref(false);
let abortController: AbortController | null = null;
const { $api } = useNuxtApp();

const debouncedTranslate = debounce((val: string) => translate(val), 800);

watch(originalValue, (value) => {
  if (!value) {
    translatedValue.value = '';
    abortController?.abort();
    return;
  }

  debouncedTranslate(value);
});

function changeLang() {
  langTo.value = langTo.value === 'en' ? 'ru' : 'en';
  langFrom.value = langFrom.value === 'ru' ? 'en' : 'ru';
  const prevOrig = originalValue.value;
  originalValue.value = translatedValue.value;
  translatedValue.value = prevOrig;
}

async function translate(query: string) {
  if (!query.trim()) {
    translatedValue.value = '';
    return;
  }

  abortController?.abort();

  abortController = new AbortController();

  isTranslateLoading.value = true;

  const res = await $api.translate.translate({
    textToTranslate: originalValue.value,
    langFrom: langFrom.value,
    langTo: langTo.value,
    signal: abortController.signal,
  });
  console.log(res);
  if (res.text) {
    translatedValue.value = res.text;
  }

  isTranslateLoading.value = false;
}

// onMounted(async () => {
//   const { text } = await translate('Привет, мир! Как дела?', { to: 'en' });
//
//   console.log(text); // => 'Hello World! How are you?'
// });
</script>

<style scoped></style>
