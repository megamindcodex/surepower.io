<template>
  <RouterLink to="/" class="cont">
    <div class="image">
      <v-img class="v-imag w-100" alt="markTio, logo" :src="logoURL"></v-img>
    </div>
  </RouterLink>
</template>

<script setup>
import logoURL from "../assets/logo.png";
</script>

<style scoped>
.cont {
  position: relative;
  display: flex;
  justify-items: center;
  align-self: center;
  width: 100px;
  align-self: center;
  aspect-ratio: 16/9;
}

.image {
  position: relative;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  width: 80px;
}

@media screen and (min-width: 600px) {
  .cont {
    display: flex;
    justify-items: center;
    align-items: center;
    width: 100px;
    align-self: center;
    aspect-ratio: 16/9;
  }
}
</style>
