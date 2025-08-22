import type { UxConfigStore } from '~/composables/stores/uxConfigStore/types';
import { AppLang, AppThemes } from '~/shared/UxConfig/types';

export default function useUxConfigStore() {
  const store = useState<UxConfigStore>('ux-config-store', () => ({
    theme: AppThemes.Dark,
    lang: AppLang.EN,
  }));
}
