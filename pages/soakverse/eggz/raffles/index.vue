<template>
  <div class="container-fluid d-flex">
    <div class="row mx-auto full">
      <div class="col-12">
        <nuxt-link to="/soakverse/eggz/staking" class="btn btn-primary mb-2"> Eggz Staking </nuxt-link>
        <div class="text-center mb-4">
          <EggzRaffles />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import EggzRaffles from "~~/components/Soakverse/Eggz/EggzRaffles.vue";
useHead({
  title: "Soakverse Eggz Raffles - Soakverse DeFI Platform",
});
</script>
