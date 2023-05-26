<template>
  <q-layout>

    <div class="fondo">

    <q-page-container>
      <router-view />
    </q-page-container>
    </div>

  </q-layout>
</template>

<style scoped>
.fondo {
  background-image: url("/src/assets/andrej-lisakov-3A4XZUopCJA-unsplash.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

