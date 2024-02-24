import { defineStore } from "pinia";
import { ref } from "vue";

export const useLocalStorageStore = defineStore("localStorageStore", {
  state: () => ({
    userId: null,
    isLoggedIn: false,
  }),
  actions: {
    getUserId() {
      const stringlocalUser = localStorage.getItem("userData");

      if (!stringlocalUser) {
        console.warn("userData not found in local storage");
        this.isLoggedIn = false;
        return;
      }

      const localUser = JSON.parse(stringlocalUser);
      if (localUser && localUser._id) {
        this.userId = localUser._id;
        this.isLoggedIn = true;
        // console.log(this.userId);
        // console.log(this.isLoggedIn)
      } else {
        console.log("Invalid or missing user data in local storage");
      }
    },
  },
});
