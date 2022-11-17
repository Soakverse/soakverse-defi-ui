<template>
  <div class="container-fluid d-flex">
    <div class="row mx-auto full">
      <div class="col-12">
        <nuxt-link to="/soakverse/eggz/raffles" class="btn btn-primary mb-2"> Back </nuxt-link>
        <div class="text-center mb-4">
          <EggzRaffle :raffleId="$route.params.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import EggzRaffle from "~~/components/Soakverse/Eggz/EggzRaffle.vue";
useHead({
  title: "Soakverse Eggz Raffle - Soakmont DeFI Platform",
});
</script>
