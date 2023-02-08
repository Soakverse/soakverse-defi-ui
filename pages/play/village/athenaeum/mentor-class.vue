<template>
  <div class="container-fluid d-flex p-0 game-layout" id="mentor-class-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>
              Mentor Class
              <a
                href="https://docs.soakverse.io/soakverse/soakverse-world/the-soakverse-game-world/the-village/the-athenaeum/mentoral-management"
                target="_blank"
                class="btn btn-sm btn-primary"
                ><i class="fa fa-question-circle"></i
              ></a>
              <nuxt-link class="btn btn-sm btn-primary float-end" to="/play/village/athenaeum"
                ><i class="fa-solid fa-circle-arrow-left"></i> Athenaeum</nuxt-link
              >
            </h4>
            <p>
              Connect with experienced players and learn from them, or share your own knowledge and experience with
              others.
            </p>
          </div>
        </div>
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>Actions</h4>
            <div class="row">
              <div class="col-12">
                <p>The Mentor Class is not accessible yet. Come back later!</p>
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
  title: "Mentor Class - Soakverse P2E",
});

const actions = [];
</script>

<style lang="scss">
#mentor-class-layout {
  background-image: url("/images/p2e/mentor-class.webp");
  background-size: cover;
  background-position: center center;
}
</style>
