import type { ApiResponse } from '~/repository/types';
import type { Word } from '~/shared/Words/types';

export type getWordsResponse = {
  text: string;
  topicId: number;
  translation: string;
  createdAt: string;
};

export type getRandomWordsResponse = ApiResponse & {
  words: Word[];
};
