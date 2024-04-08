<template>
  <v-container
    class="container d-flex justify-center align-center"
    max-width="700px"
  >
    <!-- <div class="loading" v-if="productStore.loading">
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
          <div class="desc mt-2 px-2">
            <v-card-subtitle class="font-weight-bold pa-0">
              {{ product.brand }}
            </v-card-subtitle>
            <v-card-title class="text-overline font-weight-bold pa-0">
              {{ product.name }}
            </v-card-title>
            <v-card-title class="text-subtitle-1 pa-0">
              ${{ product.price }}
            </v-card-title>
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
// import Landingsection from "../components/Landsection.vue";
import { ref } from "vue";
import { useProductsStore } from "../store/productStore";

const seeProductBtnClass = ref(
  "v-btn v-btn--block v-btn--variant-outlined pa-4"
);

const productStore = useProductsStore();
const getAllProducts = async () => {
  try {
    // const allProducts = await productStore.getAllProducts();
    // console.log(allProducts);
    const products = await productStore.getAllProducts();
    return products;
  } catch (err) {
    console.error("Error getting all products:", err); // Log the actual error object
  }
};
const products = getAllProducts();
console.log(products);

// console.log(productStore.products);
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
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 5px;
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
  } */

/* 
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
  