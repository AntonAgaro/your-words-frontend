import { RepositoryFactory } from '~/repository/RepositoryFactory';
import type { ApiResponse } from '~/repository/types';
import type { getWordsResponse } from '~/repository/words/types';

export class WordsRepository extends RepositoryFactory {
  async getWords(): Promise<getWordsResponse> {
    return this.call<getWordsResponse>('/words/');
  }

  async saveWord(wordData: { text: string; translation: string; topicId: number }): Promise<ApiResponse> {
    return this.call<ApiResponse>(`/words/`, {
      method: 'POST',
      body: wordData,
    });
  }
}
