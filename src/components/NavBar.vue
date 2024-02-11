<template>
  <div :class="{ 'sticky-header': isSticky }" class="header pa-1">
    <div class="menu">
      <span
        class="material-symbols-outlined pa-2"
        @click.stop="drawer = !drawer"
        >menu</span
      >
    </div>
    <Logo />
    <div class="nav mx-8" v-if="display">
      <span
        :class="{ active: activeRoute('home') }"
        class="nav-item pa-4 text-decoration-none"
        @click="navigateTo('home')"
        >Home
      </span>
      <span
        :class="{ active: activeRoute('products') }"
        class="nav-item pa-4 text-decoration-none"
        @click="navigateTo('products')"
        >Shop</span
      >
    </div>
    <div class="cartCont d-flex justify-end align-center mr-4">
      <span
        :class="{ active: activeRoute('cart') }"
        class="nav-item mx-2 pt-4"
        @click="navigateTo('cart')"
        v-if="isLoggedIn"
      >
        <span class="material-symbols-outlined cart-icon"
          >shopping_cart
          <v-badge
            v-if="cartStore.cartLength"
            :content="cartStore.cartLength"
            class="badge"
            color="red-darken-1"
          >
          </v-badge>
        </span>
      </span>
      <span
        class="nav-item mx-2 pt-4 account-circle"
        :class="{ active: activeRoute('userProfile') }"
        @click="navigateTo('userProfile')"
        v-if="isLoggedIn"
        ><span class="material-symbols-outlined">account_circle</span></span
      >
      <span
        :class="{ active: activeRoute('login') }"
        class="nav-item mx2 pa-4"
        @click="navigateTo('login')"
        v-if="!isLoggedIn"
      >
        Login
      </span>
    </div>
  </div>

  <v-navigation-drawer v-model="drawer" temporary class="drawer">
    <div class="close">
      <span class="material-symbols-outlined pa-2" @click="drawer = !drawer">
        close
      </span>
    </div>
    <Dropdownpanel />
  </v-navigation-drawer>
</template>

<script setup>
import axios from "axios";
import { onBeforeMount, onMounted, ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCartStore } from "../store/cart";
import { useLocalStorageStore } from "../store/localStorage";
import Logo from "./Logo.vue";
import { endpoint } from "@/constant/endpoint";
import Dropdownpanel from "./Dropdownpanel.vue";
// import CategoriesNavs from "./CategoriesNavs.vue";

const cartStore = useCartStore();
const localStorageStore = useLocalStorageStore();
localStorageStore.getUserId();
const isLoggedIn = ref(false);

const route = useRoute();
const router = useRouter();

const display = ref(true);
const drawer = ref(false);
const isSticky = ref(false);

const categories = ref(null);
const message = ref(null);

const getCategories = async () => {
  try {
    const res = await axios.get(`${endpoint}/api/deployedCategories`);

    if (res.status === 200) {
      categories.value = res.data;
      // console.log(res.data);
    }
  } catch (err) {
    // message.value = res.data;
    console.log("Error getting categories", err, err.message);
  }
};

const currentRoute = ref(null);
const activeRoute = (routeName) => {
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

const handleScroll = () => {
  // Adjust the threshold value based on when you want the navbar to become sticky
  isSticky.value = window.scrollY < 300;
  // console.log(isSticky.value);
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  getCategories();
});

onBeforeMount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.header {
  position: relative;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: center;
  z-index: 999;
  border-bottom: 1px solid #c2c2c2;
  transition: ease 1s;
}

.sticky-header {
  position: sticky;
  top: 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: center;
  z-index: 999;
  transition: ease 1s;
  /* border-bottom: 2px solid #c2c2c2; */
  background-color: #00000013;
}

/* .is-top {
  transition: ease 1s;
} */

.drawer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
}

.close {
  position: sticky;
  top: 0px;
  z-index: 200;
  width: 20px;
}

.close span {
  font-weight: bold;
}
.nav {
  display: none;
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
  left: 10%;
  width: 80%;
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

.account-circle {
  display: none;
}
.menu {
  display: flex;
  align-items: center;
}

.menu span {
  font-size: 2rem;
  cursor: pointer;
}

.badge {
  position: absolute;
}

.cart-icon {
  position: relative;
}

@media screen and (min-width: 600px) {
  .header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-content: center;
    z-index: 999;
  }
  .nav {
    display: flex;
    column-gap: 0.5rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 500px;
  }

  .account-circle {
    display: block;
  }

  .menu {
    display: none;
  }

  .drawer {
    display: none;
  }
  /* .login-link {
    display: none;
  } */
}
</style>
