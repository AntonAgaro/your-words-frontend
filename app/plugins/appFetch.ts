import { TopicsRepository } from '~/repository/topics/TopicsRepository';
import { WordsRepository } from '~/repository/words/WordsRepository';
import { AuthRepository } from '~/repository/auth/AuthRepository';

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
      auth: new AuthRepository(appFetch),
    };

    return {
      provide: {
        api: repositories,
      },
    };
  },
});
