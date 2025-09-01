import { TopicsRepository } from '~/repository/topics/TopicsRepository';
import { WordsRepository } from '~/repository/words/WordsRepository';
import { AuthRepository } from '~/repository/auth/AuthRepository';
import { TranslateRepository } from '~/repository/translate/TranslateRepository';

export default defineNuxtPlugin({
  name: 'appFetch',
  parallel: true,
  setup() {
    const appFetch = $fetch.create({
      onRequest: ({ options }) => {
        options.baseURL = useRuntimeConfig().public.apiBaseUrl;

        if (import.meta.browser) {
          options.credentials = 'include';
        } else {
          const token = useCookie('token');
          options.headers.set('cookie', `token=${token.value}`);
        }
      },
    });

    const repositories = {
      topics: new TopicsRepository(appFetch),
      words: new WordsRepository(appFetch),
      auth: new AuthRepository(appFetch),
      translate: new TranslateRepository(appFetch),
    };

    return {
      provide: {
        api: repositories,
      },
    };
  },
});
