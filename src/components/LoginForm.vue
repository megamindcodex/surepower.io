<template>
  <div class="cont" style="height: 100dvh">
    <v-sheet
      width="344"
      class="mx-auto d-flex justify-center flex-column ga-2 px-2"
    >
      <span class="error text-red mt-5" v-if="serverErr">{{
        formatServerErr
      }}</span>
      <v-form @submit.prevent="submit" class="mt-16 ma border pa-4">
        <v-text-field
          label="email"
          v-model="formData.email"
          @input="v$.email.$touch"
          @blur="v$.email.$touch"
          :error-messages="v$.email.$errors.map((e) => e.$message)"
          required
        ></v-text-field>

        <v-text-field
          type="password"
          label="Password"
          v-model="formData.password"
          @input="v$.password.$touch"
          @blur="v$.password.$touch"
          :error-messages="v$.password.$errors.map((e) => e.$message)"
          required
        ></v-text-field>

        <div class="text-right">
          <RouterLink to="/forgotPassword">forgot password?</RouterLink>
        </div>

        <div class="btn w-100 d-flex justify-center">
          <v-btn
            type="submit"
            :loading="loading"
            class="v-btn v-btn--block rounded-0 elevation-0 bg-success pa-5 mt-2 rounded"
            >Login</v-btn
          >
        </div>
      </v-form>
      <span>
        don't have an account?
        <RouterLink to="/signup">Signup</RouterLink>
      </span>
    </v-sheet>
  </div>
</template>



<script setup>
import router from "@/router";
import axios from "axios";
import { ref, reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { endpoint } from "../constant/endpoint";

const formData = reactive({
  email: "",
  password: "",
});

const rules = computed(() => ({
  email: {
    required,
    email,
  },
  password: {
    required,
    minLength: minLength(6),
  },
}));

const v$ = useVuelidate(rules, formData);
// console.log($v.$validate);
const submit = async () => {
  // Validate the form
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;

  // If form is valid, proceed with login
  loginUser();
};

const loading = ref(false);

const saveToLocalStorage = (res) => {
  const localUser = JSON.stringify(res.data);
  localStorage.setItem("userData", localUser);
};

const serverErr = ref();
const formatServerErr = computed(() => {
  return serverErr.value.toString();
});
const loginUser = async () => {
  console.log(formData);
  try {
    loading.value = true;
    const res = await axios.post(`${endpoint}/api/loginUser`, formData);
    if (res.status === 200) {
      loading.value = false;
      saveToLocalStorage(res);
      router.replace("/userProfile");
    }
  } catch (err) {
    console.error("Error login in user:", err.message);
    serverErr.value = err.response.data.errors;
    console.log(err.response.data.errors);
  } finally {
    loading.value = false;
  }
};
</script>

<style>
.error {
  position: absolute;
  top: 7.8rem;
}
</style>
