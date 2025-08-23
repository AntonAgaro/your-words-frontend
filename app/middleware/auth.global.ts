import { useAuthStore } from '~/composables/stores/authStore/useAuthStore';

const PRIVATE_ROUTES = ['/words', '/games'];

export default defineNuxtRouteMiddleware((to) => {
  const { get } = useAuthStore();
  const user = get('user');
  for (const route of PRIVATE_ROUTES) {
    if (!user?.id && to.path.startsWith(route)) {
      return navigateTo('/');
    }
  }
});
