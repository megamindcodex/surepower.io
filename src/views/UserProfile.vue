<template >
  <!-- <h1 class="text-center">User Profil Page</h1> -->
  <div class="contd-flex flex-column align-center">
    <v-tabs color="primary" v-model="tabs" align-tabs="center">
      <v-tab :value="1">profile</v-tab>
      <v-tab :value="2"
        ><span class="material-symbols-outlined text-warning">
          edit_square
        </span></v-tab
      >
    </v-tabs>
    <div class="loading" v-if="userStore.loading">
      <v-progress-circular indeterminate color="#00796B" :size="200">
        Loading....
      </v-progress-circular>
    </div>

    <v-window v-model="tabs" class="mt-10">
      <v-window-item :value="1">
        <ProfileCard />
      </v-window-item>
      <v-window-item :value="2">
        <EditProfile />
      </v-window-item>
    </v-window>
  </div>
</template> 

<script setup>
import EditProfile from "../components/EditProfile.vue";
import ProfileCard from "../components/ProfileCard.vue";
import { ref } from "vue";
import { useLocalStorageStore } from "../store/localStorage";
import { useUserStore } from "../store/userStore";
const userStore = useUserStore();
const localStorageStore = useLocalStorageStore();

// userStore.getUserLocalData()
localStorageStore.getUserId();
userStore.getUserData(localStorageStore.userId);
const tabs = ref(null);
</script>

<style scoped>
/* .userCont {
  width: 100%;
  background: palevioletred;
} */
</style>
