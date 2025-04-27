import { RepositoryFactory } from '~/repository/RepositoryFactory';
import type { TopicsResponse } from '~/repository/topics/types';

export class TopicsRepository extends RepositoryFactory {
  async getTopics(): Promise<TopicsResponse> {
    return this.call<TopicsResponse>('/topics');
  }
}
