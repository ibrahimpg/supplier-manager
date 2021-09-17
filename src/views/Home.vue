<template>
  <div v-if="loggedIn" class="centeredContent">
    profile page
  </div>
  <div v-else class="centeredContent">
    <LoginCard v-if="show === 'login'" @child-data="showRegister" />
    <RegisterCard v-if="show === 'register'" @child-data="showLogin" />
  </div>
</template>

<script>
import RegisterCard from '@/components/RegisterCard.vue';
import LoginCard from '@/components/LoginCard.vue';

export default {
  name: 'Home',
  components: { LoginCard, RegisterCard },
  data() {
    return {
      show: 'login',
    };
  },
  computed: {
    loggedIn() { return this.$store.state.loggedIn; },
  },
  methods: {
    showLogin() { this.show = 'login'; },
    showRegister() { this.show = 'register'; },
  },
};
</script>
