<template>
  <div class="container-fluid d-flex p-0 game-layout" id="house-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>Your House</h4>
            <p><b>Your House</b> is where you rest & store your precious items</p>
            <p>This is also where you change your outfits. (No peeking)</p>
          </div>
        </div>
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>Actions</h4>
            <div class="row">
              <div class="col-12">
                <p>Your House is not accessible yet. Come back later!</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <nuxt-link class="btn btn-primary" to="/play/village">Back to the Village</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "p2e-layout",
});

useHead({
  title: "Your House - Soakverse P2E",
});

const actions = [];
</script>

<style lang="scss">
#house-layout {
  background-image: url("/images/p2e/house.webp");
  background-size: cover;
  background-position: center center;
}
</style>
