<template>
  <div
    class="card h-100 card-game-platform px-0 py-0"
    :class="gameDefinition.comingSoon ? 'coming-soon' : ''"
  >
    <img
      class="card-img-top"
      :src="gameDefinition.image"
      alt="Card image cap"
    />
    <div class="card-body d-flex flex-column">
      <span>
        <p
          v-for="(category, index) in gameDefinition.categories"
          class="cat-p me-1"
        >
          {{ category }}
        </p></span
      >
      <h5 class="card-title fw-bold text-white">{{ gameDefinition.title }}</h5>
      <p class="card-text text-grey small-text">
        {{ gameDefinition.summary }}
      </p>
      <div class="row align-items-end mt-auto">
        <div class="col-6">
          <NuxtLink
            class="btn"
            :to="`/game-platform/games/play/${gameDefinition.gameIdentifier}`"
            >Play</NuxtLink
          >
        </div>
        <div class="col-6">
          <NuxtLink
            class="btn"
            :to="`/game-platform/games/details/${gameDefinition.gameIdentifier}`"
            >Details</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameSummaryDefinition } from '@/types/game-platform/game/GameTypes';

const props = defineProps<{
  gameDefinition: GameSummaryDefinition;
}>();
</script>

<style>
.coming-soon::before {
  content: 'Coming soon';
  position: absolute;
  font-size: 22px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(80px);
  color: #fff;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
