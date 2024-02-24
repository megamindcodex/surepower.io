

<template>
  <v-container
    class="container d-flex justify-center align-center"
    max-width="700px"
  >
    <div class="productCont" v-if="productStore.productsByBrand">
      <div
        class="product"
        v-for="product in productStore.productsByBrand"
        :key="product._id"
        @click="navigateTo(product._id)"
      >
        <div class="product-card">
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
        </div>
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
import { defineProps, onMounted, ref, watch, watchEffect } from "vue";
import { useProductsStore } from "@/store/productStore";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// const productId = ref(route.params.id);

const productStore = useProductsStore();
const { product, checkItemInCart } = defineProps([
  "product",
  "checkItemInCart",
]);

const navigateTo = (routeName) => {
  try {
    router.push({ name: "productItem", params: { id: routeName } });
    checkItemInCart();
  } catch (error) {
    console.error("Error navigating to route:", error);
  }
};

// watch(
//   () => route.params.id,
//   (newId, oldId) => {
//     // This function will be executed whenever the value of route.params.id changes
//     console.log('Route parameter "id" changed from', oldId, "to", newId);

//     // Call your function here
//     getProductItem(route.params.id);
//   }
// );

// watchEffect(() => {
//   getProductItem(route.params.id);
//   //   console.log(product);
// });

onMounted(() => {
  productStore.getAllProducts();
  // console.log(productStore.products);
});
</script>
  
  <style scoped>
.productCont {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 5px;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1228px;
  flex-grow: 1;
}

/* .productCont::-webkit-scrollbar {
    display: none;
  } */

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
  /* border-radius: 4px; */
  border: 2px solid #c2c2c2;
  background-color: #ffff;
  /* background-color: #e8e9eb; */
  /* background-color: #f39098; */
}

.image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  aspect-ratio: 1/1;
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

@media screen and (min-width: 600px) {
  .productCont {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 5px;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 900px;
    flex-grow: 1;
  }
}
@media screen and (min-width: 1000px) {
  .productCont {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    gap: 5px;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    flex-grow: 1;
  }
}
</style>