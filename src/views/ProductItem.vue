<template>
  <v-container class="d-flex justify-center">
    <v-card
      class="product border-md elevation-8"
      width="100%"
      max-width="400px"
      v-if="product"
    >
      <div class="inCartBtn">
        <span v-if="isItemInCart">In cart</span>
      </div>
      <div class="image">
        <v-img
          :src="product.productImageURL"
          :alt="product.name"
          aspect-ratio="1/1"
          width="100%"
        />
      </div>
      <div class="desc">
        <h3>{{ product.name }}</h3>
        <p>${{ product.price }} {{ product.quantity }}</p>
      </div>
      <div class="addToCartBtn pa-2" v-if="!isItemInCart">
        <v-btn
          @click="addToCart(product._id)"
          :class="addToCartBtnClass"
          :loading="isLoading"
          :disabled="isLoading"
          v-ripple
          >Add to cart</v-btn
        >
      </div>
      <div class="v-card-actions d-flex justify-center align-center" v-else>
        <v-btn
          rounded="0"
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
        <span class="quant mx-5" v-if="!isLoading">{{ productQuantity }}</span>

        <v-btn
          rounded="0"
          size="x-large"
          density="comfortable"
          :disabled="productQuantity === 20"
          @click="incrementProductQuantity"
        >
          <span class="material-symbols-outlined"> add </span>
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useLocalStorageStore } from "../store/localStorage";
import { useCartStore } from "../store/cart";
import router from "@/router";
import { endpoint } from "../constant/endpoint";
const route = useRoute();
const cartStore = useCartStore();
const localStorageStore = useLocalStorageStore();
const product = ref({});
const isItemInCart = ref(false);
const userId = ref(localStorageStore.userId);
const productId = ref(route.params.id);
// const addedToCart = ref(false);
const addToCartBtnClass = ref(
  " button v-btn v-btn--block v-btn--variant-outlined rounded-0 bg-black pa-7"
);
const productQuantity = ref(1);
const isLoading = ref(false);
console.log(productId.value);

const getProductItem = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/api/deployedProductDetail/${productId.value}`
    );

    if (res.status === 200) {
      // console.log(res.data);
      product.value = res.data;
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
      return;
    }
    const res = await axios.post(`${endpoint}/api/addToCart`, {
      userId: userId.value,
      productData: productData,
    });
    if (res.status === 200) {
      // addedToCart.value = true;
      isLoading.value = false;
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
      isItemInCart.value = res.data.isItemInCart;

      if (isItemInCart.value) {
        getProductQuantity();
      }
      // console.log(isItemInCart.value);
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

localStorageStore.getUserId();
onMounted(() => {
  getProductItem();

  if (localStorageStore.userId) {
    isItemInCart.value = false;
    checkItemInCart();
  }
});
</script>

<style scoped>
/* .cont {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
} */

/* .product {
  display: grid;
  grid-template-rows: 1fr auto;
  border: 1px solid #ccc;
} */

.image {
  width: 100%;
  overflow: hidden;
  /* Ensure images don't exceed their container */
}

/* .image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
} */

.desc {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  padding: 10px;
  box-sizing: border-box;
}

.productCont h3 {
  margin: 0;
  /* Remove default margin for better alignment */
}

.productCont p {
  margin: 0;
  /* Remove default margin for better alignment */
}

.product {
  position: relative;
}
.btn {
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
  padding: 10px;
}

.btn button {
  font-weight: bolder;
  font-size: 1rem;
  padding: 0.6rem 2rem;
  border: none;
  border-radius: 3px;
  color: white;
  background-color: crimson;
}

.btn button:hover {
  background-color: rgb(194, 17, 53);
}

/* .addToCartBtn {
  background-color: black;
} */

.addToCartBtn button {
  font-size: 1rem;
  font-weight: 600;
}

/* .addToCartBtn .button:hover {
  color: white;
  cursor: pointer;
  background-color: green;
} */

.inCartBtn {
  display: flex;
  justify-content: end;
  width: 100%;
}

.inCartBtn span {
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
</style>
