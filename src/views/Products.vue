<template>
  <div class="products">
    <div class="productsInner">
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
      products: [],
    };
  },
  async mounted() {
    this.loadProducts();
  },
  methods: {
    async loadProducts() {
      const apiLink = `${process.env.VUE_APP_API_URL}/api/product/get`;

      const headers = { Authorization: `Bearer ${this.token}` };

      const response = await fetch(apiLink, { headers });

      const jsonres = await response.json();

      this.products = jsonres.reverse();
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
