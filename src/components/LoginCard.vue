<template>
  <v-card elevation="2" max-width=550 width="100%" style="padding:10px">

    <v-container>
      <v-row>
        <v-col>

          <span v-if="show === 'login'">
            <v-text-field v-model="username" label="Username" required></v-text-field>
            <br>
            <v-text-field v-model="password" label="Password" type="password" required>
            </v-text-field>
            <br>
          </span>

          <span v-if="show === 'reg'">
            <v-text-field v-model="username" :rules="usernameRules" label="Username" required>
            </v-text-field>
            <br>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" type="email" required>
            </v-text-field>
            <br>
            <v-text-field v-model="password" :rules="pwR" label="Password" type="password" required>
            </v-text-field>
            <br>
          </span>

          <span v-if="show === 'forgot'">
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" type="email" required>
            </v-text-field>
            <br>
          </span>

          <v-card-actions>
            <v-btn color="orange lighten-2" text @click="show='login'"
            :disabled="show === 'login'">
              Login
            </v-btn>
            <v-btn color="orange lighten-2" text @click="show='reg'"
            :disabled="show === 'reg'">
              Register
            </v-btn>
            <v-btn color="orange lighten-2" text @click="show='forgot'"
            :disabled="show === 'forgot'">
              Recover Account
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="show === 'login' && !submmitted" @click="login">Log In</v-btn>
            <v-btn v-if="show === 'reg' && !submmitted" @click="register">Register</v-btn>
            <v-btn v-if="show === 'forgot' && !submmitted" @click="reset">Reset</v-btn>
            <v-progress-circular v-if="submitted" indeterminate color="primary">
            </v-progress-circular>
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
      submitted: false,
      show: 'login',
      username: '',
      password: '',
      email: '',
    };
  },
  methods: {
    async login() {
      try {
        const { username, password } = this;

        const body = JSON.stringify({ username, password });

        this.submitted = true;

        const response = await fetch(process.env.API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });

        this.submitted = false;

        if (response.status !== 200) return this.$store.commit('notify', 'Incorrect username or password.');

        const jsonresponse = await response.json();

        return this.$store.commit('login', jsonresponse);
      } catch (err) {
        return this.$store.commit('notify', 'Error logging in. Please try again.');
      }
    },
    async register() {
      try {
        const { username, email, password } = this;

        const apiUrl = `${process.env.API_URL}/user/register`;

        const body = JSON.stringify({ username, email, password });

        this.submitted = true;

        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });

        this.submitted = false;

        const regFailedStr = 'Registration failed. Please make sure you entered all of the information correctly.';

        if (response.status !== 201) return this.$store.commit('notify', regFailedStr);

        this.show = 'login';

        return this.$store.commit('notify', 'Registration successful.');
      } catch (err) {
        return this.$store.commit('notify', 'An error occurred.');
      }
    },
    async reset() {
      try {
        const { email } = this;

        const apiUrl = `${process.env.API_URL}/user/reset-password`;

        const body = JSON.stringify({ email });

        this.submitted = true;

        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });

        this.submitted = false;

        if (response.status !== 200) return this.$store.commit('notify', 'An error occurred. Make sure email is correct.');

        return this.$store.commit('notify', 'Password has been reset. Please check your email.');
      } catch (err) {
        return this.$store.commit('notify', 'An error occurred. Make sure email is correct.');
      }
    },
  },
};
</script>
