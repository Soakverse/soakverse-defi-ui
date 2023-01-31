<template>
  <div class="container-fluid d-flex p-2 game-layout" id="mountain-layout">
    <div class="row w-100 mt-auto g-0">
      <div class="col-12 mb-2">
        <div class="card text-left h-100">
          <h4>The Mountain</h4>
          <p>You’ve made it!</p>
          <p>To the base of the mountain.</p>
          <p>Now the real adventures begin as you take it to another level</p>
          <p>and grind onwards to glory!</p>
        </div>
      </div>
      <div class="col-12 mb-2">
        <div class="card text-left h-100">
          <h4>Quests</h4>
          <div class="row">
            <div class="col-12">
              <p>The Mountain is not accessible yet. Come back later!</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <nuxt-link class="btn btn-primary" to="/play/countryside">Go to the Countryside</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "p2e-layout",
});

useHead({
  title: "The Mountain - Soakverse P2E",
});

const actions = [];
</script>

<style lang="scss">
#mountain-layout {
  background-image: url("/images/p2e/mountain.webp");
  background-size: cover;
  background-position: center center;
}
</style>
