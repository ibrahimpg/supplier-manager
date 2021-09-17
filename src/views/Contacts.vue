<template>
  <div class="contacts">
    <div class="contactsInner">
      <AddContactCard />
      <ContactCard
        v-for='(contact) in contacts'
        :key='contact.key'
        :contactId=contact[3].value
        :contactType=contact[7].value
        :directPhone=contact[15].value
        :fax=contact[16].value
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
