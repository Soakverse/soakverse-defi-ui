<template>
  <div class="container-fluid d-flex p-2 game-layout" id="village-layout">
    <div class="row w-100 mt-auto g-0">
      <div class="col-12 mb-2">
        <div class="card text-left h-100">
          <h4>Village</h4>
          <p>
            The village is peaceful and where the people can shop, rest, train & communicate. This is also a place where
            a lot of tales & legends are shared.
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
        <nuxt-link class="btn btn-primary" to="/play/village/gate">Back to gate</nuxt-link>
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
    image: "/images/p2e/public-square.png",
  },
  {
    title: "Home",
    link: "/play/village/home",
    image: "/images/p2e/house.png",
  },
  {
    title: "Athenaeum",
    link: "/play/village/athenaeum",
    image: "/images/p2e/athenaeum.png",
  },
  {
    title: "Museum",
    link: "/play/village/museum",
    image: "/images/p2e/museum.png",
  },
];
</script>

<style lang="scss">
#village-layout {
  background-image: url("/images/p2e/the-village.png");
  background-size: cover;
  background-position: center center;
}
</style>
