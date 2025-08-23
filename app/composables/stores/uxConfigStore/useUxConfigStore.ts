import type { UxConfigStore } from '~/composables/stores/uxConfigStore/types';
import { AppLang } from '~/shared/UxConfig/types';

export default function useUxConfigStore() {
  const store = useState<UxConfigStore>('ux-config-store', () => ({
    lang: AppLang.EN,
  }));

  function get<K extends keyof UxConfigStore>(key: K) {
    return store.value[key];
  }

  function set<K extends keyof UxConfigStore>(key: K, value: UxConfigStore[K]) {
    store.value[key] = value;
  }

  return { get, set };
}
