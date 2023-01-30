<template>
  <div class="container-fluid d-flex h-100 p-5 game-layout" id="public-square-layout">
    <div class="row w-100 mt-auto">
      <div class="col-12 mb-2">
        <div class="card text-left h-100">
          <h4>Public Square</h4>
          <p>All the action is happening in the public square.</p>
        </div>
      </div>
      <div class="col-12 mb-2">
        <div class="card text-left h-100">
          <h4>Locations</h4>
          <div class="row">
            <nuxt-link class="col-4 card location-card" to="/play/village/public-square">
              <img class="w-100" src="~/assets/img/p2e/public-square.png" />
              <p>Public Square</p>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="col-12">
        <nuxt-link class="btn btn-primary" to="/play/village">Back to village</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "p2e-layout",
});

const backLink = "/play/village";

useHead({
  title: "The Public Square - Soakverse P2E",
});
</script>

<style lang="scss">
#public-square-layout {
  background-image: url("~/assets/img/p2e/public-square.png");
  background-size: cover;
  background-position: center center;
}
</style>
