<template>
  <div class="d-flex justify-center flex-column justify-center align-center">
    <Landsection />
    <CategoriesSection />
    <TrendingSection />
    <div class=""><strong>Products</strong></div>
    <Products />
  </div>
</template>

<script setup>
import Landsection from "@/components/Landsection.vue";
import TrendingSection from "@/components/TrendingSection.vue";
import CategoriesSection from "@/components/CategoriesSection.vue";
import Products from "@/views/Products.vue";
import { useRouter } from "vue-router";
import { onMounted, onUnmounted } from "vue";

const scroll_treshold = 800;

const router = useRouter();

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