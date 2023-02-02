<template>
  <div class="container-fluid d-flex p-0 game-layout pt-200" id="village-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>Village</h4>
            <p>
              <b>The Village</b> is a peaceful place where you will shop, rest, train & communicate. It is here that you
              start your journey & return to recover.
            </p>
            <p>Explore and welcome home.</p>
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
        <div class="col-12">
          <nuxt-link class="btn btn-primary" to="/play/crossroads">Go to the Crossroads</nuxt-link>
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
  title: "The Village - Soakverse P2E",
});

const locations = [
  {
    title: "Public Square",
    link: "/play/village/public-square",
    image: "/images/p2e/thumbnails/public-square.webp",
  },
  {
    title: "Home",
    link: "/play/village/home",
    image: "/images/p2e/thumbnails/house.webp",
  },
  {
    title: "Shop",
    link: "/play/village/shop",
    image: "/images/p2e/thumbnails/shop.webp",
  },
  {
    title: "Athenaeum",
    link: "/play/village/athenaeum",
    image: "/images/p2e/thumbnails/athenaeum.webp",
  },
  {
    title: "Museum",
    link: "/play/village/museum",
    image: "/images/p2e/thumbnails/museum.webp",
  },
];
</script>

<style lang="scss">
#village-layout {
  background-image: url("/images/p2e/the-village.webp");
  background-size: cover;
  background-position: center center;
}
</style>
