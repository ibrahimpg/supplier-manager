<template>
  <div v-if="loggedIn">
    {{ companyName }}
    {{ companyDescription }}
    <img :src=companyImg alt="Company logo" class="companyPicture">
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
    username() { return this.$store.state.username; },
    companyName() { return this.$store.state.companyName; },
    companyDescription() { return this.$store.state.companyDescription; },
    companyImg() { return this.$store.state.companyImg; },
  },
  methods: {
    showLogin() { this.show = 'login'; },
    showRegister() { this.show = 'register'; },
  },
};
</script>

<style scoped>
.companyPicture {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  right: 20px;
  object-fit: cover;
}
</style>
