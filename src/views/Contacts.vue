<template>
  <div class="contacts">
    <div class="contactsInner">
      <AddContactCard />
      <ContactCard
        v-for='(contact) in contacts'
        :key='contact.key'
        :contactId=contact[3].value
        :contactType=contact[7].value
        :email=contact[17].value
        :mobilePhone=contact[30].value
        :title=contact[31].value
        :fullName=contact[36].value
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
      // contacts: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch('getContacts');
    });
  },
  methods: {
    updateContacts() { this.$store.dispatch('getContacts'); },
    async loadContacts() {
      const apiLink = 'https://gto-supplier-portal-api.herokuapp.com/api/create-contact';

      const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}` };

      const body = JSON.stringify(this.cardData);

      const response = await fetch(apiLink, { method: 'POST', headers, body });

      console.log(response);
    },
  },
  computed: {
    contacts() { return this.$store.state.supplierContacts; },
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
