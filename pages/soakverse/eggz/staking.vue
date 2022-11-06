<template>
  <div class="container-fluid d-flex">
    <div class="row m-auto full">
      <div class="col-12">
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
  title: "Soakverse Eggz Staking - Soakmont DeFI Platform",
});
</script>
