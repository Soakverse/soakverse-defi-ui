<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import type { Game } from 'phaser';

let gameInstance: Game | null = null;
const containerId = 'game-container';
let game = null;

onMounted(async () => {
  game = await import('@/game/game');
  if (game) {
    gameInstance = await game.launch(containerId);
    window.addEventListener('resize', resize);
    resize();
  }
});

onUnmounted(() => {
  gameInstance?.destroy(false);
  window.removeEventListener('resize', resize);
});

function resize() {
  const container = document.getElementById(containerId);
  if (gameInstance && container) {
    const canvas = gameInstance.canvas;
    let width = window.innerWidth; // Use the window width as initial value
    let height = window.innerHeight - 64; // Adjust height for the header
    let ratio = canvas.width / canvas.height; // Default ratio based on canvas size

    if (window.innerWidth > 1000) {
      // Cap width at 1000px for larger screens
      width = Math.min(container.offsetWidth, 1000);
    }

    // Apply fullscreen for mobile in landscape
    if (window.innerWidth <= 576) {
      console.log('LANDSCAPE');
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    } else {
      // For portrait and other scenarios, adjust size while maintaining aspect ratio
      const wratio = width / height;
      if (wratio < ratio) {
        canvas.style.width = `${width}px`;
        canvas.style.height = `${width / ratio}px`;
      } else {
        canvas.style.width = `${height * ratio}px`;
        canvas.style.height = `${height}px`;
      }
    }
  }
}
</script>

<template>
  <div :id="containerId" style="width: 100%; height: 100%; overflow: hidden" />
</template>
