<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <img src="" alt="" />
        <img src="" alt="" />
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
console.log(route.params);

useHead({
  title: 'Dashboard - Soakverse DeFI Platform',
});
definePageMeta({
  layout: 'game-platform',
});
</script>
