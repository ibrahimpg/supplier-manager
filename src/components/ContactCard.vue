<template>
  <div class="contactCardContainer">
    <v-card style="min-height:267px;">

      <v-card-title>{{name}}</v-card-title>

      <v-card-text>
        <b>{{company}}</b> | {{title}}
        <br><br>
        {{email}}
        <br>
        {{mobilePhone}}
      </v-card-text>

      <br><br>

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
    mobilePhone: String,
    contactId: String,
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
      const apiLink = `${process.env.VUE_APP_API_URL}/api/contact/delete`;

      const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}` };

      const body = JSON.stringify({ contactId: this.contactId });

      await fetch(apiLink, { method: 'DELETE', headers, body });

      this.$emit('loadContacts');
    },
  },
};
</script>

<style lang="scss" scoped>
  .contactCardContainer {
    max-width: 440px; width: 100%; margin: 35px;
  }
</style>
