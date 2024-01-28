<template>
  <div class="d-flex align-center flex-column mt-16" style="height: 100dvh">
    <div
      class="d-flex flex-column justify-center align-center ga-4"
      v-if="cartStore.cartItems"
    >
      <v-card
        class="d-flex ga-4 pa-0 rounded custom-border"
        width="100%"
        v-for="product in cartStore.cartItems"
        :key="product._id"
      >
        <span class="delBtn">
          <span
            class="material-symbols-outlined"
            @click="
              cartStore.deleteCartItem(product._id, localStorageStore.userId)
            "
            >delete</span
          >
        </span>
        <div class="image">
          <v-img
            :src="product.productImageURL"
            :alt="product.name"
            width="244px"
            :aspect-ratio="2 / 1"
            contain
          />
        </div>
        <div class="d-flex flex-column justify-center">
          <p>{{ product.name }}</p>
          <p>${{ product.price }}</p>
          <p class="font-weight-bold">{{ product.quantity }}</p>
        </div>
        <div class="d-flex align-end flex-grow-1 justify-end">
          <RouterLink
            :to="'/productitem/' + product._id"
            class="text-decoration-none py-2 px-4 font-weight-bold bg-white"
            >details</RouterLink
          >
        </div>
      </v-card>
      <v-btn
        id="btn"
        v-ripple
        :loading="loading"
        :class="checkOutBtnClass"
        @click="checkOut()"
        v-show="cartStore.cartItems.length"
      >
        Checkout
      </v-btn>
    </div>
    <div class="cont" v-show="!cartStore.cartItems.length">
      <p>No item here</p>
    </div>
    <!-- <span>${{ subTotal }}</span> -->
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useCartStore } from "../store/cart";
import { useLocalStorageStore } from "../store/localStorage";
import { endpoint } from "../constant/endpoint";

const cartStore = useCartStore();
const localStorageStore = useLocalStorageStore();
localStorageStore.getUserId();
cartStore.getCartItems(localStorageStore.userId);
const userId = ref(localStorageStore.userId);
const checkOutBtnClass = ref(
  "v-btn v-btn--block  rounded-0  pa-6 bg-green-darken-3 rounded "
);
const loading = ref(false);

const checkOut = async () => {
  try {
    loading.value = true;
    const res = await axios.post(`${endpoint}/api/create-checkout-session`, {
      userId: userId.value,
    });

    if (res.status === 200) {
      loading.value = false;
      window.location.href = res.data.url;
      // console.log("Checkout successful", res.data);
      // console.log(res.data.url);
    } else {
      console.log("Error running checkout. Status code: ", res.status);
    }
  } catch (err) {
    console.log("Error running checkout: ", err.message);
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
/* .cont {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
} */

/* .cartCont {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
} */

.cartItem {
  position: relative;
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  width: 100%;
  padding: 0.4rem;
  border-radius: 5px;
  background-color: #c9c5c5;
}

.custom-border {
  border: 1px solid #b0afaf;
}
/* .image {
  width: 100%;
  overflow: hidden;
} */

/* .image img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  object-fit: contain; 
} */

.desc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.delBtn {
  position: absolute;
  top: 0.2rem;
  right: 0;
  transition: 0.5s;
}

.delBtn span:hover {
  color: crimson;
  cursor: pointer;
  padding-right: 3px;
  transform: scale(1.2);
  transition: 0.2s;
}
</style>
