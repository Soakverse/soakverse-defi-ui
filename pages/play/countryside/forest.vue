<template>
  <div class="container-fluid d-flex p-2 game-layout" id="forest-layout">
    <div class="row w-100 mt-auto g-0">
      <div class="col-12 mb-2">
        <div class="card text-left h-100">
          <h4>The Forest</h4>
          <p>You survived The Fields? Don’t get so cocky.</p>
          <p>We hope you have a Level 1 Scroll handy…</p>
          <p>But like they say… <b>moar harder moar rewarding.</b></p>
        </div>
      </div>
      <div class="col-12 mb-2">
        <div class="card text-left h-100">
          <h4>Quests</h4>
          <div class="row">
            <div class="col-12">
              <p>The Forest is not accessible yet. Come back later!</p>
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
  title: "The Forest - Soakverse P2E",
});

const actions = [];
</script>

<style lang="scss">
#forest-layout {
  background-image: url("/images/p2e/forest.webp");
  background-size: cover;
  background-position: center center;
}
</style>
