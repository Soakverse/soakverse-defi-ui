<template>
  <div class="container-fluid d-flex">
    <div class="row m-auto full">
      <div class="col-12">
        <nuxt-link to="/soakverse/eggz/raffles" class="btn btn-primary mb-2"> Eggz Giveaways </nuxt-link>
        <div class="card text-center mb-4">
          <EggzStaking />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import EggzStaking from "~~/components/Soakverse/Eggz/EggzStaking.vue";
useHead({
  title: "Soakverse Eggz Staking - Soakverse DeFI Platform",
});
</script>
