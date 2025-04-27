import { TopicsRepository } from '~/repository/topics/TopicsRepository';
import { WordsRepository } from '~/repository/words/WordsRepository';

export default defineNuxtPlugin({
  name: 'appFetch',
  parallel: true,
  setup() {
    const appFetch = $fetch.create({
      onRequest: ({ options }) => {
        options.baseURL = useRuntimeConfig().public.apiBaseUrl;

        if (import.meta.browser) {
          options.credentials = 'include';
        }
      },
    });

    const repositories = {
      topics: new TopicsRepository(appFetch),
      words: new WordsRepository(appFetch),
    };

    return {
      provide: {
        api: repositories,
      },
    };
  },
});
