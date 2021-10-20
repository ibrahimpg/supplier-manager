<template>
  <div class="products">
    <div class="productsInner">
      <div
        v-if="products.length === 0 && loading === false"
        style="display:flex;justify-content:center;width:100%;align-items:center;"
      >
        <br><br><br>
        <p>You have no products yet. Add new products
        <router-link to='/new-product'> here</router-link></p>
      </div>
      <div
        v-if="loading"
        style="display:flex;justify-content:center;width:100%;margin-top:15px"
      >
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <Product
        @loadProducts="loadProducts"
        v-for='(product) in products'
        :key='product.key'
        :productId=product._id
        :productImgUrl=product.productImgUrl
        :productName=product.productName
        :productPrice=product.productPrice
        :productDescription=product.productDescription
        :productType=product.productType
        :productLocation=product.productLocation
        :productAvailableDates=product.productAvailableDates
        :productStockQuantity=product.productStockQuantity
      />
    </div>
  </div>
</template>

<script>
import Product from '../components/Product.vue';

export default {
  name: 'Contacts',
  components: { Product },
  data() {
    return {
      loading: true,
      products: [],
    };
  },
  async mounted() {
    this.loadProducts();
  },
  methods: {
    async loadProducts() {
      try {
        this.loading = true;

        const apiLink = `${process.env.VUE_APP_API_URL}/api/product/get`;

        const headers = { Authorization: `Bearer ${this.token}` };

        const response = await fetch(apiLink, { headers });

        const jsonres = await response.json();

        this.products = jsonres.reverse();

        this.loading = false;
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
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
  .products { display: flex; justify-content: center; }
  .productsInner {
    display: flex;
    flex-wrap: wrap;
    max-width: 1200px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  @media only screen and (max-width: 1040px) {
    .productsInner {
      justify-content: center;
    }
  }
</style>
