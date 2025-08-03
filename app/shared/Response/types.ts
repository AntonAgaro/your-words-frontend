import type { ResponseStatus } from '~/shared/Response/ResponseStatus';

export type BaseResponse = {
  status: ResponseStatus;
  message?: string;
};
