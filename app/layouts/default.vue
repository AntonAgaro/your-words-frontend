<template>
  <UApp>
    <div class="container wrapper">
      <AppHeader />
      <!--      <header class="flex gap-2">-->
      <!--        <NuxtLink to="/">Main</NuxtLink>-->
      <!--        <NuxtLink to="/words/all">Words</NuxtLink>-->
      <!--      </header>-->
      <div class="main mt-4 pb-24">
        <slot />
      </div>
      <StickyBottomContainer />
    </div>
  </UApp>
</template>

<script setup lang="ts">
import AppHeader from '~/components/header/AppHeader.vue';
import StickyBottomContainer from '~/components/base/StickyBottomContainer.vue';
</script>
