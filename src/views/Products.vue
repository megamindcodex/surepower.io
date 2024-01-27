<template>
  <div id="products" class="d-flex justify-center align-center mx-10 pt-16">
    <div class="loading" v-if="productStore.loading">
      <v-progress-circular indeterminate color="#00796B" :size="200">
        Loading....
      </v-progress-circular>
    </div>
    <div class="productCont" v-if="productStore.products">
      <div
        class="product"
        v-for="product in productStore.products"
        :key="product._id"
      >
        <v-card class="border-md elevation-8" width="100%">
          <div class="image d-flex justify-center align-center">
            <v-img
              :src="product.productImageURL"
              :alt="product.name"
              width="300px"
              :aspect-ratio="4 / 2"
              contain
            />
          </div>
          <div class="bg-black">
            <v-card-title class="text-wrap">{{ product.name }}</v-card-title>
            <v-card-subtitle class="text-white"
              >${{ product.price }}</v-card-subtitle
            >
            <v-card-actions class="d-flex justify-center full-width pa-1">
              <RouterLink
                :to="'/productitem/' + product._id"
                :class="seeProductBtnClass"
                v-ripple
                >See product</RouterLink
              >
            </v-card-actions>
          </div>
        </v-card>
      </div>
    </div>
    <div class="productCont" v-else>
      <h3>No Products Found</h3>
    </div>
  </div>
</template>

<script setup>
// import Landingsection from "../components/Landsection.vue";
import { ref } from "vue";
import { useProductsStore } from "../store/productStore";

const seeProductBtnClass = ref(
  "v-btn v-btn--block v-btn--variant-outlined rounded-0  pa-4"
);

const productStore = useProductsStore();
productStore.getAllProducts();
</script>

<style scoped>
.productCont {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  justify-content: center;
  width: 80%;
}

.product {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* border: 1px solid #ccc;  */
}

.image {
  width: 100%;
  overflow: hidden;
}

.image img {
  width: 100%;
  aspect-ratio: 2/1;
  object-fit: contain;
}

.desc {
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
}

.productCont h3 {
  margin: 0;
}

.productCont p {
  margin: 0;
}

.addToCartBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
}

.loading {
  position: absolute;
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
/* .addToCartBtn a {
  text-decoration: none;
  color: black;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  width: 95%;
  padding: 0.5rem 1rem;
  border: 1.5px solid rgb(5, 119, 72);
  background: transparent;
  cursor: pointer;
  transition: 0.3s;
}

.addToCartBtn a:hover {
  color: white;
  transition: 0.3s;
  background-color: green;
} */

/* .cartIcon {
  display: flex;
  background-color: red;
}

.cartIcon svg {
  width: 24px;
  height: auto;
} */
</style>
