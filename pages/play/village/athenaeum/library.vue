<template>
  <div class="container-fluid d-flex p-0 game-layout" id="library-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>
              Library
              <a
                href="https://docs.soakverse.io/soakverse/soakverse-world/the-soakverse-game-world/the-village/the-athenaeum/the-library"
                target="_blank"
                class="btn btn-sm btn-primary"
                ><i class="fa fa-question-circle"></i
              ></a>
              <nuxt-link class="btn btn-sm btn-primary float-end" to="/play/village/athenaeum"
                ><i class="fa-solid fa-circle-arrow-left"></i> Athenaeum</nuxt-link
              >
            </h4>
            <p>
              Here, you'll find a wealth of information, resources, and guidance to help you understand the intricacies
              of this world.
            </p>
          </div>
        </div>
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>Actions</h4>
            <div class="row">
              <div class="col-12">
                <p>The Library is not accessible yet. Come back later!</p>
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
  title: "The Library - Soakverse P2E",
});

const actions = [];
</script>

<style lang="scss">
#library-layout {
  background-image: url("/images/p2e/library.webp");
  background-size: cover;
  background-position: center center;
}
</style>
