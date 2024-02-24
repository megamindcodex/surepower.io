

<template>
  <v-container
    class="container d-flex justify-center align-center"
    max-width="700px"
  >
    <div class="productCont" v-if="products">
      <div
        class="product"
        v-for="product in products"
        :key="product._id"
        @click="navigateTo(product._id)"
      >
        <v-card class="product-card">
          <div class="image bg-white">
            <v-img :src="product.productImageURL" :alt="product.name" />
          </div>
          <div class="desc mt-4 pa-4">
            <v-card-title class="text-overline font-weight-bold pa-0">
              {{ product.name }}
            </v-card-title>
            <v-card-title class="text-subtitle-1 pa-0">
              ${{ product.price }}
            </v-card-title>
          </div>
        </v-card>
      </div>
      <!-- <v-responsive width="100%"></v-responsive> -->
    </div>
    <div class="productCont" v-else>
      <h3>No Products Found</h3>
    </div>
  </v-container>
</template>
  
  <script setup>
// import axios from "axios";
// import { endpoint } from "../constant/endpoint";
import { defineProps, onMounted, ref, watchEffect } from "vue";
import { useProductsStore } from "@/store/productStore";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// const productId = ref(route.params.id);

// const productStore = useProductsStore();
const { products, getProductItem } = defineProps([
  "products",
  "getProductItem",
]);

const navigateTo = (routeName) => {
  try {
    router.push({ name: "productItem", params: { id: routeName } });
  } catch (error) {
    console.error("Error navigating to route:", error);
  }
};

watchEffect(() => {
  getProductItem(route.params.id);
  // console.log(product);
});
</script>
  
  <style scoped>
.productCont {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: 80px; */
  /* max-width: 700%; */
  /* overflow-x: auto; */
}

/* .productCont::-webkit-scrollbar {
    display: none;
  } */

.product {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  aspect-ratio: 6/6;
  /* color: #ffff; */
  /* color: #000; */
  /* color: #01837b; */
}

.product-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 2px solid #c2c2c2;
  /* background-color: #e8e9eb; */
  /* background-color: #f39098; */
}

.image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  aspect-ratio: 9/6;
  object-fit: contain;
  border-radius: 4px 4px 0 0;
}

.image img {
  width: 100%;
  max-width: 200px;
  object-fit: contain;
}

.desc {
  display: flex;
  flex-direction: column;
  padding: 10px;
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