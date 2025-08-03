import { RepositoryFactory } from '~/repository/RepositoryFactory';
import type { GetUserResponse } from '~/repository/auth/types';

export class AuthRepository extends RepositoryFactory {
  async login(data: FormData) {
    return this.call('/auth/login', {
      method: 'POST',
      body: data,
    });
  }

  async register(data: FormData) {
    return this.call('/auth/register', {
      method: 'POST',
      body: data,
    });
  }
  async getUser(token: string): Promise<GetUserResponse> {
    return this.call('/users/me', {
      headers: {
        cookie: `token=${token}`,
      },
    });
  }
}
