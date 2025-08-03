import { useAuthStore } from '~/composables/stores/authStore/useAuthStore';

export default defineNuxtPlugin({
  dependsOn: ['appFetch'],
  async setup() {
    const token = useCookie('token');
    if (!token.value) return;
    const nuxtApp = useNuxtApp();
    const res = await nuxtApp.$api.auth.getUser(token.value);
    if (res?.user) {
      const { set } = useAuthStore();
      set('user', res.user);
    }
  },
});
