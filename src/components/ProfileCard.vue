<template>
  <div class="cont">
    <v-sheet v-if="userStore.user" class="userCont py-2">
      <div class="user-info px-3 py-2">
        <div class="avatar"></div>
        <h3 class="mx-auto">Account</h3>
        <span class="pa-0">
          userId:
          {{ userStore.user._id }}
        </span>
        <span class="pa-0">
          user name:
          {{ userStore.user.userName }}
        </span>
        <span class="pa-0">
          email:
          {{ userStore.user.email }}
        </span>
        <span class="text-grey pa-0">
          <span class="text-black"> password: </span>
          {{ userStore.user.password }}
        </span>
      </div>

      <div class="address-book px-2 py-2" v-if="userStore.user.addressBook">
        <h3 class="mx-auto">Address Book</h3>
        <span>First name: {{ userStore.user.addressBook.firstName }}</span>
        <span>Last name: {{ userStore.user.addressBook.LastName }}</span>
        <span>Phone: {{ userStore.user.addressBook.phoneNumber }}</span>
        <span>Country code: {{ userStore.user.addressBook.prefix }}</span>
        <span>Country: {{ userStore.user.addressBook.country }}</span>
        <span>State: {{ userStore.user.addressBook.state }}</span>
        <span>City: {{ userStore.user.addressBook.city }}</span>
        <span
          >Delivery address:
          {{ userStore.user.addressBook.deliveryAddress }}</span
        >
        <span
          >Additional info:
          {{ userStore.user.addressBook.additionalInfo }}</span
        >
      </div>

      <div class="btn">
        <button @click="deleteUserLocalData" class="v-btn">logout</button>
      </div>
    </v-sheet>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useLocalStorageStore } from "../store/localStorage";
import { useUserStore } from "../store/userStore";
import router from "@/router";
const userStore = useUserStore();
const localStorageStore = useLocalStorageStore();

// userStore.getUserLocalData()
localStorageStore.getUserId();
userStore.getUserData(localStorageStore.userId);
const tabs = ref(null);

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

<style scoped>
.cont {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.userCont {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  background: transparent;
  /* align-items: center; */
}

.user-info {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
  background-color: #ffff;
}
.address-book {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
  background-color: #ffff;
}

.btn {
  display: flex;
  justify-content: right;
  width: 100%;
}
.v-btn {
  border-radius: 0;
  border: 1px solid red;
  padding: 0.7rem;
  color: red;
  width: 50%;
}

.v-btn:hover {
  background-color: rgb(248, 162, 162);
  border: 1px solid rgb(248, 162, 162);
  color: #fff;
  transition: 0.3s;
}
</style>