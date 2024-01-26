<template >
  <!-- <h1 class="text-center">User Profil Page</h1> -->
  <div
    class="cont mx-auto d-flex flex-column align-center ga-3 mt-16"
    style="height: 100dvh"
  >
    <div class="loading" v-if="userStore.loading">
      <v-progress-circular indeterminate color="#00796B" :size="200">
        Loading....
      </v-progress-circular>
    </div>
    <div
      class="userCont text-center d-flex flex-column ga-2"
      v-if="userStore.user"
    >
      <p>{{ userStore.user.userName }}</p>
      <p class="text-grey">{{ userStore.user.email }}</p>
    </div>
    <div class="del" v-if="userStore.user">
      <v-btn @click="deleteUserLocalData" class="v-btn">logout</v-btn>
    </div>
    <div v-if="!localStorageStore.userId">
      <LoginForm />
    </div>
  </div>
</template> 

<script setup>
import LoginForm from "@/components/LoginForm.vue";
import { onMounted } from "vue";
import { useLocalStorageStore } from "../store/localStorage";
import { useUserStore } from "../store/userStore";
import router from "@/router";
const userStore = useUserStore();
const localStorageStore = useLocalStorageStore();

// userStore.getUserLocalData()
localStorageStore.getUserId();
userStore.getUserData(localStorageStore.userId);

const checkIsLoggedIn = () => {
  if (!localStorageStore.userId) {
    router.replace("/login");
  } else {
    localStorageStore.isLoggedIn = true;
  }
};

onMounted(() => {
  checkIsLoggedIn();
});

const deleteUserLocalData = () => {
  localStorage.removeItem("userData");
  localStorageStore.isLoggedIn = false;
  router.replace("/login");
};

// console.log(userStore.user)
</script>

<style></style>
