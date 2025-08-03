import { useAuthStore } from '~/composables/stores/useAuthStore';

const PRIVATE_ROUTES = ['/words'];

export default defineNuxtRouteMiddleware((to, from) => {
  const { get } = useAuthStore();
  const userId = get('userId');

  for (const route of PRIVATE_ROUTES) {
    if (!userId && to.path.startsWith(route)) {
      return navigateTo('/');
    }
  }
});
