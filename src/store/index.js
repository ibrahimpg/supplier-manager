import Vue from 'vue';
import Vuex from 'vuex';

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
    companyName: '',
    companyDescription: '',
    companyImg: '',
  },
  mutations: {
    notify(state, message) {
      Object.assign(state.notification, { show: true, message });
      setTimeout(() => { Object.assign(state.notification, { show: false, message: '' }); }, 3000);
    },
    notifyClear(state) {
      Object.assign(state.notification, { show: false, message: '' });
    },
    login(state, response) {
      Object.assign(state, {
        loggedIn: true,
        token: response.token,
        username: response.username,
        companyName: response.companyName,
        companyDescription: response.companyDescription,
        companyImg: response.imgUrl,
      });
      // console.log(this.state);
      // router.push({ path: '/account' });
    },
    logout(state) {
      Object.assign(state, {
        loggedIn: false,
        token: '',
        username: '',
        companyName: '',
        companyDescription: '',
        companyImg: '',
      });
    },
  },
  actions: {
  },
  modules: {
  },
});
