<template>
  <div class="d-flex h-100">
    <Siderbar-game-platform />
    <div id="main">
      <Header-game-platform />
      <div id="main-content-gp" class="py-0">
        <slot />
      </div>
      <PlaySound />
    </div>
  </div>
</template>

<script setup>
import PlaySound from "~~/components/UI/PlaySound.vue";
import Siderbar from "~~/components/UI/Siderbar.vue";
import Header from "~~/components/UI/Header.vue";
import HeaderGamePlatform from "~/components/UI/Header-game-platform.vue";
import SiderbarGamePlatform from "~/components/UI/Siderbar-game-platform.vue";
</script>
