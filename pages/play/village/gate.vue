<template>
  <div class="container-fluid d-flex p-2 game-layout" id="gate-layout">
    <div class="row w-100 mt-auto g-0">
      <div class="col-12 mb-2">
        <div class="card text-left h-100">
          <h4>The Gate</h4>
          <p>Adventure awaits!</p>
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
</template>

<script setup>
definePageMeta({
  layout: "p2e-layout",
});

useHead({
  title: "The Gate - Soakverse P2E",
});

const locations = [
  {
    title: "The Village",
    link: "/play/village",
    image: "/images/p2e/the-village.png",
  },
  {
    title: "Training Grounds",
    link: "/play/suburbium/training-grounds",
    image: "/images/p2e/training-grounds.png",
  },
  {
    title: "Pasture",
    link: "/play/suburbium/pasture",
    image: "/images/p2e/pasture.png",
  },
  {
    title: "Sacred Temple",
    link: "/play/suburbium/sacred-temple",
    image: "/images/p2e/temple.png",
  },
  {
    title: "World Map",
    link: "/play/world",
    image: "/images/p2e/world-map.png",
  },
];
</script>

<style lang="scss">
#gate-layout {
  background-image: url("/images/p2e/city-gate.png");
  background-size: cover;
  background-position: center center;
}
</style>
