<template>
  <div class="container-fluid d-flex p-0 game-layout" id="shop-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>The Shop</h4>
            <p><b>The Shop</b> is where you buy items. (Surprise!)</p>
            <p>There are 2 sections:</p>
            <p><b>The Common Shop</b>, where you can buy an unlimited amount of Basic Items.</p>
            <p>
              <b>The Hidden Caravan</b> behind the store, where you have a chance to buy both Random Rare & Scheduled
              Rare Limited items.
            </p>
            <p>
              Only a set number of these items are available (to all players in-game) and once they’re gone, they’re
              gone!
            </p>
          </div>
        </div>
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>Actions</h4>
            <div class="row">
              <div class="col-12">
                <p>The Shop is not accessible yet. Come back later!</p>
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
  title: "The Shop - Soakverse P2E",
});

const actions = [];
</script>

<style lang="scss">
#shop-layout {
  background-image: url("/images/p2e/shop.webp");
  background-size: cover;
  background-position: center center;
}
</style>
