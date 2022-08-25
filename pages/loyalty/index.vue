<template>
  <div class="container-fluid d-flex">
    <div class="row m-auto full">
      <div class="col-12">
        <div class="card text-center mb-4">
          <LoyaltyInformation />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LoyaltyInformation from "~~/components/Loyalty/LoyaltyInformation.vue";
useHead({
  title: "Loyalty Program - Soakmont DeFI Platform",
});
</script>
