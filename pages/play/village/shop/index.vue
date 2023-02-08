<template>
  <div class="container-fluid d-flex p-0 game-layout" id="shop-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>
              The Shop
              <a
                href="https://docs.soakverse.io/soakverse/soakverse-world/the-soakverse-game-world/the-village/the-shop"
                target="_blank"
                class="btn btn-sm btn-primary"
                ><i class="fa fa-question-circle"></i
              ></a>
              <nuxt-link class="btn btn-sm btn-primary float-end" to="/play/village"
                ><i class="fa-solid fa-circle-arrow-left"></i> Village</nuxt-link
              >
            </h4>
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
            <h4>Locations</h4>
            <div class="row">
              <nuxt-link
                v-for="location in locations"
                :key="location.name"
                class="col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 px-1 mb-2"
                :to="location.link"
              >
                <div class="card location-card h-100">
                  <img class="w-100" :src="location.image" />
                  <p>{{ location.title }}</p>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "p2e-layout",
});
const locations = [
  {
    title: "The Common Shop",
    link: "/play/village/shop/common-shop",
    image: "/images/p2e/thumbnails/common-shop.webp",
  },
  {
    title: "Hidden Caravan",
    link: "/play/village/shop/hidden-caravan",
    image: "/images/p2e/thumbnails/hidden-caravan.webp",
  },
];

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
