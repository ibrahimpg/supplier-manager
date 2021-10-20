<template>
<div style="flex-basis: 25%; margin: 0 20px; min-width: 354px;">
  <v-card
    class="mx-auto my-12"
    max-width="354"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <div>
      <v-img v-if="productImgUrl" height="250" :src=productImgUrl></v-img>

      <v-card-title
        style='min-height:128px;flex-direction:column;justify-content:center;align-items:flex-start'
      >
        <div style="font-size:12px;">Validity: {{productAvailClean}}</div>
        <div style="word-break:break-word">{{productName}}</div>
      </v-card-title>

      <v-card-text style="min-height:148px;">
        {{productDescription}}
        <br><br>
        {{productLocation}}
        <br><br>
        {{productTypeClean}}
      </v-card-text>
    </div>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="#4390ce" text @click="deleteProduct">
        Delete Product
      </v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
export default {
  name: 'Product',
  data() {
    return {
    };
  },
  props: {
    productName: String,
    productType: String,
    productId: String,
    productImgUrl: String,
    productPrice: String,
    productDescription: String,
    productLocation: String,
    productAvailableDates: String,
  },
  computed: {
    productTypeClean() {
      return this.productType.split(';').join(', ');
    },
    productAvailClean() {
      return this.productAvailableDates.replace(',', ' to ');
    },
    token() {
      return this.$store.state.token;
    },
  },
  methods: {
    async deleteProduct() {
      try {
        const apiUrl = `${process.env.VUE_APP_API_URL}/api/product/delete`;

        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}` };

        const body = JSON.stringify({ productId: this.productId });

        const response = await fetch(apiUrl, { method: 'DELETE', headers, body });

        console.log(response);

        this.$emit('loadProducts');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
