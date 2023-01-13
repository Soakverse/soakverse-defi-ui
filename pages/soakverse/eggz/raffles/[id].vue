<template>
  <div class="container-fluid d-flex">
    <div class="row mx-auto full"></div>
  </div>
</template>

<script setup>
const router = useRouter();
const route = useRoute();
router.push({ path: `/soakverse/giveaways/${route.params.id}` });
useHead({
  title: "Soakverse Eggz Giveaway - Soakverse DeFI Platform",
});
</script>
