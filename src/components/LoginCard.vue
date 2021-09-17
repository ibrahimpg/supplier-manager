<template>
  <v-card elevation="2" max-width=550 width="100%" style="padding:10px">

    <v-container>
      <v-row>
        <v-col>

          <v-text-field v-model="username" label="Username" required></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" required></v-text-field>

          <v-card-actions>
            <v-btn color="orange lighten-2" text @click="switchToRegister">Register</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="login">Log In</v-btn>
          </v-card-actions>

        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
export default {
  name: 'LoginCard',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    switchToRegister() {
      this.$emit('child-data');
    },
    async login() {
      const { username, password } = this;

      // const apiLink = 'https://gto-supplier-portal-api.herokuapp.com/api/register-supplier';

      // this.submitted = !this.submitted;

      // const response = await fetch(apiLink, { method: 'POST'
      // , body: JSON.stringify(this.supplierInfo) });

      console.log(username);
      console.log(password);
    },
  },
};
</script>
