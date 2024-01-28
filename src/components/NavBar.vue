<template>
  <div class="nav d-flex justify-center align-center bg-black mb-10 ga-4 pa-2">
    <span
      :class="{ active: isRouterActive('home') }"
      class="nav-item pa-3 text-decoration-none"
      @click="navigateTo('home')"
      >Home
    </span>
    <span
      :class="{ active: isRouterActive('products') }"
      class="nav-item pa-3 text-decoration-none"
      @click="navigateTo('products')"
      >All Products</span
    >
    <span
      :class="{ active: isRouterActive('cart') }"
      class="nav-item mx-2 pt-4"
      @click="navigateTo('cart')"
      v-if="isLoggedIn"
    >
      <v-badge :content="cartStore.cartLength">
        <span class="material-symbols-outlined cart-icon">shopping_cart</span>
      </v-badge>
    </span>
    <span
      class="nav-item mx-2 pt-4"
      :class="{ active: isRouterActive('userProfile') }"
      @click="navigateTo('userProfile')"
      v-if="isLoggedIn"
      ><span class="material-symbols-outlined">account_circle</span></span
    >
    <span @click="navigateTo('login')" class="nav-item pa-3" v-if="!isLoggedIn">
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
  // scrollToSection(routeName);
  router.push({ name: routeName });
};

// const scrollToSection = (section) => {
//   const element = document.getElementById(section);
//   if (element) {
//     element.scrollIntoView({ behavior: "smooth" });
//   } else {
//     router.push({ name: section });
//   }
// };

watch(
  () => route.name,
  (newRoute) => {
    currentRoute.value = newRoute;
  }
);

watchEffect(() => {
  isLoggedIn.value = localStorageStore.isLoggedIn;
  // console.log(isLoggedIn.value)
  // cartStore.getCartItems(localStorageStore.userId);
});
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.nav {
  position: fixed;
  width: 100%;
  z-index: 999;
}
.nav-item {
  position: relative;
  cursor: pointer;
  transition: 0.3s;
}

.nav-item:hover {
  color: red;
}

.nav-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 0px;
  left: 0;
  height: 2px;
  transition: 0.3s;
}

.nav-item:hover::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 80%;
  left: 10%;
  height: 2px;
  background-color: red;
  color: red;
  transition: 0.3s;
}

.active {
  /* transition: 0.3s; */
  color: red;
}

.active::after {
  display: block;
  content: "";
  position: absolute;
  bottom: 0;
  left: 10%;
  width: 80%;
  height: 2px;
  background-color: red;
  transition: 0.3s;
}
</style>
