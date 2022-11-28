<template>
  <div class="container-fluid d-flex">
    <div class="row m-auto full">
      <div class="col">
        <div class="card text-center mb-4">
          <h2>Blockchain Tools</h2>
          <BlockchainTools />
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>

<script setup>
import BlockchainTools from "../components/BlockchainTools/BlockchainTools.vue";
useHead({
  title: "Blockchain Tools - Soakverse DeFI Platform",
});
</script>
