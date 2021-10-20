<template>
  <div v-if="loggedIn" style="display: flex; flex-direction: column; align-items: center;">
    <v-card elevation="2" class="profileCard">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="orange" v-if="!editing" dark @click="editing = true; chosenEdit = 'profile'"
        >
          <v-icon dark>
            mdi-circle-edit-outline
          </v-icon>
        </v-btn>
        <v-btn
          color="orange" v-if="!editing" dark @click="editing = true; chosenEdit = 'settings'"
        >
          <v-icon dark>
            mdi-cog
          </v-icon>
        </v-btn>
        <v-btn color="orange" v-if="editing" dark @click="editing = false">
          <v-icon dark>
            mdi-close-circle-outline
          </v-icon>
        </v-btn>
      </v-card-actions>
      <v-img :src=this.$store.state.companyImg
      alt="Company logo" class="companyPicture" :class="{shrink: editing}" contain>
      </v-img>

      <div
        style="margin:10px 20px 10px 20px"
        v-if="editing && chosenEdit === 'profile'"
        transition="scroll-y-transition"
      >
        <v-file-input
          v-model="file"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Update Logo"
          label="Update Logo"
        ></v-file-input>
        <v-btn
          color="orange"
          dark @click="updateLogo"
          v-if="!updatingLogo"
          style="width:200px;margin-bottom:15px"
        >
          Update Logo
        </v-btn>
        <v-progress-circular v-if="updatingLogo" indeterminate :width="2" color="#4390ce">
        </v-progress-circular>
        <v-text-field label="Company Name" v-model="companyNameEditing">
        </v-text-field>
        <v-text-field label="Company Description" v-model="companyDescriptionEditing">
        </v-text-field>
        <v-btn
          color="orange"
          dark
          v-if="!updatingProfile"
          @click="updateProfile"
          style="width:200px;"
        >
          Update Company Info
        </v-btn>
        <v-progress-circular v-if="updatingProfile" indeterminate :width="2" color="#4390ce">
        </v-progress-circular>
      </div>

      <div
        style="margin:10px 20px 10px 20px"
        v-if="editing && chosenEdit === 'settings'"
        transition="scroll-y-transition"
      >
        <v-text-field label="Email" v-model="emailEditing">
        </v-text-field>
        <v-btn
          color="orange"
          dark @click="updateEmail"
          v-if="!updatingEmail"
          style="width:200px;margin-bottom:15px"
        >
          Update Email
        </v-btn>
        <v-progress-circular v-if="updatingEmail" indeterminate :width="2" color="#4390ce">
        </v-progress-circular>

        <v-text-field label="Old Password" type="password" v-model="oldPassword">
        </v-text-field>
        <v-text-field label="New Password" type="password" v-model="newPassword">
        </v-text-field>
        <v-btn
          color="orange"
          dark
          v-if="!updatingPassword"
          @click="updatePassword"
          style="width:200px;"
        >
          Update Password
        </v-btn>
        <v-progress-circular v-if="updatingPassword" indeterminate :width="2" color="#4390ce">
        </v-progress-circular>
      </div>

      <span v-if="!editing" style="position:absolute;bottom:30px" transition="scroll-y-transition">
        <v-card-title>{{$store.state.username}}</v-card-title>

        <v-card-subtitle class="pb-0">{{$store.state.email}}</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>{{$store.state.companyName}}</div>

          <div>{{$store.state.companyDescription}}</div>
        </v-card-text>
      </span>
    </v-card>

    <div class="buttonContainer">
      <v-btn color="orange" dark @click="routeTo('/contacts')" style="width:150px;">
        Contacts
      </v-btn>
      <v-btn color="orange" dark @click="routeTo('/products')" style="width:150px;">
        Products
      </v-btn>
      <v-btn color="orange" dark @click="routeTo('/new-product')" style="width:150px;">
        New Product
      </v-btn>
    </div>
  </div>
  <div v-else class="centeredContent">
    <LoginCard />
  </div>
</template>

<script>
import LoginCard from '@/components/LoginCard.vue';

export default {
  name: 'Home',
  components: { LoginCard },
  data() {
    return {
      editing: false,
      chosenEdit: '',
      file: [],
      companyName: this.$store.state.companyName,
      companyDescription: this.$store.state.companyDescription,
      companyNameEditing: this.$store.state.companyName,
      companyDescriptionEditing: this.$store.state.companyDescription,
      emailEditing: this.$store.state.email,
      oldPassword: '',
      newPassword: '',
      updatingLogo: false,
      updatingProfile: false,
      updatingEmail: false,
      updatingPassword: false,
    };
  },
  computed: {
    token() { return this.$store.state.token; },
    loggedIn() { return this.$store.state.loggedIn; },
    username() { return this.$store.state.username; },
    companyImg() { return this.$store.state.companyImg; },
  },
  methods: {
    routeTo(dest) {
      this.$router.push({ path: dest });
    },
    async updateLogo() {
      try {
        this.updatingLogo = true;

        const body = new FormData();
        body.append('file', this.file);

        const apiUrl = `${process.env.VUE_APP_API_URL}/api/user/update-picture`;

        const response = await fetch(apiUrl, { method: 'PATCH', headers: { Authorization: `Bearer ${this.token}` }, body });

        if (response.status !== 200) return this.$store.commit('notify', 'Error changing logo.');

        const jsonRes = await response.json();

        this.file = [];
        this.updatingLogo = false;

        return this.$store.commit('updateAccountLogo', jsonRes);
      } catch (err) {
        this.file = [];
        this.updatingLogo = false;
        return this.$store.commit('notify', 'Error updating logo.');
      }
    },
    async updateProfile() {
      try {
        this.updatingProfile = true;

        const apiUrl = `${process.env.VUE_APP_API_URL}/api/user/update-profile`;

        const body = {
          companyName: this.companyNameEditing,
          companyDescription: this.companyDescriptionEditing,
        };

        const response = await fetch(apiUrl, {
          method: 'PATCH', headers: { Authorization: `Bearer ${this.token}` }, body: JSON.stringify(body),
        });

        this.updatingProfile = false;

        if (response.status !== 200) return this.$store.commit('notify', 'Error updating profile.');

        this.editing = false;

        return this.$store.commit('updateAccountInfo', body);
      } catch (err) {
        this.updatingProfile = false;
        return this.$store.commit('notify', 'Error updating profile.');
      }
    },
    async updateEmail() {
      try {
        return console.log('test');
      } catch (err) {
        this.updatingEmail = false;
        return this.$store.commit('notify', 'Error updating email.');
      }
    },
    async updatePassword() {
      try {
        return console.log('test');
      } catch (err) {
        this.updatingPassword = false;
        return this.$store.commit('notify', 'Error updating password. Please make sure entered information is correct.');
      }
    },
  },
};
</script>

<style scoped>
.profileCard {
  max-width: 550px;
  width:100%;
  /* max-height: 550px;
  height: 100%; */
  min-height: 570px;
  margin-top: 50px;
}
.companyPicture {
  height: 200px;
  border-radius: 50%;
  transition: .2s;
}
.shrink {
  height: 115px;
}
.buttonContainer {
  max-width:550px;
  width:100%;
  margin-top:25px;
  margin-bottom:25px;
  display:flex;
  justify-content:space-between;
}
@media only screen and (max-width: 600px) {
  .profileCard {
    max-width: calc(100% - 10px);
    max-height: none;
    height: auto;
    margin: 50px 10px 0px 10px;
  }
  .buttonContainer {
    flex-direction: column;
    align-items: center;
    height: 150px;
  }
}
</style>
