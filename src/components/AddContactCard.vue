<template>
<div class="contactCardContainer">

  <v-card
    v-if="!addClicked"
    style="min-height:267px;"
  >
    <v-icon size="120px" style="margin: 46px;" @click='toggle' color="#4390ce">mdi-plus</v-icon>
    <v-divider class="mx-4"></v-divider>
    <v-card-actions style="visibility: hidden;">
      <v-btn color="#4390ce" text>Edit</v-btn>
      <v-btn color="#4390ce" text>Delete</v-btn>
    </v-card-actions>
  </v-card>

  <v-card
    v-if="addClicked"
    style="min-height:267px;"
  >
    <v-container>
      <v-row>

        <v-col cols="12" sm="6" md="6" style="padding:0px 12px">
          <v-text-field label="Company" v-model="cardData.companyName"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6" style="padding:0px 12px">
          <v-text-field label="Job Title" v-model="cardData.jobTitle"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6" style="padding:0px 12px">
          <v-text-field label="First Name" v-model="cardData.firstName"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6" style="padding:0px 12px">
          <v-text-field label="Last Name" v-model="cardData.lastName"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6" style="padding:0px 12px">
          <v-text-field label="Mobile Phone" v-model="cardData.phoneNumber"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6" style="padding:0px 12px">
          <v-text-field label="Email" v-model="cardData.emailAddress"></v-text-field>
        </v-col>

      </v-row>
    </v-container>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn color="#4390ce" text @click="addContact">Save</v-btn>
      <v-btn color="#4390ce" text @click="toggle">Cancel</v-btn>
    </v-card-actions>
  </v-card>

</div>
</template>

<script>
export default {
  name: 'AddContactCard',
  data() {
    return {
      cardData: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: '',
        jobTitle: '',
        companyName: '',
      },
      addClicked: false,
    };
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
  },
  methods: {
    async addContact() {
      const apiUrl = `${process.env.VUE_APP_API_URL}/api/contact/add`;

      const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}` };

      const body = JSON.stringify(this.cardData);

      const response = await fetch(apiUrl, { method: 'POST', headers, body });

      console.log(response);

      this.addClicked = false;

      this.clear();

      this.$emit('loadContacts');
    },
    toggle() {
      this.addClicked = !this.addClicked;
      this.clear();
    },
    clear() {
      Object.keys(this.cardData).forEach((key) => { this.cardData[key] = ''; });
    },
  },
};
</script>

<style lang="scss" scoped>
  .contactCardContainer {
    text-align: center;
    max-width: 440px; width: 100%; margin: 35px;
  }
</style>
