export default defineNuxtPlugin({
  dependsOn: ['appFetch'],
  setup() {
    console.log('12312312312');
    const token = useCookie('token');
    console.log('TOKEN: ', token.value);
  },
});
