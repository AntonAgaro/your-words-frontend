import type { AppThemes, AppLang } from '~/shared/UxConfig/types';

export interface UxConfigStore {
  theme: AppThemes;
  lang: AppLang;
}
