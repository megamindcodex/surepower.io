<template>
  <v-container class="cont">
    <v-sheet
      elevation="12"
      max-width="600"
      rounded="lg"
      width="100%"
      class="pa-4 text-center mx-auto mt-10"
    >
      <svg
        style="width: 20%; height: 30%"
        class="text-success"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fill-rule="evenodd"
          d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z"
          clip-rule="evenodd"
        />
      </svg>

      <h2 class="text-h5 mb-6">Payment Successfull</h2>

      <p class="mb-4 text-medium-emphasis text-body-2">
        an email has been sent to your email address to view your reciept for
        your recent purchase
        <a href="#" class="text-decoration-none text-info"
          >View reconciliation report.</a
        >

        <br />

        Otherwise, you're done!
      </p>

      <v-divider class="mb-4"></v-divider>

      <div class="text-end">
        <v-btn
          class="text-none"
          color="success"
          rounded
          variant="flat"
          width="90"
        >
          Done
        </v-btn>
      </div>
    </v-sheet>
  </v-container>
</template>

<script setup>
import axios from "axios";
import { useLocalStorageStore } from "@/store/localStorage";
import { onMounted, ref } from "vue";
import { useCartStore } from "../store/cart";
import { endpoint } from "../constant/endpoint";

const localStorageStore = useLocalStorageStore();
const userId = ref(localStorageStore.userId);
const cartStore = useCartStore();

const clear_cart_itmes = async () => {
  try {
    const res = await axios.delete(`${endpoint}/api/clear_cart_items`, {
      params: { userId: userId.value },
    });

    if (res.status === 200) {
      console.log(res.data);
      cartStore.getCartItems(userId.value);
    }
  } catch (err) {
    console.error("Error clearing out cart items:", err.message);
  }
};

onMounted(() => {
  clear_cart_itmes();
});
</script>

<style scoped>
.cont {
  height: 100dvh;
}
</style>