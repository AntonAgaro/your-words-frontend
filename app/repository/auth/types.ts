import type { User } from '~/shared/User/types';
import type { ApiResponse } from '~/repository/types';

export type GetUserResponse = ApiResponse & {
  user: User;
};
