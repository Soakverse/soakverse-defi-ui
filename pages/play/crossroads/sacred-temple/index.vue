<template>
  <div class="container-fluid d-flex p-0 game-layout" id="temple-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>
              The Sacred Temple
              <a
                href="https://docs.soakverse.io/soakverse/soakverse-world/the-soakverse-game-world/the-crossroads/the-sacred-temple"
                target="_blank"
                class="btn btn-sm btn-primary"
                ><i class="fa fa-question-circle"></i
              ></a>
              <nuxt-link class="btn btn-sm btn-primary float-end" to="/play/crossroads"
                ><i class="fa-solid fa-circle-arrow-left"></i> Crossroads</nuxt-link
              >
            </h4>
            <p>
              <b>The Sacred Temple</b> is so much more than it seems & it has taken on many forms over the millenia…
            </p>
            <p>Before there was a Village, it was.</p>
            <p>Before there was a Wizhing Well, it was.</p>
            <p>Before there was a Sacred Grove, it was.</p>
            <p>The Sacred Temple shows scars of ancient conflict.</p>
            <p>Images of Angels & Demons appear locked in battle.</p>
            <p>And the closer you draw near the more you want to run into it & away from it.</p>
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
  title: "The Sacred Temple - Soakverse P2E",
});

const locations = [
  {
    title: "The Wizhing Well",
    link: "/play/crossroads/sacred-temple/wizhing-well",
    image: "/images/p2e/thumbnails/wizhing-well.webp",
  },
  {
    title: "The Sacred Grove",
    link: "/play/crossroads/sacred-temple/sacred-grove",
    image: "/images/p2e/thumbnails/sacred-grove.webp",
  },
];
</script>

<style lang="scss">
#temple-layout {
  background-image: url("/images/p2e/temple.webp");
  background-size: cover;
  background-position: center center;
}
</style>
