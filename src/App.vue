<template>
  <v-app class="bg-base">
    <div class="mb-16">
      <div class="head py-2 px-0" :class="{ 'sticky-header': isSticky }">
        <NavBar :showDrawer="showDrawer" />
        <CategoriesNavs />
      </div>
      <v-navigation-drawer v-model="drawer" temporary class="drawer">
        <div class="close">
          <span
            class="material-symbols-outlined pa-2"
            @click="drawer = !drawer"
          >
            close
          </span>
        </div>
        <Dropdownpanel />
      </v-navigation-drawer>
      <RouterView />
    </div>
    <Footer />
  </v-app>
</template>

<script setup>
import Footer from "./components/Footer.vue";
import NavBar from "./components/NavBar.vue";
import CategoriesNavs from "./components/CategoriesNavs.vue";
import { useCategoryStore } from "./store/categoryStore";
import { onBeforeMount, onMounted, ref } from "vue";
import Dropdownpanel from "./components/Dropdownpanel.vue";

const key = ref(0);
const categoryStore = useCategoryStore();
const isSticky = ref(false);
const drawer = ref(true);

const showDrawer = () => {
  drawer.value = !drawer.value;
  console.log(drawer.value);
};

const handleScroll = () => {
  // Adjust the threshold value based on when you want the navbar to become sticky
  isSticky.value = window.scrollY > 170;
  // console.log(isSticky.value);
};

// if (router.currentRoute.value.name === "userProfile") {
//   isNotUserProfile.value = false;
// }

// getRouteName();
onMounted(() => {
  key.value++;
  categoryStore.getCategories();
  window.addEventListener("scroll", handleScroll);
  categoryStore.getCategories();
});

onBeforeMount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>


<style scoped>
* {
  text-decoration: none;
  box-sizing: border-box;
}

.bg-base {
  background-color: #f7f9f9;
}

.head {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: #00000091; */
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}

/* nav {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 1rem;
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
} */

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  position: relative;
  color: black;
  text-decoration: none;
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  font-size: 1rem;
}

nav a:first-of-type {
  border: 0;
}
.cart-panel-cont {
  /* position: relative; */
  display: flex;
  justify-content: center;
}

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

/* .cart-panel {
  position: absolute;
  top: 100%;
  right: 15%;
  padding: 0.5rem;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.5);
  transition: 0.5s;
} */
/* .cart-panel-btn {
  margin-left: 4em;
  cursor: pointer;
} */

.cart-icon {
  font-size: 1.5rem;
  position: relative;
}

.main {
  display: flex;
  justify-content: center;
  background: crimson;
}

/* .iconLinks a {
  cursor: pointer;
} */

.sticky-header {
  position: sticky;
  top: -5rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: center;
  z-index: 999;
  transition: ease 0.3s;
  color: #ffff;
  /* border-bottom: 2px solid #c2c2c2; */
  background-color: #00000091;

  transform: translateY(4rem);
}
</style>
