import type { User } from '~/shared/User/types';

export interface AuthStore {
  user: User | null;
}
