<template>
  <div class="container-fluid d-flex p-0 game-layout" id="countryside-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>The Countryside</h4>
            <p>
              Head on out into the big wide world! Or at least the part that’s been revealed so far. Adventures beckon.
            </p>
            <p>
              Grow stronger from Field to Forest to Mountain and Party (+ the occasional Epic Tournament PVP!) at the
              Island!
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
  title: "The Countryside - Soakverse P2E",
});

const locations = [
  {
    title: "The Fields",
    link: "/play/countryside/fields",
    image: "/images/p2e/thumbnails/fields.webp",
  },
  {
    title: "The Forest",
    link: "/play/countryside/forest",
    image: "/images/p2e/thumbnails/forest.webp",
  },
  {
    title: "The Mountain",
    link: "/play/countryside/mountain",
    image: "/images/p2e/thumbnails/mountain.webp",
  },
  {
    title: "The Island",
    link: "/play/countryside/island",
    image: "/images/p2e/thumbnails/island.webp",
  },
];
</script>

<style lang="scss">
#countryside-layout {
  background-image: url("/images/p2e/world-map.webp");
  background-size: cover;
  background-position: center center;
}
</style>
