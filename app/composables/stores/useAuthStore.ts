export function useAuthStore() {
  const store = useState<AuthStore>('authStore', () => ({
    userId: null,
  }));

  function get<K extends keyof AuthStore>(key: K) {
    return store.value[key];
  }

  function set<K extends keyof AuthStore>(key: K, value: AuthStore[K]) {
    store.value[key] = value;
  }

  return { get, set };
}

interface AuthStore {
  userId: string | null;
}
