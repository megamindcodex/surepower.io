<template>
  <v-app class="bg-base">
    <div class="mb-16">
      <NavBar />
      <CategoriesNavs />
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
import { onMounted, ref } from "vue";

const key = ref(0);
const categoryStore = useCategoryStore();

onMounted(() => {
  key.value++;
  categoryStore.getCategories();
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
.cart-panel {
  position: absolute;
  top: 100%;
  right: 15%;
  padding: 0.5rem;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.5);
  transition: 0.5s;
}
.cart-panel-btn {
  margin-left: 4em;
  cursor: pointer;
}

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
</style>
