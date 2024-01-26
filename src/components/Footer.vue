

<template>
  <v-footer class="bg-black d-flex flex-column ga-4">
    <div class="d-flex">
      <div v-for="icon in iconLinks" :key="icon">
        <a :href="icon.link" class="a pa-1">
          <i :class="icon.icon"></i>
        </a>
      </div>
    </div>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa iure
      consectetur vitae fugit ut? Incidunt blanditiis neque odit tempora
      impedit? Natus totam necessitatibus minus eos. lorem25
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa iure
      consectetur vitae fugit ut? Incidunt blanditiis neque odit tempora
      impedit? Natus totam necessitatibus minus eos. lorem25
    </p>
    <p class="copyrite-date text-grey">
      {{ new Date().getFullYear() }}
      Megamindcodex
    </p>
  </v-footer>
</template>

<script setup>
import { reactive } from "vue";

const iconLinks = reactive([
  {
    icon: "fa-brands fa-discord pa-2",
    link: "https://discord.com",
  },
  {
    icon: "fa-brands fa-twitter pa-2",
    link: "https://twitter.com/megamindcodex",
  },
  {
    icon: "fa-brands fa-github pa-2",
    link: "https://github.com/megamindcodex",
  },
  {
    icon: "fa-brands fa-youtube pa-2",
    link: "https://www.youtube.com/vsauce",
  },
]);
</script>

<style scoped>
.a {
  transition: 0.3s;
  color: white;
}

.a:hover {
  color: red;
}
</style>