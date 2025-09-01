import { RepositoryFactory } from '~/repository/RepositoryFactory';
import type { TranslateResponse } from '~/repository/translate/types';

export class TranslateRepository extends RepositoryFactory {
  async translate(params: { textToTranslate: string; langTo: string; langFrom: string; signal: AbortSignal }) {
    const { textToTranslate, langTo, langFrom, signal } = params;
    return this.call<TranslateResponse>('/translate/', {
      method: 'POST',
      body: {
        textToTranslate,
        langTo,
        langFrom,
      },
      signal,
    });
  }
}
