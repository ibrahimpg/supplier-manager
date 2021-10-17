<template>
  <div class="contactCardContainer">
    <v-card>

      <v-card-title>{{name}}</v-card-title>

      <v-card-text>
        <b>{{company}}</b> | {{title}}
        <br>
        {{email}}
        <br><br>
        {{phone}}
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions>
        <v-btn color="#4390ce" text @click='deleteContact'>Delete</v-btn>
      </v-card-actions>

    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ContactCard',
  props: {
    firstName: String,
    lastName: String,
    company: String,
    title: String,
    email: String,
    phone: String,
    contactId: Number,
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
    name() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
  methods: {
    async deleteContact() {
      const apiLink = 'https://gto-supplier-portal-api.herokuapp.com/api/delete-contact';

      const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}` };

      const body = JSON.stringify({ contactId: this.contactId });

      const response = await fetch(apiLink, { method: 'DELETE', headers, body });

      console.log(response);
    },
  },
};
</script>

<style lang="scss" scoped>
  .contactCardContainer {
    max-width: 440px; width: 100%; margin: 35px;
  }
</style>
