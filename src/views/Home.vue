<template>
  <div v-if="loggedIn" style="display: flex; flex-direction: column; align-items: center;">
    <v-card
      elevation="2"
      max-width=550
      width="100%"
      style="max-height:450px;height:100%;margin-top:50px;"
    >
      <v-img :src=this.$store.state.companyImg
      alt="Company logo" height="200px" style="border-radius:50%" contain>
      </v-img>
      <v-card-title>{{$store.state.username}}</v-card-title>
      <v-card-subtitle class="pb-0">{{$store.state.email}}</v-card-subtitle>

      <v-card-text class="text--primary">
        <div>Whitehaven Beach</div>

        <div>Whitsunday Island, Whitsunday Islands</div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange" text>
          Update Profile
        </v-btn>
      </v-card-actions>
    </v-card>
    <div
      style="max-width:550px;width:100%;margin-top:25px;display:flex;justify-content:space-between"
    >
      <v-btn color="orange lighten-2" @click="routeTo('/contacts')" style="width:150px;">
        Contacts
      </v-btn>
      <v-btn color="orange lighten-2" @click="routeTo('/products')" style="width:150px;">
        Products
      </v-btn>
      <v-btn color="orange lighten-2" @click="routeTo('/new-product')" style="width:150px;">
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
    };
  },
  computed: {
    loggedIn() { return this.$store.state.loggedIn; },
    username() { return this.$store.state.username; },
    companyImg() { return this.$store.state.companyImg; },
  },
  methods: {
    routeTo(dest) {
      this.$router.push({ path: dest });
    },
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
