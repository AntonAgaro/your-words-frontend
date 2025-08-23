<template>
  <div class="h-full flex justify-center items-center">
    <UButton
      v-if="!isGameStarted"
      color="error"
      class="w-80 cursor-pointer flex items-center justify-center h-20 text-xl font-bold"
      @click="startGame"
    >
      Play
    </UButton>
    <div v-if="isGameStarted" class="game-container flex items-center gap-6">
      <div class="questions flex flex-col gap-4">
        <UButton
          v-for="word in words"
          :key="word.text"
          size="xl"
          class="break-all"
          :color="setWordButtonStatus(word)"
          @click.stop="selectWord(word)"
        >
          {{ word.text }}
        </UButton>
      </div>
      <div class="answers flex flex-col gap-4">
        <UButton
          v-for="answer in answers"
          :key="answer.translation"
          size="xl"
          class="break-all"
          :class="{ 'blink-red': answer.status === GameWordStatus.inError }"
          :color="setWordButtonStatus(answer)"
          @click.stop="checkAnswer(answer)"
        >
          {{ answer.translation }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type GameWord, GameWordStatus } from '~/pages/games/match/types';

const { $api } = useNuxtApp();
const isGameStarted = ref(false);
const words = ref<GameWord[]>([]);
const answers = ref<GameWord[]>([]);
const selectedWord = ref<GameWord | null>(null);

watch(words, (newValue) => {
  if (newValue.every((w) => w.status === GameWordStatus.Matched)) {
    isGameStarted.value = false;
  }
});

function setWordButtonStatus(word: GameWord) {
  switch (word.status) {
    case GameWordStatus.Matched:
      return 'primary';
    case GameWordStatus.InSelect:
      return 'warning';
    case GameWordStatus.InGame:
      return 'neutral';
    default:
      return 'neutral';
  }
}

function selectWord(word: GameWord) {
  if (word.status === GameWordStatus.Matched) return;

  selectedWord.value = word;
  words.value = words.value.map((w) => {
    if (w.status === GameWordStatus.Matched) return w;

    if (w.text === word.text) {
      w.status = GameWordStatus.InSelect;
    } else {
      w.status = GameWordStatus.InGame;
    }
    return w;
  });
}

function checkAnswer(answer: GameWord) {
  if (!selectedWord.value) return;

  if (selectedWord.value.text === answer.text) {
    words.value = words.value.map((w) => {
      if (w.text === answer.text) {
        w.status = GameWordStatus.Matched;
      }

      return w;
    });

    answers.value = answers.value.map((a) => {
      if (a.text === answer.text) {
        a.status = GameWordStatus.Matched;
      }
      return a;
    });
    selectedWord.value = null;
    return;
  } else {
    answer.status = GameWordStatus.inError;
    setTimeout(() => {
      answer.status = GameWordStatus.InGame;
    }, 800);
  }

  console.log('error in answer');
}

async function startGame() {
  const res = await $api.words.getRandomWords();
  if (res.words && res.words.length) {
    words.value = res.words.map((w) => {
      const gameWord = w as GameWord;
      gameWord.status = GameWordStatus.InGame;
      return gameWord;
    });
    answers.value = shuffle(words.value.map((w) => ({ ...w })));
    isGameStarted.value = true;
  }
}

function resetChosenWord() {
  selectedWord.value = null;
  words.value = words.value.map((w) => {
    if (w.status !== GameWordStatus.Matched) {
      w.status = GameWordStatus.InGame;
    }

    return w;
  });
}

onMounted(() => {
  document.body.addEventListener('click', resetChosenWord);
});
onBeforeUnmount(() => {
  document.body.removeEventListener('click', resetChosenWord);
});
</script>

<style>
@keyframes blink-red {
  0%,
  100% {
    border: none transparent;
  }
  25%,
  75% {
    border: 2px solid black;
    border-color: rgb(239 68 68);
  } /* красный */
  50% {
    border: none transparent;
  }
}

.blink-red {
  animation: blink-red 0.4s ease-in-out 2;
}
</style>
