import type { BaseResponse } from '~/shared/Response/types';
import type { User } from '~/shared/User/types';

export type GetUserResponse = BaseResponse & {
  user: User;
};
