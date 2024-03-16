
<script setup>
import axios from "axios";
import { useProductsStore } from "@/store/productStore";
import { onMounted } from "vue";

import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const modules = [Autoplay, Pagination, Navigation];

const productStore = useProductsStore();

onMounted(() => {
  productStore.getTrendingProducts();
  console.log(productStore.products);
});
</script>

<template>
  <div class="cont w-100 pa-3 mt-8">
    <h3 class="d-flex align-left w-100 pa-2">Trending</h3>
    <swiper
      :modules="modules"
      :slidesPerView="2"
      :space-between="10"
      :loop="true"
      :breakpoints="{
        '340': {
          slidesPerView: 3,
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
        delay: 1500,
        disableOnInteraction: false,
      }"
      v-if="productStore.products"
      class="container d-flex justify-center align-center"
      max-width="700px"
    >
      <swiper-slide
        v-for="product in productStore.trendingProducts"
        :key="product._id"
      >
        <RouterLink :to="'/productitem/' + product._id" class="product">
          <div class="product-card">
            <div class="image bg-white">
              <v-img :src="product.productImageURL" :alt="product.name" />
            </div>
            <div class="desc mt-2 px-2">
              <!-- <v-card-subtitle class="font-weight-bold pa-0">
                {{ product.brand }}
              </v-card-subtitle> -->
              <v-card-title class="text-overline pa-0">
                {{ product.name }}
              </v-card-title>
              <v-card-title class="text-subtitle-1 pa-0">
                ${{ product.price }}
              </v-card-title>
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
  border-top: 1px solid black;
  /* background-color: rgb(228, 228, 232); */
}
.product {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-decoration: none;
  color: #000;

  /* color: #01837b; */
}

.product-card {
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
  aspect-ratio: 5/3;
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

.productCont h3 {
  margin: 0;
}

.productCont p {
  margin: 0;
}

.swiper {
  width: 100%;
  max-width: 800px;
}

.swiper-slide {
  width: 100%;
  border-radius: 8px;
}
</style>