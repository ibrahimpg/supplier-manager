<template>
  <v-card elevation="2" max-width=550 width="100%" style="padding:10px">
    <v-container>
      <v-row>
        <v-col>

          <v-text-field v-model="username" :rules="usernameRules" label="Username" required>
          </v-text-field>
          <br>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" type="email" required>
          </v-text-field>
          <br>
          <v-text-field v-model="password" :rules="pwR" label="Password" type="password" required>
          </v-text-field>
          <br>
          <v-card-actions>
            <v-btn color="orange lighten-2" text @click="switchToLogin">Log In</v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="!submitted" @click="register">Register</v-btn>
            <div v-if="submitted" style="display: flex; justify-content: center; width: 91px;">
              <v-progress-circular indeterminate :width="2" color="#4390ce"></v-progress-circular>
            </div>
          </v-card-actions>

        </v-col>
      </v-row>
    </v-container>
</v-card>
</template>

<script>
export default {
  name: 'RegisterCard',
  data: () => ({
    submitted: false,
    username: '',
    email: '',
    password: '',
    usernameRules: [
      (v) => !!v || 'Username is required',
      (v) => v.length > 6 || 'Username must be more than 6 characters',
      (v) => v.length < 16 || 'Username must be less than 16 characters',
    ],
    pwR: [
      (v) => !!v || 'Password is required',
      (v) => v.length >= 8 || 'Password must be more than 8 characters',
    ],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
  methods: {
    switchToLogin() {
      this.$emit('child-data');
    },
    async register() {
      try {
        const { username, email, password } = this;

        const body = JSON.stringify({ username, email, password });

        const apiLink = 'https://supplier-manager-api.herokuapp.com/api/user/register';

        this.submitted = true;

        const response = await fetch(apiLink, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });

        this.submitted = false;

        if (response.status === 201) {
          this.$store.commit('notify', 'Registration successful.');
          return this.switchToLogin();
        }

        const responseJson = await response.json();

        const stringifyResponse = responseJson.join(', ');

        return this.$store.commit('notify', stringifyResponse);
      } catch (err) {
        this.submitted = false;
        return this.$store.commit('notify', 'An error occurred.');
      }
    },
  },
};
</script>
