<template>
  <div class="d-flex justify-center flex-column justify-center align-center">
    <Landsection />
    <CategoriesSection />
    <TrendingSection />
    <h3 class="d-flex align-left w-100 pa-2">Products</h3>
    <Products />
  </div>
</template>

<script setup>
import Landsection from "@/components/Landsection.vue";
import TrendingSection from "@/components/TrendingSection.vue";
import CategoriesSection from "@/components/CategoriesSection.vue";
import Products from "@/components/productss.vue";
import { useRouter } from "vue-router";
import { onMounted, onUnmounted } from "vue";

const router = useRouter();
const scroll_treshold = 1000;

const handleScroll = () => {
  if (window.scrollY > scroll_treshold) {
    router.push("/products");
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style>
</style>