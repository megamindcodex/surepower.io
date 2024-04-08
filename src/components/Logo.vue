<template>
  <RouterLink to="/" class="cont d-flex justify-center">
    <div class="image">
      <v-img class="v-image" alt="markTio, logo" :src="logoURL"></v-img>
    </div>
  </RouterLink>
</template>

<script setup>
import logoURL from "../assets/surepower-logo.jpg";
</script>

<style scoped>
.cont {
  position: relative;
  display: flex;
  justify-items: center;
  align-self: center;
  width: 50px;
  align-self: center;
}

.image {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 1/1;
}

.v-img {
  width: 100%;
}

@media screen and (min-width: 600px) {
  .cont {
    display: flex;
    justify-items: center;
    align-items: center;
    width: 110px;
    /* margin-left: ; */
  }

  .image {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1/1;
    width: 50%;
  }

  .v-img {
    width: 100%;
    height: 100%;
  }
}
</style>
