<template>
  <div class="container-fluid d-flex p-0 game-layout pt-200" id="crossroads-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>
              Crossroads
              <a
                href="https://docs.soakverse.io/soakverse/soakverse-world/the-soakverse-game-world/the-crossroads"
                target="_blank"
                class="btn btn-sm btn-primary"
                ><i class="fa fa-question-circle"></i
              ></a>
            </h4>
            <p>Life takes a few turns at <b>The Crossroads!</b></p>
            <p>
              <b>Spirituality, Training,</b> or even put your Eggz out to <b>Pasture!</b> (Where they’ll keep training!)
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

useHead({
  title: "The Crossroads - Soakverse P2E",
});

const locations = [
  {
    title: "Village",
    link: "/play/village",
    image: "/images/p2e/thumbnails/the-village.webp",
  },
  {
    title: "Training Grounds",
    link: "/play/crossroads/training-grounds",
    image: "/images/p2e/thumbnails/training-ground.webp",
  },
  {
    title: "Pasture",
    link: "/play/crossroads/pasture",
    image: "/images/p2e/thumbnails/pasture.webp",
  },
  {
    title: "Sacred Temple",
    link: "/play/crossroads/sacred-temple",
    image: "/images/p2e/thumbnails/temple.webp",
  },
  {
    title: "Countryside",
    link: "/play/countryside",
    image: "/images/p2e/thumbnails/world-map.webp",
  },
];
</script>

<style lang="scss">
#crossroads-layout {
  background-image: url("/images/p2e/crossroads.webp");
  background-size: cover;
  background-position: center center;
}
</style>
