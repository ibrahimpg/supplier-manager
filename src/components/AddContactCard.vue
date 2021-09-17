<template>
<div class="contactCardContainer">

  <v-card
    v-if="!addClicked"
    class="addContactCard"
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
  >
    <v-container>
      <v-row>

        <v-col cols="12" sm="6" md="4" style="padding:0px 12px">
          <v-text-field label="First Name" v-model="cardData.firstName"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="4" style="padding:0px 12px">
          <v-text-field label="Last Name" v-model="cardData.lastName"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="4" style="padding:0px 12px">
          <v-text-field label="Job Title" v-model="cardData.jobTitle"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6" style="padding:0px 12px">
          <v-text-field label="Email" v-model="cardData.email"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6" style="padding:0px 12px">
          <v-combobox
            v-model="cardData.contactType"
            :items="contactTypeOptions"
            label="Contact Type"
          ></v-combobox>
        </v-col>

        <v-col cols="12" sm="6" md="4" style="padding:0px 12px">
          <v-text-field label="Fax" v-model="cardData.fax"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="4" style="padding:0px 12px">
          <v-text-field label="Direct Phone" v-model="cardData.directPhone"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="4" style="padding:0px 12px">
          <v-text-field label="Mobile Phone" v-model="cardData.mobilePhone"></v-text-field>
        </v-col>

      </v-row>
    </v-container>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn color="#4390ce" text @click="save">Save</v-btn>
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
        jobTitle: '',
        email: '',
        contactType: '',
        fax: '',
        directPhone: '',
        mobilePhone: '',
      },
      addClicked: false,
      contactTypeOptions: [
        '24 Hour Emergency Phone',
        'Billing (AR/AP)',
        'Management',
        'Operations',
        'Owner',
        'Sales',
      ],
    };
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
  },
  methods: {
    save() {
      console.log(this.cardData);
      fetch('https://gto-supplier-portal-api.herokuapp.com/api/create-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}` },
        body: JSON.stringify(this.cardData),
      })
        .then((response) => {
          if (response.status === 400) {
            this.$store.commit('notify', 'Failed to add contact. Please try again.');
          } else {
            console.log(response);
            this.toggle();
            this.$store.dispatch('getContacts');
          }
        }).catch((err) => console.log(err));
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
