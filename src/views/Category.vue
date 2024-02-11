<template>
  <v-container
    class="container d-flex justify-center align-center"
    max-width="700px"
  >
    <!-- <div class="loading" v-if="products.loading">
      <v-progress-circular indeterminate color="#00796B" :size="200">
        Loading....
      </v-progress-circular>
    </div> -->
    <div class="productCont" v-if="products">
      <RouterLink
        :to="'/productitem/' + product._id"
        class="product"
        v-for="product in products"
        :key="product._id"
      >
        <div class="product-card">
          <div class="image bg-white">
            <v-img :src="product.productImageURL" :alt="product.name" />
          </div>
          <div class="desc mt-4 pa-4">
            <v-card-title class="text-overline font-weight-bold pa-0">{{
              product.name
            }}</v-card-title>
            <v-card-title class="text-subtitle-1 pa-0"
              >${{ product.price }}</v-card-title
            >

            <!-- <div class="card-action">
              <RouterLink
                :to="'/productitem/' + product._id"
                :class="seeProductBtnClass"
                v-ripple
                >See product</RouterLink
              >
            </div> -->
          </div>
        </div>
      </RouterLink>
      <!-- <v-responsive width="100%"></v-responsive> -->
    </div>
    <div class="productCont" v-else>
      <h3>No Products Found</h3>
    </div>
  </v-container>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { endpoint } from "../constant/endpoint";

// const seeProductBtnClass = ref(
//   "v-btn v-btn--block v-btn--variant-outlined pa-4"
// );

const products = ref(null);
const route = useRoute();
const categoryName = ref(null);

const getPoductsByCategory = async (categoryName) => {
  try {
    const res = await axios.get(`${endpoint}/api/productsByCategory`, {
      params: { categoryName: categoryName },
    });

    if (res.status === 200) {
      products.value = res.data;
      // console.log("products By category fetched:", products.value);
    }
  } catch (err) {
    console.log("Error getting poducts by category", err, err.message);
  }
};

onMounted(() => {
  watchEffect(() => {
    // Update the categoryName whenever the route parameter changes
    categoryName.value = route.params.name;
    getPoductsByCategory(categoryName.value);
  });
});
</script>

<style scoped>
/* .container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
} */

.productCont {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 1rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1228px;
  flex-grow: 1;
}

.product {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-decoration: none;
  /* color: #ffff; */
  color: #000;
  /* color: #01837b; */
}

.product-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border-radius: 4px;
  border: 2px solid #c2c2c2;
  background-color: #e8e9eb;
  /* background-color: #f39098; */
}

.image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  aspect-ratio: 9/6;
  /* object-fit: contain; */
  border-radius: 4px 4px 0 0;
}

.image img {
  width: 100%;
  /* object-fit: contain; */
}

.desc {
  display: flex;
  flex-direction: column;
  /* padding: 10px; */
  /* box-sizing: border-box; */
  /* max-width: auto-fit; */
}

.productCont h3 {
  margin: 0;
}

.productCont p {
  margin: 0;
}

/* .card-action {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  border-radius: 10px;
} */

.loading {
  position: absolute;
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>