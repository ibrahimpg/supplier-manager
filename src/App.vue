<template>
  <v-app>

    <v-app-bar color="blue darken-1" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <h2 style="user-select: none; margin-left: 5px;">Supplier Manager</h2>

      <v-spacer></v-spacer>

      <h2 style="user-select: none; margin-right: 15px;">{{ this.$store.state.username }}</h2>

      <v-btn color="white" outlined>Logout</v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-title>Account Settings</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Contacts</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Products</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Add New Product</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  data: () => ({
    drawer: false,
    group: null,
  }),
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
</style>
