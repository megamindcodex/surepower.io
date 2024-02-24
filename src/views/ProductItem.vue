<template>
  <div
    class="cont d-flex flex-column justify-center flex-grow-1"
    v-if="product"
  >
    <div class="product-card elevation-8 pa-2">
      <!-- <div class="inCart">
        <span v-if="isItemInCart">In cart</span>
      </div> -->
      <div class="image">
        <v-img :src="product.productImageURL" :alt="product.name" />
      </div>
      <div class="desc mt-10">
        <div class="body">
          <small> Brand:{{ product.brand }}</small>
          <h3>{{ product.name }}</h3>
          <v-card-subtitle>{{ product.category }}</v-card-subtitle>
          <p>${{ product.price }} {{ product.quantity }}</p>
          <p class="discription">
            {{ product.description }}
            {{ product.category }}
          </p>
          <div class="tags d-flex w-100 align-center mt-4">
            <v-chip
              size="x-small"
              class="tag bg-info"
              v-for="tag in product.tags"
              :key="tag"
            >
              <span>#{{ tag }}</span>
            </v-chip>
          </div>
        </div>
        <div class="action">
          <div class="addToCartBtn" v-if="!isItemInCart">
            <v-btn
              @click="addToCart(product._id)"
              :class="addToCartBtnClass"
              :loading="isLoading"
              :disabled="isLoading"
              v-ripple
            >
              Add to cart
            </v-btn>
          </div>
          <div class="v-card-actions d-flex justify-center align-center" v-else>
            <v-btn
              variant="outlined"
              icon="mdi-plus"
              size="x-large"
              density="comfortable"
              :disabled="productQuantity === 1"
              @click="decrementProductQuantity"
              ><span class="material-symbols-outlined"> remove </span></v-btn
            >

            <div class="loading" v-show="isLoading">
              <v-progress-circular
                class="ml-3 mr-1"
                indeterminate
                color="#00796B"
                :size="30"
              >
              </v-progress-circular>
            </div>
            <span class="quant mx-5" v-if="!isLoading">{{
              productQuantity
            }}</span>

            <v-btn
              variant="outlined"
              icon="mdi-plus"
              size="x-large"
              density="comfortable"
              :disabled="productQuantity === 20"
              @click="incrementProductQuantity"
            >
              <span class="material-symbols-outlined"> add </span>
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="relatedSection" v-if="categoryStore.products">
      <p>{{ categoryStore.length }}</p>
    </div> -->
  </div>
  <div class="section pt-10 pa-2">
    <!-- <RouterLink
      :to="'/category/' + product.category"
      class="text-decoration-none text-black text-h5 text-decoration-underline ml-4"
      >Relaetd Items</RouterLink
    > -->
    <!-- <RelatedSection
      :products="products"
      :getProductItem="getProductItem"
      :checkItemInCart="checkItemInCart"
    /> -->

    <!-- <RouterLink
      :to="'/category/' + product.category"
      class="text-decoration-none text-black text-h5 ml-4"
      >Same Brand</RouterLink
    > -->
    <!-- <BrandSection
      :checkItemInCart="checkItemInCart"
      :product="productsByBrand"
    /> -->
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, watch, watchEffect } from "vue";
import { useLocalStorageStore } from "../store/localStorage";
import { useCartStore } from "../store/cart";
import router from "@/router";
import { endpoint } from "../constant/endpoint";
import { useProductsStore } from "@/store/productStore";
import RelatedSection from "../components/RelatedSection.vue";
import BrandSection from "@/components/BrandSection.vue";
const route = useRoute();
const cartStore = useCartStore();
const localStorageStore = useLocalStorageStore();
const product = ref({});
const isItemInCart = ref(null);
const userId = ref(localStorageStore.userId);
const productId = ref(route.params.id);
const productStore = useProductsStore();
const products = ref(null);
const productsByBrand = ref(null);
// const addedToCart = ref(false);
const addToCartBtnClass = ref(
  " button v-btn v-btn--block v-btn--variant-outlined text-black px-4 py-6"
);

const productQuantity = ref(1);
const isLoading = ref(false);

