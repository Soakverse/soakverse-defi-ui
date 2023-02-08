<template>
  <div class="container-fluid d-flex p-0 game-layout" id="public-square-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>
              Public Square
              <a
                href="https://docs.soakverse.io/soakverse/soakverse-world/the-soakverse-game-world/the-village/the-public-square"
                target="_blank"
                class="btn btn-sm btn-primary"
                ><i class="fa fa-question-circle"></i
              ></a>
              <nuxt-link class="btn btn-sm btn-primary float-end" to="/play/village"
                ><i class="fa-solid fa-circle-arrow-left"></i> Village</nuxt-link
              >
            </h4>
            <p>
              In the <b>Public Square</b> you’ll find an array of information, on a variety of subjects, ready to keep
              you updated with all the news you need!
            </p>
          </div>
        </div>
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>Actions</h4>
            <div class="row">
              <div class="col-12">
                <p>The Public Square is not accessible yet. Come back later!</p>
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
  title: "The Public Square - Soakverse P2E",
});

const actions = [];
</script>

<style lang="scss">
#public-square-layout {
  background-image: url("/images/p2e/public-square.webp");
  background-size: cover;
  background-position: center center;
}
</style>
