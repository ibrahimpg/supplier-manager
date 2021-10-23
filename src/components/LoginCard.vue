<template>
  <v-card elevation="2" class="loginCard">
    <v-container>
      <v-row>
        <v-col>

          <span v-if="show === 'login'">
            <p class="text-h4 text--primary">Login</p>
            <v-text-field v-model="username" label="Username" required></v-text-field>
            <v-text-field v-model="password" label="Password" type="password" required>
            </v-text-field>
          </span>

          <span v-if="show === 'reg'">
            <p class="text-h4 text--primary">Register</p>
            <v-text-field v-model="username" :rules="usernameRules" label="Username" required>
            </v-text-field>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" type="email" required>
            </v-text-field>
            <v-text-field v-model="password" :rules="pwR" label="Password" type="password" required>
            </v-text-field>
            <v-text-field v-model="companyName" :counter="50" label="Company Name" required>
            </v-text-field>
            <v-text-field v-model="companyDescription" :counter="125" label="Company Description">
            </v-text-field>
          </span>

          <span v-if="show === 'forgot'">
            <p class="text-h4 text--primary">Reset Password</p>
            <div class="text--primary" style="max-width: 450px;">
              Your password will be reset and emailed to you.
              Check your email after resetting and make
              sure to switch to a secure password immediately
              after logging in.
              <br><br>
            </div>
            <v-text-field v-model="email" label="E-mail" type="email" required>
            </v-text-field>
          </span>

          <v-card-actions class="actions">
            <v-btn color="orange lighten-2" text @click="show='login'"
            :class="{ selected: show === 'login' }">
              Login
            </v-btn>
            <v-btn color="orange lighten-2" text @click="show='reg'"
            :class="{ selected: show === 'reg' }">
              Register
            </v-btn>
            <v-btn color="orange lighten-2" text @click="show='forgot'"
            :class="{ selected: show === 'forgot' }">
              Recover Account
            </v-btn>
            <v-spacer></v-spacer>
            <div class="submitContainer">
              <v-btn v-if="show === 'login' && !submitted" @click="login">Log In</v-btn>
              <v-btn v-if="show === 'reg' && !submitted" @click="register">Register</v-btn>
              <v-btn v-if="show === 'forgot' && !submitted" @click="reset">Reset</v-btn>
              <v-progress-circular v-if="submitted" indeterminate color="primary"
              style="margin-right:30px;">
              </v-progress-circular>
            </div>
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
      companyName: '',
      companyDescription: '',
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
    };
  },
  methods: {
    async login() {
      try {
        const { username, password } = this;

        const apiUrl = `${process.env.VUE_APP_API_URL}/api/user/login`;

        const body = JSON.stringify({ username, password });

        this.submitted = true;

        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });

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
        const {
          username, email, password, companyName, companyDescription,
        } = this;

        const apiUrl = `${process.env.VUE_APP_API_URL}/api/user/register`;

        const body = JSON.stringify({
          username, email, password, companyName, companyDescription,
        });

        this.submitted = true;

        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });

        this.submitted = false;

        if (response.status !== 201) {
          const jsonRes = await response.json();
          return this.$store.commit('notify', jsonRes);
        }

        this.show = 'login';

        return this.$store.commit('notify', 'Registration successful.');
      } catch (err) {
        return this.$store.commit('notify', 'An error occurred.');
      }
    },
    async reset() {
      try {
        const { email } = this;

        const apiUrl = `${process.env.VUE_APP_API_URL}/api/user/reset-password`;

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

<style scoped>
  .loginCard {
    padding: 10px;
    max-height: 500px;
    height: 100%;
    max-width: 550px;
    width: 100%;
  }
  .selected {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 5px;
  }
  .actions {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 20px;
    width: 100%;
  }
  @media only screen and (max-width: 600px) {
    .loginCard {
      margin: 10px;
      max-height: none;
      height: auto;
    }
    .actions {
      position: static;
      display: flex;
      flex-direction: column-reverse;
    }
    .submitContainer {
      margin-bottom: 25px;
    }
  }
</style>
