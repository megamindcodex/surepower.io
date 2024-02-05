<template>
  <v-container class="cont">
    <v-sheet
      elevation="12"
      max-width="600"
      rounded="lg"
      width="100%"
      class="pa-4 text-center mx-auto mt-10"
    >
      <span class="material-symbols-outlined"> check_circle </span>

      <h2 class="text-h5 mb-6">Payment Successfull</h2>

      <p class="mb-4 text-medium-emphasis text-body-2">
        an email has been sent to your email address to view your reciept for
        your recent purchase
        <a href="#" class="text-decoration-none text-info"
          >View reconciliation report.</a
        >

        <br />

        Otherwise, you're done!
      </p>

      <v-divider class="mb-4"></v-divider>

      <div class="text-end">
        <v-btn
          class="text-none"
          color="success"
          rounded
          variant="flat"
          width="90"
        >
          Done
        </v-btn>
      </div>
    </v-sheet>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
.cont {
  height: 60dvh;
}
</style>