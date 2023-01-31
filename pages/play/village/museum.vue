<template>
  <div class="container-fluid d-flex p-2 game-layout" id="museum-layout">
    <div class="row w-100 mt-auto g-0">
      <div class="col-12 mb-2">
        <div class="card text-left h-100">
          <h4>The Museum</h4>
          <p><b>The Museum</b> showcases the Soakverse’s Collection.</p>
          <p>
            Not only have the OGs shaped the flow of history, but they’ve walked among many creative spirits & collected
            a variety of art & artefacts along the way.
          </p>
          <p>What secrets might the Museum hold?</p>
        </div>
      </div>
      <div class="col-12 mb-2">
        <div class="card text-left h-100">
          <h4>Actions</h4>
          <div class="row">
            <div class="col-12">
              <p>The Museum is not accessible yet. Come back later!</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <nuxt-link class="btn btn-primary" to="/play/village">Back to the Village</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "p2e-layout",
});

useHead({
  title: "The Museum - Soakverse P2E",
});

const actions = [];
</script>

<style lang="scss">
#museum-layout {
  background-image: url("/images/p2e/museum.webp");
  background-size: cover;
  background-position: center center;
}
</style>
