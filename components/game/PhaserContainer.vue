<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import type { Game } from "phaser";

let gameInstance: Game | null = null;
const containerId = "game-container";
let game = null;

onMounted(async () => {
  game = await import("@/game/game");
  if (game) {
    gameInstance = await game.launch(containerId);
  }
});

onUnmounted(() => {
  gameInstance?.destroy(false);
});
</script>

<template>
  <div :id="containerId" />
</template>
