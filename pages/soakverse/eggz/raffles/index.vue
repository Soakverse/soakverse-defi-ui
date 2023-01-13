<template>
  <div class="container-fluid d-flex">
    <div class="row mx-auto full"></div>
  </div>
</template>

<script setup>
const router = useRouter();
router.push({ path: "/soakverse/giveaways" });
useHead({
  title: "Soakverse Eggz Giveaways - Soakverse DeFI Platform",
});
</script>
