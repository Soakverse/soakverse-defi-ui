<template>
  <div class="row mt-5 sub-card">
    <div class="col-xl-8">
      <div class="row">
        <div
          class="col-12 col-sm-6 col-lg-4 col-xl-4 mb-4"
          v-for="(game, index) in games"
          :key="game.title"
          :class="{ 'not-first-card': index !== 0 }"
        >
          <GameCard :gameDefinition="game" />
        </div>
      </div>
    </div>
    <div class="col-xl-4">
      <h1>SEARCH</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import GameCard from './GameCard.vue';
import { gameSummaryDefinitions } from '@/utils/mocks/GamePlatform';

const games = gameSummaryDefinitions;
</script>
