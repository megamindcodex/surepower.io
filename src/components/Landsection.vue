<template>
  <div id="landsection" class="d-flex justify-center align-center text-center">
    <span class="text">Landing Section</span>
  </div>
</template>

<script setup>
</script>

<style scoped>
#landsection {
  width: 100%;
  height: 100vh;
  background: teal;
  transition: 0.5s;
}

.text {
  font-size: 15vw;
}

@media screen and (min-width: 400px) {
  .text {
    font-size: 10vw;
  }
}

@media screen and (min-width: 1200px) {
  .text {
    font-size: 7vw;
  }
}
</style>
