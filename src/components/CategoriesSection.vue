
<script setup>
import axios from "axios";
import { useCategoryStore } from "@/store/categoryStore";
import { onMounted } from "vue";

import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const modules = [Autoplay, Pagination, Navigation];

const categoryStore = useCategoryStore();

onMounted(() => {
  categoryStore.getCategories();
  console.log(categoryStore.categories);
});
</script>

<template>
  <div class="cont w-100 pa-3 mt-8">
    <h1 class="text-red">Categories</h1>
    <swiper
      :slidesPerView="2"
      :space-between="10"
      :loop="true"
      :modules="modules"
      :breakpoints="{
        '340': {
          slidesPerView: 2,
          spaceBetween: 8,
        },
        '568': {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        '760': {
          slidesPerView: 5,
          spaceBetween: 10,
        },
      }"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      v-if="categoryStore.categories"
      class="container d-flex justify-center align-center"
      max-width="700px"
    >
      <swiper-slide
        v-for="category in categoryStore.categories"
        :key="category._id"
      >
        <RouterLink :to="'/category/' + category.name" class="category">
          <div class="category-card">
            <div class="image bg-white">
              <v-img :src="category.categoryImageURL" :alt="category.name" />
            </div>
            <div class="desc mt-2 px-2">
              <!-- <v-card-subtitle class="font-weight-bold pa-0">
                {{ product.brand }}
              </v-card-subtitle> -->
              <!-- <v-card-title class="text-overline pa-0">
                {{ category.name }}
              </v-card-title>
              <v-card-title class="text-subtitle-1 pa-0">
                {{ category.description }}
              </v-card-title> -->
            </div>
            <div class="back-lay">
              <span>{{ category.name }}</span>
            </div>
          </div>
        </RouterLink>
        <!-- <v-responsive width="100%"></v-responsive> -->
      </swiper-slide>
    </swiper>
  </div>
</template>


<style scoped>
.cont {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgb(228, 228, 232);
}
.category {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  text-decoration: none;
  color: #000;
  border-radius: 5px;
  /* color: #01837b; */
}

.category-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border-radius: 5px;
  border: 2px solid #c2c2c2;
  background-color: #ffff;
}

.image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  aspect-ratio: 1/1;
  border-radius: 5px;
}

.image img {
  width: 100%;
  /* object-fit: contain; */
}

.desc {
  display: flex;
  flex-direction: column;
  /* padding: 10px; */
  /* box-sizing: border-box; */
  /* max-width: auto-fit; */
}

.categoryCont h3 {
  margin: 0;
}

.categoryCont p {
  margin: 0;
}

.swiper {
  width: 100%;
  max-width: 1300px;
}

.swiper-slide {
  position: relative;
  width: 100%;
  border-radius: 8px;
}

.swiper-slide a {
  position: relative;
}

.back-lay {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.411);
}

.back-lay span {
  position: relative;
  text-align: center;
  color: white;
  font-weight: bolder;
  font-size: 1.5em;
}
</style>