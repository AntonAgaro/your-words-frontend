<template>
  <div>
    <h1>Add new word:</h1>

    <div class="main-form">
      <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Text" name="text">
          <UInput v-model="state.text" />
        </UFormField>

        <UFormField label="Translation" name="translation">
          <UInput v-model="state.translation" type="text" />
        </UFormField>

        <UFormField v-if="topics" label="Topic" name="topic">
          <USelectMenu v-model="topicValue" :items="selectTopics" class="w-48" />
        </UFormField>


        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

const state = reactive({
  text: '',
  translation: ''
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.text) errors.push({ name: 'text', message: 'Required' })
  if (!state.translation) errors.push({ name: 'translation', message: 'Required' })
  return errors
}

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<any>) {
  const data = {
    text: state.text,
    translation: state.translation,
    topicId: parseInt(topics.data.value.find(t => t.name === topicValue.value).ID)
  }

  const res = await $fetch("http://localhost:8080/words", {
    method: 'POST',
    body: data
  })
  console.log(res)
  toast.add({ title: res.status, description: res.message, color: 'success' })

  state.translation = ''
  state.text = ''
}

const topics = await useFetch('http://localhost:8080/topics')
const selectTopics = topics.data.value.map(t => t.name)
console.log(selectTopics)
const topicValue = ref(selectTopics[0])
console.log(topicValue)

</script>

<style scoped>

</style>