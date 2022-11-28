<template>
  <div class="container-fluid d-flex">
    <div class="row mx-auto full">
      <div class="col-12">
        <nuxt-link to="/soakverse" class="btn btn-primary mb-2"> Back </nuxt-link>
        <div class="text-center mb-4">
          <Backpack />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Backpack from "~~/components/Soakverse/Backpack.vue";
useHead({
  title: "Soakverse Backpack - Soakverse DeFI Platform",
});
</script>
