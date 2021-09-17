<template>
  <div class="contactCardContainer">
    <v-card>

      <v-card-title>{{fullName}}</v-card-title>

      <v-card-text>
        <b>{{title}}</b> | {{contactType}}
        <br>
        {{email}}
        <br><br>
        Direct Phone: {{directPhone}}
        <br>
        Mobile Phone: {{mobilePhone}}
        <br>
        Fax: {{fax}}
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
    fullName: String,
    title: String,
    email: String,
    directPhone: String,
    mobilePhone: String,
    fax: String,
    contactType: String,
    contactId: Number,
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
  },
  methods: {
    deleteContact() {
      fetch('https://gto-supplier-portal-api.herokuapp.com/api/delete-contact', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}` },
        body: JSON.stringify({ contactId: this.contactId }),
      })
        .then((response) => {
          if (response.status === 400) {
            this.$store.commit('notify', 'Failed to delete contact.');
          } else {
            console.log(response);
            this.$store.dispatch('getContacts');
          }
        }).catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
  .contactCardContainer {
    max-width: 440px; width: 100%; margin: 35px;
  }
</style>
