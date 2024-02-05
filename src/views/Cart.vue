<template>
  <div v-if="cartStore.cartItems" class="cont">
    <div class="cart-items">
      <div
        v-for="product in cartStore.cartItems"
        :key="product._id"
        class="cart-item elevation-7"
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
          <img :src="product.productImageURL" :alt="product.name" />
        </div>
        <div class="desc">
          <div class="body">
            <h3>{{ product.name }}</h3>
            <p>${{ product.price }}</p>
            <p class="font-weight-bold">{{ product.quantity }}</p>
          </div>
          <div class="link">
            <RouterLink :to="'/productitem/' + product._id">
              <span class="material-symbols-outlined"> open_in_new </span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <div class="summary-cont">
      <v-table class="summary">
        <thead>
          <tr>
            <th class="text-left text-h6">Name</th>
            <th class="text-left text-h6">Price</th>
            <th class="text-left text-h6">Quanity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in cartStore.cartItems" :key="product.name">
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.quantity }}</td>
          </tr>
          <div class="d-flex flex-column pa-4 mt-8">
            <span class="text-h6 font-weight-bold">Total:</span>
            <span class="text-subtitle-1 font-weight-bold">{{
              cartStore.subTotal
            }}</span>
          </div>
        </tbody>
      </v-table>
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
  </div>
  <!-- <div
    v-if="!cartStore.cartItem >= 1"
    class="cont d-flex flex-column justify-center align-center w-100 flex-grow-1"
  >
    <span class="text-h5 text-center font-weight-medium">No item here</span>
  </div> -->
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
  "v-btn v-btn--block  rounded-0  pa-6 bg-blue-darken-2 rounded "
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

.cont {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 4rem;
}
.cart-items {
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  padding: 0.5rem;
  /* max-width: 400px; */
}

.cart-item {
  position: relative;
  display: flex;
  padding: 0.5rem;
  background: #fff;
  border-radius: 10px;
}

.image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  aspect-ratio: 1/1;
}

.image img {
  width: 100%;
  object-fit: contain;
}

.desc {
  display: flex;
  /* flex-direction: column; */
  justify-content: end;
  align-items: center;
  width: 100%;
  /* flex-basis: 300px; */
}

.body {
  display: flex;
  justify-content: center;
  /* align-items: center; */
  column-gap: 1rem;
  width: 100%;
  flex-basis: 500px;
}

.link {
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  align-self: end;
}

.link a {
  color: blue;
}

.delBtn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  transition: 0.5s;
}

.delBtn span:hover {
  color: crimson;
  cursor: pointer;
  padding-right: 3px;
  transform: scale(1.2);
  transition: 0.2s;
}

.summary-cont {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
}

.summary {
  width: 100%;
}

@media (min-width: 600px) {
  .cont {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: auto;
    margin-top: 4rem;
  }

  .cart-items {
    width: 50%;
  }

  .summary-cont {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    justify-content: center;
    align-items: center;
    width: 50%;
    max-width: 500px;
  }

  .summary {
    flex-basis: 360px;
  }
}
</style>
