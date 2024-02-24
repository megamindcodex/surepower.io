import { defineStore } from "pinia";
import axios from "axios";
import { endpoint } from "../constant/endpoint";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: {},
    loading: false,
  }),
  actions: {
    async getUserData(userId) {
      try {
        this.loading = true;
        const res = await axios.get(`${endpoint}/api/user/${userId}`);
        if (res.status === 200) {
          this.user = res.data;
          // console.log("User data Found:", this.user.value)
          this.loading = false;
        } else {
          console.log("user not found:");
        }
      } catch (err) {
        console.error("Error getting user data", err.message);
      }
    },
    async updateUser(updatedForm) {
      try {
        const userId = this.user._id;
        console.log("userId", userId);
        const res = await axios.put(
          `${endpoint}/api/updateUser/${userId}`,
          updatedForm
        );

        if (res.status === 200) {
          this.user = res.data;
          console.log(res.data);
        }
      } catch (err) {
        console.log("Eror updating user", err.message);
      }
    },
  },
});
