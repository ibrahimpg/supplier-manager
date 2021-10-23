<template>
  <div style="flex-basis: 33.333333%">
    <v-card class="mx-auto my-12" max-width="374">

    <div v-if="cardPage === 1">
      <v-card-text>
      <p class="display-1 text--primary" style="text-align: center;">
        New Product
      </p>

      <div v-if="!image" class="imgBox">
        <div style="height: 200px; width: 200px; border: 1px solid black;"></div>
        <h3>Upload product image (.jpg or .png)</h3><br>
        <input type="file" @change="onFileChange" accept=".jpg, .jpeg, .png">
      </div>

      <div v-else class="imgBox">
        <img :src="image" style="object-fit: cover;" />
        <button @click="removeImage">Remove</button>
      </div>

      <v-text-field label="Product Name*" v-model="productName"></v-text-field>

      <v-combobox
        v-model="productType"
        :items="productTypeOptions"
        label="Product Type*"
      ></v-combobox>

      <v-text-field label="Product Cost" v-model="productPrice" prefix="$" type="number">
      </v-text-field>

      <br>

      <v-textarea
        name="product description"
        filled
        counter
        label="Product description"
        maxlength='255'
        auto-grow
        v-model="productDescription"
      ></v-textarea>
      </v-card-text>
    </div>

    <div v-if="cardPage === 2">
      <v-card-text>
      <p class="display-1 text--primary" style="text-align: center;">
        New Product
      </p>

      <br>

      <p>Product Valid Dates*</p>
      <v-date-picker
        v-model="productValidDates"
        :show-current="false"
        range
        no-title
        elevation="2"
        style="padding-bottom:10px;"
      >
      </v-date-picker>

      <br><br>
      Valid Start Date: {{productValidDates[0]}}
      <br>
      Valid End Date: {{productValidDates[1]}}
      <br><br>

      <div style="display: flex;justify-content: flex-end; margin-bottom: -25px; margin-top: 25px;">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="primary" dark v-bind="attrs" v-on="on">
              mdi-information-outline
            </v-icon>
          </template>
          <span>If physical product, location it will be delivered.</span>
        </v-tooltip>
      </div>

      Product Delivery Address (Optional)
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="12" style="padding:0px 12px">
            <v-combobox
              v-model="country"
              :items="countries"
              label="Country"
            ></v-combobox>
          </v-col>

          <v-col
            v-if="country === 'United States'"
            cols="12" sm="12" md="12" style="padding:0px 12px"
          >
            <v-combobox
              v-model="state"
              :items="states"
              label="State"
            ></v-combobox>
          </v-col>

          <v-col cols="12" sm="12" md="12" style="padding:0px 12px">
            <v-text-field label="Street 1" v-model="streetOne">
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="12" md="12" style="padding:0px 12px">
            <v-text-field label="Street 2" v-model="streetTwo">
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="6" style="padding:0px 12px">
            <v-text-field label="City" v-model="city">
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="6" style="padding:0px 12px">
            <v-text-field label="Postal Code" v-model="postalCode">
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
      </v-card-text>
    </div>

    <v-card-text style="padding: 0 16px 9px 16px;">
    <p
      v-if='validationResponse.length > 0'
      style="border-left: 3px solid red; padding: 15px 0 15px 15px; margin: 0;"
      v-html="validationResponseFormatted"
    >
    </p>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn v-if="cardPage > 1" color="#4390ce" text @click="cardPage -= 1">Back</v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="cardPage < 2" color="#4390ce" text @click="nextPage">Next</v-btn>
      <v-btn v-if="cardPage===2 && !submitted" color="#4390ce" text @click="addProduct">
        Create Product
      </v-btn>
      <div v-if="submitted" style="display: flex; justify-content: center; width: 155px;">
        <v-progress-circular indeterminate :width="2" color="#4390ce"></v-progress-circular>
      </div>
    </v-card-actions>

    </v-card>
  </div>
</template>

<script>
export default {
  name: 'NewProduct',
  data() {
    return {
      submitted: false,
      cardPage: 1,
      validationResponse: [],
      image: '',
      file: '',
      productName: '',
      productPrice: '',
      productDescription: '',
      productType: '',
      productValidDates: [],
      streetOne: '',
      streetTwo: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      productTypeOptions: ['Airline', 'Merchandise', 'Permit', 'Program/Workshop/Clinic', 'Security', 'Standard Items', 'Tour Director', 'Venue Rental'],
      countries: ['United States', 'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', "Timor L'Este", 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
      states: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
    };
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
    validationResponseFormatted() {
      return `<b>Please correct the following fields:</b> <br>${this.validationResponse.map((x) => `${x}`).join('<br>')}`;
    },
  },
  methods: {
    nextPage() {
      if (this.cardPage === 1) {
        this.validationResponse = [];
        if (!this.productName) this.validationResponse.push('Set a product name');
        if (!this.productType) this.validationResponse.push('Set a product type');
        if (!this.validationResponse.length) this.cardPage += 1;
      } else {
        this.cardPage += 1;
      }
    },
    async addProduct() {
      try {
        if (!this.productValidDates || this.productValidDates.length < 2) return this.validationResponse.push('Set product valid dates');

        this.submitted = true;

        const apiUrl = `${process.env.VUE_APP_API_URL}/api/product/add`;

        const headers = { Authorization: `Bearer ${this.token}` };

        const body = new FormData();
        const {
          streetOne, streetTwo, city, state, postalCode, country,
        } = this;
        body.append('productLocation', `${streetOne} ${streetTwo} ${city}, ${state} ${postalCode}, ${country}`);
        body.append('productName', this.productName);
        body.append('productDescription', this.productDescription);
        body.append('productPrice', this.productPrice);
        body.append('productType', this.productType);
        body.append('productAvailableDates', this.productValidDates);
        body.append('file', this.file);

        const response = await fetch(apiUrl, { method: 'POST', headers, body });

        console.log(response);

        this.submitted = false;

        if (response.status === 201) return this.$router.push('/products');

        if (response.status === 401) return this.$store.commit('notify', 'Your email must be verified in order to create a product.');

        return this.$store.commit('notify', 'Error adding product');
      } catch (err) {
        this.submitted = false;
        return this.$store.commit('notify', 'Error adding product');
      }
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) { return; }
      this.createImage(files[0]);
    },
    createImage(file) {
      const reader = new FileReader();
      const vm = this;
      reader.onload = (e) => { vm.image = e.target.result; };
      reader.readAsDataURL(file);
      this.file = file;
    },
    removeImage() {
      this.image = '';
    },
  },
};
</script>

<style scoped>
img {
  width: 200px;
  height: 200px;
  margin: auto;
  display: block;
  margin-bottom: 10px
}
.imgBox {
  margin-top:10px;
  padding:16px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content: center;
}
</style>
