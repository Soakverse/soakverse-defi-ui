<template>
  <div class="container-fluid d-flex p-2 game-layout" id="pasture-layout">
    <div class="row w-100 mt-auto g-0">
      <div class="col-12 mb-2">
        <div class="card text-left h-100">
          <h4>The Pasture</h4>
          <p></p>
        </div>
      </div>
      <div class="col-12 mb-2">
        <div class="card text-left h-100">
          <h4>Actions</h4>
          <div class="row">
            <div class="col-12">
              <p>The Pasture is not accessible yet. Come back later!</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <nuxt-link class="btn btn-primary" to="/play/crossroads">Go to the Crossroads</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "p2e-layout",
});

useHead({
  title: "The Pasture - Soakverse P2E",
});

const actions = [];
</script>

<style lang="scss">
#pasture-layout {
  background-image: url("/images/p2e/pasture.webp");
  background-size: cover;
  background-position: center center;
}
</style>
