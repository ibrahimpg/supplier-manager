import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    token: '',
    username: 'IPG Digital LLC',
  },
  mutations: {
    login(state, response) {
      Object.assign(state, {
        token: response.token,
        loggedIn: true,
        supplierName: response.userInfo.companyName,
        supplierEmail: response.userInfo.email,
        country: response.userInfo.country,
        supplierLogoUrl: response.userInfo.logoUrl,
      });
      // console.log(this.state);
      // router.push({ path: '/account' });
    },
  },
  actions: {
  },
  modules: {
  },
});
