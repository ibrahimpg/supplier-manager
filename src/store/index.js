import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notification: {
      show: false,
      message: '',
    },
    loggedIn: false,
    token: '',
    username: '',
    companyImg: '',
    email: '',
    companyName: '',
    companyDescription: '',
  },
  mutations: {
    notify(state, message) {
      Object.assign(state.notification, { show: true, message });
      setTimeout(() => { Object.assign(state.notification, { show: false, message: '' }); }, 3000);
    },
    longNotify(state, message) {
      Object.assign(state.notification, { show: true, message });
      setTimeout(() => { Object.assign(state.notification, { show: false, message: '' }); }, 10000);
    },
    notifyClear(state) {
      Object.assign(state.notification, { show: false, message: '' });
    },
    login(state, response) {
      Object.assign(state, {
        loggedIn: true,
        token: response.token,
        username: response.username,
        companyImg: response.companyImg,
        email: response.email,
        companyName: response.companyName,
        companyDescription: response.companyDescription,
      });
    },
    logout(state) {
      Object.assign(state, {
        loggedIn: false,
        token: '',
        username: '',
        companyImg: '',
      });
      router.push({ path: '/' });
    },
    updateAccountLogo(state, response) {
      Object.assign(state, {
        companyImg: response,
      });
    },
    updateAccountInfo(state, response) {
      Object.assign(state, {
        companyName: response.companyName,
        companyDescription: response.companyDescription,
      });
    },
  },
  actions: {
  },
  modules: {
  },
});
