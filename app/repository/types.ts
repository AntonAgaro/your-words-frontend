import type { TopicsRepository } from '~/repository/topics/TopicsRepository';
import type { WordsRepository } from '~/repository/words/WordsRepository';

export type Repositories = {
  [RepositoryName.Topics]: TopicsRepository;
  [RepositoryName.Words]: WordsRepository;
};

export enum RepositoryName {
  Topics = 'topics',
  Words = 'words',
}

export type ApiResponse = {
  status: string;
  message?: string;
};
