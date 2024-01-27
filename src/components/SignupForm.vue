<template>
  <div class="cont" style="height: 100dvh">
    <v-sheet width="344" class="mx-auto d-flex flex-column ga-2 px-2">
      <span
        class="error text-red"
        style="white-space: pre-line; position: absolute"
        v-if="serverErr"
        >{{ formtServerErr }}</span
      >
      <v-form @submit.prevent="submit" class="mt-16 border pa-4">
        <v-text-field
          type="text"
          label="User name"
          v-model="formData.userName"
          @input="v$.userName.$touch"
          @blur="v$.userName.$touch"
          :error-messages="v$.userName.$errors.map((e) => e.$message)"
        ></v-text-field>
        <v-text-field
          type="email"
          label="Email"
          v-model="formData.email"
          @input="v$.email.$touch"
          @blur="v$.email.$touch"
          :error-messages="v$.email.$errors.map((e) => e.$message)"
          required
        ></v-text-field>
        <v-text-field
          type="password"
          label="password"
          v-model="formData.password"
          @input="v$.password.$touch"
          @blur="v$.password.$touch"
          :error-messages="v$.password.$errors.map((e) => e.$message)"
          required
        ></v-text-field>
        <div class="btn w-100 d-flex justify-center">
          <v-btn
            type="submit"
            :loading="loading"
            class="v-btn v-btn--block rounded-0 elevation-0 bg-success pa-5 mt-2 rounded"
            >Sign Up</v-btn
          >
        </div>
      </v-form>
      <span
        >already have an account?
        <RouterLink to="/login">Login</RouterLink></span
      >
    </v-sheet>
  </div>
</template>

<script setup>
import axios from "axios";
import router from "@/router";
import { ref, reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, alpha } from "@vuelidate/validators";
import { endpoint } from "../constant/endpoint";

// console.log(endpoint);

const loading = ref(false);
const formData = reactive({
  userName: "",
  email: "",
  password: "",
});

const rules = computed(() => ({
  userName: { required, alpha, minLength: minLength(4) },
  email: { required, email },
  password: { required, minLength: minLength(6) },
}));

const v$ = useVuelidate(rules, formData);

const submit = async () => {
  const formValid = await v$.value.$validate();
  // console.log(formValid);
  if (!formValid) return;

  registerUser();
};

const saveToLocalStorage = (res) => {
  const localUser = JSON.stringify(res.data);
  localStorage.setItem("userData", localUser);
};
const serverErr = ref();
const formtServerErr = computed(() => {
  return serverErr.value ? serverErr.value.join("\n") : "";
});

const registerUser = async () => {
  try {
    loading.value = true;
    serverErr.value = null;
    // console.log(`data to be sent ${JSON.stringify(formData)}`);
    const res = await axios.post(`${endpoint}/api/signup`, formData);

    if (res.status === 201) {
      saveToLocalStorage(res);
      router.push("/userProfile");
    }
  } catch (err) {
    console.error("Failed to register user", err.message);
    serverErr.value = err.response.data.errors;
    console.error(err.response.data.errors);
  } finally {
    loading.value = false;
  }
};
</script>

<style></style>
