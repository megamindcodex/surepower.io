

<template>
  <div class="cont pa-4" :class="{ 'sticky-header': isSticky }">
    <div class="d-flex ga-2 chips" v-if="categoryStore.categories">
      <v-chip
        v-for="(category, index) in categoryStore.categories"
        :key="index"
        :class="{ active: activeRoute(category.name) }"
        class="pa-2 chip"
        @click="navigateTo(category.name)"
      >
        {{ category.name }}
      </v-chip>
    </div>
  </div>
</template>
  
  <script setup>
// import router from "@/router";
import { useRoute, useRouter } from "vue-router";
// import { useRoute, useRouter } from "vue-router";
import { useCategoryStore } from "@/store/categoryStore";
import { onMounted, ref, watchEffect, watch, onBeforeMount } from "vue";

const router = useRouter();
const route = useRoute();
const categoryStore = useCategoryStore();
const currentRoute = ref(null);
const isSticky = ref(false);

watch(
  () => router.currentRoute.value.fullPath,
  (newRoute) => {
    currentRoute.value = newRoute;
    // console.log(newRoute);
  }
);

const navigateTo = (routeName) => {
  try {
    router.push({ name: "category", params: { name: routeName } });
  } catch (error) {
    console.error("Error navigating to route:", error);
  }
};

const activeRoute = (routeName) => {
  // Decode the current route value before comparison
  const decodedCurrentRoute = decodeURIComponent(currentRoute.value);
  // Decode the routeName before comparison
  const decodedRouteName = decodeURIComponent(`/category/${routeName}`);
  return decodedCurrentRoute === decodedRouteName;
};

const handleScroll = () => {
  // Adjust the threshold value based on when you want the navbar to become sticky
  isSticky.value = window.scrollY < 300;
  // console.log(isSticky.value);
};

// getRouteName();
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  categoryStore.getCategories();
});

onBeforeMount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
  
  <style scoped>
.cont {
  display: flex;
  width: 100%;
}

.chips {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.chip {
  transition: 0.3s;
}

.chip:hover {
  color: red;
  transition: 0.3s;
}

.active {
  /* transition: 0.3s; */
  color: red;
}

.sticky-header {
  position: sticky;
  top: 5.5rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: center;
  z-index: 999;
  transition: ease 1s;
  /* border-bottom: 2px solid #c2c2c2; */
  background-color: #00000013;
}
</style>