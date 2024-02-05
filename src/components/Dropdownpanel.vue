<template>
  <div class="sm-nav">
    <span
      :class="{ active: isRouterActive('home') }"
      @click="navigateTo('home')"
      >Home
    </span>
    <span
      :class="{ active: isRouterActive('products') }"
      @click="navigateTo('products')"
      >Shop</span
    >

    <div class="cartCont d-flex justify-center align-center mr-4">
      <span
        :class="{ active: isRouterActive('cart') }"
        @click="navigateTo('cart')"
        class="ml-4"
        v-if="isLoggedIn"
      >
        cart
      </span>
      <v-badge
        v-show="cartStore.cartLength"
        :content="cartStore.cartLength"
      ></v-badge>
    </div>

    <span
      :class="{ active: isRouterActive('userProfile') }"
      @click="navigateTo('userProfile')"
      v-if="isLoggedIn"
      >Account
      <!-- <span class="material-symbols-outlined">account_circle</span> -->
    </span>

    <span
      :class="{ active: isRouterActive('login') }"
      @click="navigateTo('login')"
      v-if="!isLoggedIn"
    >
      Login
    </span>
  </div>
</template>

<script setup>
import { ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCartStore } from "../store/cart";
import { useLocalStorageStore } from "../store/localStorage";

const cartStore = useCartStore();
const localStorageStore = useLocalStorageStore();
localStorageStore.getUserId();
const isLoggedIn = ref(false);

const currentRoute = ref(null);
const route = useRoute();
const router = useRouter();

const isRouterActive = (routeName) => {
  return currentRoute.value === routeName;
};

const navigateTo = (routeName) => {
  router.push({ name: routeName });
};

watch(
  () => route.name,
  (newRoute) => {
    currentRoute.value = newRoute;
  }
);

watchEffect(() => {
  isLoggedIn.value = localStorageStore.isLoggedIn;
  // console.log(isLoggedIn.value)
  cartStore.getCartItems(localStorageStore.userId);
});
</script>

<style scoped>
.sm-nav {
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 0.4rem;
  /* justify-content: center; */
  /* align-items: center; */
  width: 100%;
  margin-bottom: 2rem;
}

.sm-nav span {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  padding: 0.5rem;
  border-radius: 6px;
}
.active {
  color: red;
  background-color: #dddd;
  font-weight: bold;
}

/* .active::after {
  display: block;
  content: "";
  position: relative;
  bottom: 0;
  left: 10%;
  width: 80%;
  height: 2px;
  background-color: red;
  transition: 0.3s;
} */
</style>