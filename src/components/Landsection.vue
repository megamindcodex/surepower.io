
<script setup>
// import { register } from "swiper/element/bundle";
// register();

import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const modules = [Autoplay, Pagination, Navigation];

const LandImages = [
  {
    name: "image1",
    url: "https://media.istockphoto.com/id/583809524/photo/alberta-wilderness-near-banff.jpg?s=612x612&w=0&k=20&c=hiI3ib9ibDxAgqEZEH09EO3JOw94v5xh6hzcuXGhO-M=",
  },
  {
    name: "image2",
    url: "https://media.istockphoto.com/id/1165153055/photo/beautiful-tunnel-view-in-yosemite-national-park-sunrise-in-californias-sierra-nevada.jpg?s=612x612&w=0&k=20&c=rbdc008IVtgaRhKWRcVUWstzL9P6ubnomlLtE-GMiD0=",
  },
  {
    name: "image3",
    url: "https://media.istockphoto.com/id/153721422/photo/path-in-winter-forest-on-a-misty-morning.jpg?s=612x612&w=0&k=20&c=583ADKusfSUyipJ8lkIxQL-Z8tpcA01F54Vmcpg6ZB8=",
  },
  {
    name: "image4",
    url: "https://media.istockphoto.com/id/542293746/photo/sunset-in-zell-am-see.jpg?s=612x612&w=0&k=20&c=58JAgIwxQXaHK6lxJlO63n4FCPkmFNG2cDuF50qG2ok=",
  },
  {
    name: "image5",
    url: "https://media.istockphoto.com/id/497710754/photo/night-in-the-snowy-mountains.jpg?s=612x612&w=0&k=20&c=doY_meZEDeX1y_ER6D-dn-9LmdUClylepsQvY-xPN4k=",
  },
  {
    name: "image6",
    url: "https://media.istockphoto.com/id/1441845155/photo/magical-winter-forest-under-the-mesmerizing-starry-sky-at-sunset.jpg?s=612x612&w=0&k=20&c=1I96ob0yn2f9gR3t5Pr2jGObNaTqrZ5DTt2LF6ivp78=",
  },
  {
    name: "image7",
    url: "https://media.istockphoto.com/id/1212352291/photo/scary-forest-with-fog-or-mist.jpg?s=612x612&w=0&k=20&c=epcOiFt-wGjm3VzaEskqswvrVnNmFkYZv6K85JvL8Tk=",
  },
  {
    name: "image8",
    url: "https://media.istockphoto.com/id/854663698/photo/milky-way-over-pinnacle-peak.jpg?s=612x612&w=0&k=20&c=mei-da5zljoRGtNuVyoLfwrgFhiHeejl1RlKCVHG-ts=",
  },
  {
    name: "image9",
    url: "https://media.istockphoto.com/id/890733698/photo/star-forest-sky-spruce-snow.jpg?s=612x612&w=0&k=20&c=_v36oTIj3UWiBnSN6qhi9-Yl2K-1OPB8fNaY0TptPLE=",
  },
  {
    name: "image10",
    url: "https://media.istockphoto.com/id/673337256/photo/fairy-tale-dark-foggy-forest.jpg?s=612x612&w=0&k=20&c=N82hD12GuU_s7_nqZpuToVWCRWgn_WwASa0ulbA24yo=",
  },
];
</script>


<template>
  <div id="landsection">
    <!-- <span class="text">Landing Section</span> -->

    <swiper
      v-if="LandImages"
      :centeredSlides="true"
      :space-between="10"
      :slidesPerView="2"
      :modules="modules"
      :loop="true"
      :navigation="true"
      :pagination="{
        clickable: true,
      }"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
    >
      <swiper-slide v-for="image in LandImages" :key="image.name">
        <div class="image">
          <img :src="image.url" :alt="image.name" />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
#landsection {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  /* height: 400px; */
  transition: 0.5s;
  aspect-ratio: 10/4;
  padding: 5px;
}

.swiper {
  width: 100%;
  height: 100%;
  /* overflow: visible; */
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
}
.image {
  width: 700px;
  height: 100%;
  border-radius: 1rem;
}

.image img {
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-radius: 1rem;
}

/* .swiper {
  width: 100%;
} */

.text {
  font-size: 15vw;
}

.slide-text {
  padding: 2rem;
  color: white;
  background-color: black;
}

@media screen and (min-width: 400px) {
  .text {
    font-size: 10vw;
  }
}

/* @media screen and (min-width: 600px) {
  #landsection {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    transition: 0.5s;
    aspect-ratio: 8/4;
  }
} */

@media screen and (min-width: 1200px) {
  .text {
    font-size: 7vw;
  }
}
</style>
