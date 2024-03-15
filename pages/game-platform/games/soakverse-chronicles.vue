<template>
  <div class="container-fluid d-flex contain-game p-0">
    <div class="row w-100 m-auto">
      <div class="col-12">
        <div class="mb-0 d-flex">
          <h1 class="text-white mx-auto">Soakverse Chronicles</h1>
        </div>
        <div class="container-fluid d-flex p-0 h-100" id="phaser-game-holder">
          <Suspense>
            <PhaserContainer />
            <template #fallback>
              <div class="placeholder">Downloading ...</div>
            </template>
          </Suspense>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PhaserContainer from '@/components/game/PhaserContainer.vue';
import { usePlayerStore } from '@/stores/game/player';
import { storeToRefs } from 'pinia';

const playerStore = usePlayerStore();

const { name } = storeToRefs(usePlayerStore());

definePageMeta({
  layout: 'game-platform',
});

useHead({
  title: 'Soakverse World - The Soakverse',
});
</script>

<style lang="scss">
.contain-game {
  position: relative;

  h1 {
    font-weight: bold;
  }

  #phaser-game-holder {
    max-width: 1000px;
    canvas {
      border-radius: 10px;
      border: 2px solid #455d62;
      box-shadow: 2px 2px 30px 2px rgb(0, 0, 0);
    }
  }
}
</style>
