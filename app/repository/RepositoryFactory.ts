import type { $Fetch, NitroFetchOptions } from 'nitropack';
import { ResponseStatus } from '~/shared/Response/ResponseStatus';
import type { ApiResponse } from '~/repository/types';

export abstract class RepositoryFactory {
  private readonly fetch: $Fetch;

  constructor(fetch: $Fetch) {
    this.fetch = fetch;
  }

  protected async call<T>(url: string, options: NitroFetchOptions<any> = {}): Promise<T> {
    try {
      const res = await this.fetch<T>(url, options);
      return res as T;
    } catch (e) {
      const res = e as { data: ApiResponse };
      return {
        status: ResponseStatus.Error,
        message: res.data?.message || 'Unknown error',
      } as T;
    }
  }
}
