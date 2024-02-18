<template>
  <div
    class="container-fluid d-flex p-0 game-layout pt-200"
    id="dao-dashboard-layout"
  >
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-center mb-4">
            <h3>DAO Dashboard</h3>
            <div class="row mx-auto w-100">
              <nuxt-link
                v-for="location in locations"
                :key="location.name"
                class="col-12 col-sm-6 col-md-4 mb-2 mx-auto"
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
  title: "Soakverse DAO Dashboard - Soakverse DeFI Platform",
});

const locations = [
  {
    title: "Staking",
    link: "/dao/staking",
    image: "/images/dao-staking.webp",
  },
  {
    title: "Migration",
    link: "/dao/migration",
    image: "/images/dao-migration.webp",
  },
];
</script>

<style lang="scss">
#dao-dashboard-layout {
  background-image: url("/images/soakverse-dao.webp");
  background-size: cover;
  background-position: center center;
}
.green-text {
  color: white !important;
}
</style>
