<template>
  <div class="container-fluid d-flex">
    <div class="row m-auto full">
      <div class="col">
        <div class="card text-center mb-4">
          <h4>Socials</h4>
          <SocialCards />
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>

<script setup>
import SocialCards from "../components/About/SocialCards.vue";
useHead({
  title: "Home - Soakverse DeFI Platform",
});
</script>
