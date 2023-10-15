<template>
  <div class="container-fluid p-0 game-layout" id="soakverse-layout">
    <div>
      <p>Please enter your name</p>
      <input class="form-control" v-model="name" />
      <p>{{ playerStore.name }}</p>
    </div>
    <div
      class="container-fluid d-flex p-0 game-sublayout"
      id="phaser-game-holder"
    >
      <Suspense>
        <PhaserContainer />
        <template #fallback>
          <div class="placeholder">Downloading ...</div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import PhaserContainer from "@/components/game/PhaserContainer.vue";
import { usePlayerStore } from "@/stores/game/player";
import { storeToRefs } from "pinia";

const playerStore = usePlayerStore();

const { name } = storeToRefs(usePlayerStore());

definePageMeta({
  layout: "p2e-layout",
});

useHead({
  title: "Soakverse World - The Soakverse",
});
</script>

<style lang="scss">
#soakverse-layout {
  background-image: url("/images/p2e/soakverse-world.webp");
  background-size: cover;
  background-position: center center;
}
</style>
