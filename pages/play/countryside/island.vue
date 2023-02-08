<template>
  <div class="container-fluid d-flex p-0 game-layout" id="island-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>
              Island
              <a
                href="https://docs.soakverse.io/soakverse/soakverse-world/the-soakverse-game-world/the-countryside/the-island"
                target="_blank"
                class="btn btn-sm btn-primary"
                ><i class="fa fa-question-circle"></i
              ></a>
              <nuxt-link class="btn btn-sm btn-primary float-end" to="/play/countryside"
                ><i class="fa-solid fa-circle-arrow-left"></i> Countryside</nuxt-link
              >
            </h4>
            <p>Welcome to the… Island!</p>
            <p>We hope you're ready for a little R&R + <b>maybe a little.. Tournament PvP?</b></p>
            <p>Lemurs not included.</p>
          </div>
        </div>
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>Adventure</h4>
            <div class="row">
              <div class="col-12">
                <p>Your level is too low to access the Island! Come back later!</p>
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
  title: "The Island - Soakverse P2E",
});

const actions = [];
</script>

<style lang="scss">
#island-layout {
  background-image: url("/images/p2e/island.webp");
  background-size: cover;
  background-position: center center;
}
</style>
