<template>
  <div class="contacts">
    <div class="contactsInner">
      <AddContactCard @loadContacts="loadContacts" />
      <ContactCard
        @loadContacts="loadContacts"
        v-for='(contact) in contacts'
        :key='contact.key'
        :contactId=contact._id
        :company=contact.companyName
        :email=contact.emailAddress
        :mobilePhone=contact.phoneNumber
        :title=contact.jobTitle
        :firstName=contact.firstName
        :lastName=contact.lastName
      />
    </div>
  </div>
</template>

<script>
import ContactCard from '../components/ContactCard.vue';
import AddContactCard from '../components/AddContactCard.vue';

export default {
  name: 'Contacts',
  components: { ContactCard, AddContactCard },
  data() {
    return {
      contacts: [],
    };
  },
  async mounted() {
    this.loadContacts();
  },
  methods: {
    async loadContacts() {
      const apiLink = `${process.env.VUE_APP_API_URL}/api/contact/get`;

      const headers = { Authorization: `Bearer ${this.token}` };

      const response = await fetch(apiLink, { headers });

      const jsonres = await response.json();

      this.contacts = jsonres.reverse();
    },
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
  },
};
</script>

<style lang="scss" scoped>
  .contacts { display: flex; justify-content: center; }
  .contactsInner {
    display: flex;
    flex-wrap: wrap;
    max-width: 1200px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  @media only screen and (max-width: 1040px) {
    .contactsInner {
      justify-content: center;
    }
  }
</style>
