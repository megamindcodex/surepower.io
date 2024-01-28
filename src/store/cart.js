import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { endpoint } from "@/constant/endpoint";

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    cartItems: ref([]),
  }),
  getters: {
    cartLength: (state) => state.cartItems.length,
  },
  actions: {
    async getCartItems(userId) {
      try {
        const res = await axios.get(`${endpoint}/api/getCartItems`, {
          params: { userId },
        });
        if (res.status === 200) {
          this.cartItems = res.data;
          console.log(this.cartItems);
        } else if (res.status === 204) {
          console.log("cart is empty", res.data);
        }
      } catch (err) {
        console.error("Failed to get user cart items:", err.message);
      }
    },
    async deleteCartItem(productId, userId) {
      try {
        const res = await axios.delete(`${endpoint}/api/deleteCartItemData`, {
          params: { productId, userId },
        });
        console.log(productId);
        if (res.status === 200) {
          // this.getCartItems(userId);
          // this.getTotalPrice(this.userId);
        }
      } catch (err) {
        console.error("Failed to delete cart item:", err.message);
      }
    },
  },
});
