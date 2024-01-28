import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { endpoint } from "../constant/endpoint";

export const useProductsStore = defineStore("productStore", {
  state: () => ({
    products: ref([]),
    loading: ref([]),
  }),
  getters: {
    ProductLength: (state) => state.products.length,
  },
  actions: {
    async getAllProducts() {
      try {
        this.loading = true;
        const res = await axios.get(`${endpoint}/api/productsDeployed`);
        if (res.status === 200) {
          const data = res.data;
          this.products = data;
          console.log(data);
        }
        this.loading = false;
      } catch (err) {
        console.error("Error getting all products", err.message);
      }
    },
  },
});
