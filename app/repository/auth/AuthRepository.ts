import { RepositoryFactory } from '~/repository/RepositoryFactory';

export class AuthRepository extends RepositoryFactory {
  async login(data: FormData) {
    return this.call('/auth/login', {
      method: 'POST',
      body: data,
    });
  }

  async getUser() {
    return this.call('');
  }
}
