<template>
  <div class="d-flex h-100">
    <Siderbar />
    <div id="main">
      <Header />
      <div id="main-content-p2e" class="py-0">
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
</script>
