<template>
  <div class="container-fluid d-flex p-0 game-layout" id="museum-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>
              Museum
              <a
                href="https://docs.soakverse.io/soakverse/soakverse-world/the-soakverse-game-world/the-village/the-museum"
                target="_blank"
                class="btn btn-sm btn-primary"
                ><i class="fa fa-question-circle"></i
              ></a>
              <nuxt-link class="btn btn-sm btn-primary float-end" to="/play/village"
                ><i class="fa-solid fa-circle-arrow-left"></i> Village</nuxt-link
              >
            </h4>
            <p><b>The Museum</b> showcases the Soakverse’s Art & Collections.</p>
            <p>
              Not only have the OGs shaped the flow of history, but they’ve walked among many creative spirits &
              collected a variety of art & artefacts along the way.
            </p>
            <p>What secrets might the Museum hold?</p>
          </div>
        </div>
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>Actions</h4>
            <div class="row">
              <div class="col-12">
                <p>The Museum is not accessible yet. Come back later!</p>
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
  title: "The Museum - Soakverse P2E",
});

const actions = [];
</script>

<style lang="scss">
#museum-layout {
  background-image: url("/images/p2e/museum.webp");
  background-size: cover;
  background-position: center center;
}
</style>
