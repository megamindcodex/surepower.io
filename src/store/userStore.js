import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user:ref({}),
    loading: false,
  }),
  actions: {
    async getUserData(userId) { 
        try { 
          this.loading = true
            const res = await axios.get(`http://localhost:5000/api/user/${userId}`)
            if(res.status === 200) {
                this.user = res.data 
                // console.log("User data Found:", this.user.value)
                this.loading = false
            }else {
                console.log("user not found:")
            }
        }catch(err) {
            console.error("Error getting user data", err.message)
        }
    
    }, 
  },
});
