<template>
  <v-app>

    <v-app-bar color="blue darken-1" dark app>
      <v-app-bar-nav-icon v-if="loggedIn" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <h2 class="siteTitle">Supplier Manager</h2>

      <v-spacer></v-spacer>

      <h3 v-if="loggedIn" style="user-select: none; margin-right: 15px;">
        {{ this.$store.state.username }}
      </h3>

      <img
        v-if="loggedIn"
        :src=companyImg alt="Company logo"
        style="margin-right: 16px; height: 35px; width: 35px; border-radius: 50%"
      >

      <v-btn
        v-if="loggedIn" @click="logout" color="white" outlined
      >
      Logout
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app bottom temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="blue--text text--accent-4">
          <v-list-item @click="routeTo('/')">
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>

          <v-list-item @click="routeTo('/contacts')">
            <v-list-item-title>Contacts</v-list-item-title>
          </v-list-item>

          <v-list-item @click="routeTo('/products')">
            <v-list-item-title>Products</v-list-item-title>
          </v-list-item>

          <v-list-item @click="routeTo('/new-product')">
            <v-list-item-title>New Product</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>

    <v-snackbar :value="show">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="orange lighten-2" text v-bind="attrs" @click="notifyClear">
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  computed: {
    loggedIn() { return this.$store.state.loggedIn; },
    show() { return this.$store.state.notification.show; },
    message() { return this.$store.state.notification.message; },
    companyImg() { return this.$store.state.companyImg; },
  },
  data: () => ({
    drawer: false,
    group: null,
  }),
  methods: {
    routeTo(dest) {
      this.$router.push({ path: dest });
    },
    notifyClear() { this.$store.commit('notifyClear'); },
    logout() { this.$store.commit('logout'); },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style>
.centeredContent {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.siteTitle {
  user-select: none;
  margin-left: 5px;
}
@media only screen and (max-width: 600px) {
  .siteTitle {
    display: none;
  }
}
</style>
