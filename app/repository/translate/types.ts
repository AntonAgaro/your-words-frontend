import type { ApiResponse } from '~/repository/types';

export type TranslateResponse = ApiResponse & {
  text: string;
};
