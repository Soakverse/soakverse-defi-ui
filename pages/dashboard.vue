<template>
  <div class="container-fluid d-flex">
    <div class="row m-auto full">
      <div class="col text-center">
        <h4 class="mb-2">Soakverse Ecosystem dashboard</h4>
        <div class="card mb-4">
          <SoakverseDashboard />
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>

<script setup>
import SoakverseDashboard from "../components/SoakverseDashboard.vue";
useHead({
  title: "Dashboard - Soakverse DeFI Platform",
});
</script>