const getProductItem = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/api/deployedProductDetail/${route.params.id}`
    );
    if (res.status === 200) {
      product.value = res.data;
      await productStore.getPoductsByCategory(product.value.category);
      products.value = productStore.productsByCategory.splice(0, 4);
      productStore.getProductsByBrand(product.value.brand);
      productsByBrand.value = productStore.productsByBrand;
      // checkItemInCart();
      // console.log(product.value.brand);
      // console.log("products By category fetched:", products.value);
    }
  } catch (err) {
    console.log("Failed to get product item:", err.message);
  }
};

const addToCart = async (productId) => {
  try {
    isLoading.value = true;
    const productData = {
      productId: productId,
      quantity: 1,
    };

    if (!localStorageStore.userId) {
      isLoading.value = true;
      router.push("/login");
      // return;
    }
    const res = await axios.post(`${endpoint}/api/addToCart`, {
      userId: userId.value,
      productData: productData,
    });
    if (res.status === 200) {
      // addedToCart.value = true;
      isLoading.value = false;
      isItemInCart.value = res.data.isItemInCart;
      console.log(res.data.isItemInCart);
      checkItemInCart();
      cartStore.getCartItems(userId.value);
      // console.log("Product added to cart successfully", res.data);
    }
  } catch (err) {
    console.log("Failed to add product to cart:", err.message);
  }
};

const checkItemInCart = async () => {
  try {
    // console.log(userId.value, productId);
    const res = await axios.get(`${endpoint}/api/checkItemInCart`, {
      params: { userId: userId.value, productId: productId.value },
    });

    if (res.status === 200) {
      isItemInCart.value = res.data;
      // getProductItem();

      if (isItemInCart.value) {
        getProductQuantity();
      }
      console.log(isItemInCart.value);
    }
  } catch (err) {
    console.error("Error chekign if item is in cart", err.message);
  }
};

const incrementProductQuantity = async () => {
  try {
    isLoading.value = true;
    const res = await axios.post(`${endpoint}/api/addProductQuantity`, {
      userId: userId.value,
      productId: productId.value,
    });

    if (res.status === 200) {
      productQuantity.value = res.data;
      isLoading.value = false;
    }
  } catch (err) {
    console.error("Error adding product quantity", err.message);
  }
};
const decrementProductQuantity = async () => {
  if (!localStorageStore.userId) {
    isItemInCart.value = false;
  } else {
    try {
      isLoading.value = true;
      const res = await axios.post(`${endpoint}/api/reduceProductQuantity`, {
        userId: userId.value,
        productId: productId.value,
      });

      if (res.status === 200) {
        productQuantity.value = res.data;
        isLoading.value = false;
      }
    } catch (err) {
      console.error("Error adding product quantity", err.message);
    }
  }
};

const getProductQuantity = async () => {
  try {
    console.log(userId.value);
    console.log(productId.value);
    const res = await axios.get(`${endpoint}/api/getProductQuantity`, {
      params: { userId: userId.value, productId: productId.value },
    });

    if (res.status === 200) {
      productQuantity.value = res.data;
    }
  } catch (err) {
    console.error("Error getting product quantity", err.message);
  }
};

watch(
  () => route.params.id,
  (newId, oldId) => {
    // This function will be executed whenever the value of route.params.id changes
    console.log('Route parameter "id" changed from', oldId, "to", newId);

    // Call your function here
    // getProductItem(route.params.id);
    checkItemInCart();
  }
);

watchEffect(() => {
  getProductItem();
  // checkItemInCart();
});

onMounted(() => {
  localStorageStore.getUserId();
  if (localStorageStore.userId) {
    // isItemInCart.value = false;
    getProductItem();
    checkItemInCart();
  }
});
</script>

<style scoped>
.cont {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: 100dvh; */
  padding: 1rem;
}

.product-card {
  position: relative;
  /* display: flex; */
  /* flex-direction: column; */
  width: 100%;
  max-width: 390px;
  background-color: #ffff;
  border-radius: 8px;
}

.desc {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
  /* flex-basis: 50%; */
  /* box-sizing: border-box; */
}

.image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* min-height: 300px; */
  /* aspect-ratio: 8/4; */
  /* Ensure images don't exceed their container */
}

.image img {
  width: 100%;
  object-fit: contain;
}

.productCont h3 {
  margin: 0;
  /* Remove default margin for better alignment */
}

.productCont p {
  margin: 0;
  /* Remove default margin for better alignment */
}

/* .btn {
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
  padding: 10px;
} */

/* .btn button {
  font-weight: bolder;
  font-size: 1rem;
  padding: 0.6rem 2rem;
  border: none;
  border-radius: 3px;
  color: white;
  background-color: crimson;
} */

/* .btn button:hover {
  background-color: rgb(194, 17, 53);
} */

/* .addToCartBtn {
  background-color: black;
} */

.action {
  display: flex;
  justify-content: end;
  padding: 0;
  width: 100%;
}

.addToCartBtn {
  width: 100%;
}
.addToCartBtn button {
  font-size: 1em;
  font-weight: 600;
  border-radius: 23px;
}

.inCart {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: end;
  width: 100%;
  z-index: 1;
}

.inCart span {
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 2rem;
  background: gray;
  color: white;
}

.quant {
  position: relative;
  left: 4px;
}

.section {
  border-top: 1px solid gray;
}

@media (min-width: 600px) {
  .cont {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: auto;
  }

  .product-card {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    column-gap: 1rem;
    width: 100%;
    /* height: 350px; */
    max-width: 700px;
    padding: 0.6rem;
    border: 1px solid #ccc;
    /* color: white; */
  }

  .image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    /* flex-basis: 50%; */
  }

  .image img {
    width: 100%;
    object-fit: contain;
  }

  .desc {
    display: flex;
    /* flex-direction: column; */
    row-gap: 1rem;
    width: 50%;
    justify-content: center;
    padding: 0.3rem;
    flex-basis: 50%;
  }

  .body {
    display: flex;
    flex-direction: column;
    flex-basis: 20rem;
    /* justify-self: center; */
    /* justify-self: center; */
  }
  .action {
    display: flex;
    justify-content: end;
    padding: 0;
  }

  .addToCartBtn {
    display: flex;
    justify-content: center;
    width: 50%;
  }
}
</style>
