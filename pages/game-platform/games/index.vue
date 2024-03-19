<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="row text-center text-lg-start mx-auto mt-4">
          <div class="col-12 col-md-10 offset-md-1">
            <h2 class="text-white">ALL <span class="fw-bold">GAMES</span></h2>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <GamesListCards />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Dashboard - Soakverse DeFI Platform',
});
definePageMeta({
  layout: 'game-platform',
});
</script>

<script>
import GamesListCards from '@/components/GamePlatform/GamesListCards.vue';
</script>

<style>
input {
  background-color: #143138;
  color: #586e72;
  width: 100%;
  border-radius: 6px;
  border: none;
  height: 40px;
  font-size: 14px;
}

.search-label {
  position: relative;
  display: flex;
  align-items: center;
}

.search-label svg {
  position: absolute;
  left: 20px;
}

.search-label input {
  padding-left: 35px;
}
</style>
