<template>
  <div class="container-fluid d-flex">
    <div class="row m-auto full">
      <div class="col">
        <div class="card text-center pb-4">
          <h4 class="mb-2 mt-4">$SKMT Staking Platform</h4>
          <h5 class="mb-4">Coming in:</h5>
          <Countdown class="pb-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Countdown from "~~/components/UI/Countdown.vue";
definePageMeta({
  title: "Home - Soakmont DeFI",
});
</script>
