<template>
  <div class="w-100">
    <v-card
      class="mx-auto pa-12 pb-8 mb-10"
      elevation="0"
      max-width="448"
      rounded="lg"
    >
      <v-text-field
        label="user name"
        type="text"
        density="compact"
        placeholder="Edit user name"
        variant="outlined"
        v-model="updatedForm.userName"
      ></v-text-field>

      <v-text-field
        label="Email"
        type="email"
        density="compact"
        placeholder="Edit email"
        variant="outlined"
        v-model="updatedForm.email"
      >
      </v-text-field>

      <v-text-field
        label="password"
        type="text"
        density="compact"
        placeholder="Edit password"
        variant="outlined"
        v-model="updatedForm.password"
      >
      </v-text-field>
    </v-card>
  </div>
  <AddressBookForm :updatedForm="updatedForm" />
</template>


<script setup>
import AddressBookForm from "./AddressBookForm.vue";
import { useUserStore } from "@/store/userStore";
import { reactive, ref } from "vue";

const userStore = useUserStore();
const updatedForm = reactive({
  userName: userStore.user.userName,
  email: userStore.user.email,
  password: userStore.user.password,
});

// console.log(updatedForm);
</script>