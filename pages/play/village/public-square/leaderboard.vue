<template>
  <div class="container-fluid d-flex p-0 game-layout" id="leaderboard-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>
              Leaderboard
              <a
                href="https://docs.soakverse.io/soakverse/soakverse-world/soakverse-game-world/the-village/the-public-square"
                target="_blank"
                class="btn btn-sm btn-primary"
                ><i class="fa fa-question-circle"></i
              ></a>
              <nuxt-link class="btn btn-sm btn-primary float-end" to="/play/village/public-square"
                ><i class="fa-solid fa-circle-arrow-left"></i> Public Square</nuxt-link
              >
            </h4>
            <p>
              The Leader Board displays the top Resiztance Champions & Trainees in Soakverse, ranked by their
              achievements and performance.
            </p>
          </div>
        </div>
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <div class="row">
              <div class="col-12">
                <p>The Leaderboard is not accessible yet. Come back later!</p>
              </div>
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
  title: "Leaderboard - Soakverse P2E",
});

const actions = [];
</script>

<style lang="scss">
#leaderboard-layout {
  background-image: url("/images/p2e/leaderboard.webp");
  background-size: cover;
  background-position: center center;
}
</style>
