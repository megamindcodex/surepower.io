


  
  <script setup>
// import router from "@/router";
import { useRoute, useRouter } from "vue-router";
// import { useRoute, useRouter } from "vue-router";
import { useCategoryStore } from "@/store/categoryStore";
import { onMounted, ref, watchEffect, watch, onBeforeMount } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const modules = [Autoplay, Pagination, Navigation];

const router = useRouter();
const route = useRoute();
const categoryStore = useCategoryStore();
const currentRoute = ref(null);
const isSticky = ref(false);
const isNotUserProfile = ref(true);

watch(
  () => router.currentRoute.value.fullPath,
  (newRoute) => {
    currentRoute.value = newRoute;
    // console.log(newRoute);

    if (currentRoute.value === "/userProfile") {
      isNotUserProfile.value = false;
      console.log(newRoute);
    } else if (currentRoute.value === "/login") {
      isNotUserProfile.value = false;
    } else if (currentRoute.value === "/signup") {
      isNotUserProfile.value = false;
    } else {
      isNotUserProfile.value = true;
    }
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

// const handleScroll = () => {
//   // Adjust the threshold value based on when you want the navbar to become sticky
//   isSticky.value = window.scrollY > 170;
//   // console.log(isSticky.value);
// };

// // if (router.currentRoute.value.name === "userProfile") {
// //   isNotUserProfile.value = false;
// // }

// // getRouteName();
// onMounted(() => {
//   window.addEventListener("scroll", handleScroll);
//   categoryStore.getCategories();
// });

// onBeforeMount(() => {
//   window.removeEventListener("scroll", handleScroll);
// });
</script>
  


<template>
  <!-- <div
    class="cont"
    :class="{ 'sticky-header': isSticky }"
    v-if="isNotUserProfile"
  >
    <div class="d-flex ga-2 chips">
      <swiper
        :modules="modules"
        :slidesPerView="5"
        :spaceBetween="5"
        v-if="categoryStore.categories"
      >
        <swiper-slide
          v-for="(category, index) in categoryStore.categories"
          :key="index"
        >
          <v-chip
            :class="{ active: activeRoute(category.name) }"
            class="chip"
            @click="navigateTo(category.name)"
          >
            {{ category.name }}
          </v-chip>
        </swiper-slide>
      </swiper>
    </div>
  </div> -->

  <div
    class="cont mx-16 px-2"
    :class="{ 'sticky-header': isSticky }"
    v-if="isNotUserProfile"
  >
    <div v-if="categoryStore.categories" class="d-flex ga-2 chips">
      <span
        v-for="(category, index) in categoryStore.categories"
        :key="index"
        :class="{ active: activeRoute(category.name) }"
        class="chip pa-2"
        @click="navigateTo(category.name)"
      >
        {{ category.name }}
      </span>
    </div>
  </div>
</template>


  <style scoped>
.cont {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* margin-left: auto;
  margin-right: auto;
  padding-left: 14px;
  padding-right: 14px; */
}

/* .swiper {
  width: 100%;
  max-width: 600px;
  overflow: auto;
} */

/* .swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
} */

.chips {
  display: flex;
  justify-content: start;
  align-items: center;
  width: fit-content;
  overflow-x: scroll;
  border-radius: 20px;
  scrollbar-width: none;
  scrollbar-color: black gray;
}

.chip {
  /* background-color: rgba(0, 0, 0, 0.464); */
  border-radius: 20px;
  white-space: nowrap;
  font-size: 13px;
  transition: 0.3s;
  width: fit-content;
  cursor: pointer;
}

.chip:hover {
  color: red;
  background-color: rgba(255, 0, 0, 0.188);
  transition: 0.3s;
}

.active {
  /* transition: 0.3s; */
  color: red;
  background-color: rgba(255, 0, 0, 0.188);
}

.sticky-header {
  position: sticky;
  top: -0.4rem;
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

  .drawer {
    display: none;
  }
  /* .login-link {
    display: none;
  } */

  .sticky-header {
    position: sticky;
    top: 0.3px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-content: center;
    z-index: 999;
    transition: ease 0.3s;
    border-bottom: 2px solid #efeded;
    background-color: #00000091;
    /* transform: translateY(8.5rem); */
    backdrop-filter: blur(3px);
    padding: 0;
  }
}

@media screen and (min-width: 750px) {
  .sticky-header {
    position: sticky;
    top: -1.5rem;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-content: center;
    z-index: 999;
    transition: ease 0.3s;
    border-bottom: 2px solid #c2c2c2;
    background-color: #00000091;
    color: #fff;
    /* font-weight: bold; */
    transform: translateY(5.5rem);
    backdrop-filter: blur(3px);
  }
}
/* @media screen and (min-width: 800px) {
  .sticky-header {
    position: sticky;
    top: 0;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-content: center;
    z-index: 999;
    transition: ease 0.3s;
    border-bottom: 2px solid #c2c2c2;
    background-color: #00000013;
    transform: translateY(6.8rem);
    backdrop-filter: blur(3px);
  }
} */
</style>