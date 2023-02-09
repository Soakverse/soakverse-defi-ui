<template>
  <div class="container-fluid d-flex p-0 game-layout" id="forest-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>
              Forest
              <a
                href="https://docs.soakverse.io/soakverse/soakverse-world/the-soakverse-game-world/the-countryside/the-forest"
                target="_blank"
                class="btn btn-sm btn-primary"
                ><i class="fa fa-question-circle"></i
              ></a>
              <nuxt-link class="btn btn-sm btn-primary float-end" to="/play/countryside"
                ><i class="fa-solid fa-circle-arrow-left"></i> Countryside</nuxt-link
              >
            </h4>
            <p>You survived The Fields? Don’t get so cocky.</p>
            <p>
              We hope you have a Level 1 Scroll handy… you'll need them to start <b>Quests</b> (But you don't need them
              for the more difficult Expeditions here)
            </p>
            <p>Like they say… <b>moar harder moar rewarding.</b></p>
          </div>
        </div>
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>Adventure</h4>
            <div class="row">
              <div class="col-12">
                <p>You need to reach level 10 to access the Forest! Go to the Fields instead!</p>
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
  title: "The Forest - Soakverse P2E",
});

const actions = [];
</script>

<style lang="scss">
#forest-layout {
  background-image: url("/images/p2e/forest.webp");
  background-size: cover;
  background-position: center center;
}
</style>
