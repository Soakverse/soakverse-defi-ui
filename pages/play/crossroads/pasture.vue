<template>
  <div class="container-fluid d-flex p-0 game-layout pt-200" id="pasture-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>
              Pasture
              <a
                href="https://docs.soakverse.io/soakverse/soakverse-world/the-soakverse-game-world/the-crossroads/the-pasture"
                target="_new"
                class="btn btn-primary"
                ><i class="fa fa-question-circle"></i
              ></a>
              <nuxt-link class="btn btn-sm btn-primary float-end" to="/play/crossroads"
                ><i class="fa-solid fa-circle-arrow-left"></i> Crossroads</nuxt-link
              >
            </h4>
            <p>
              Put your companions out to pasture… and watch them slowly gain EXP. Or heck, don't watch them and they'll
              still gain EXP!
            </p>
            <p>We wonder what happens if you give one a Wizh? Maybe an XP boost?</p>
          </div>
        </div>
        <div class="col-12 mb-2">
          <div class="card text-center h-100">
            <EggzStaking />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import EggzStaking from "~~/components/Soakverse/Eggz/EggzStaking.vue";

definePageMeta({
  layout: "p2e-layout",
});

useHead({
  title: "The Pasture - Soakverse P2E",
});

const actions = [];
</script>

<style lang="scss">
#pasture-layout {
  background-image: url("/images/p2e/pasture.webp");
  background-size: cover;
  background-position: center center;
}
.green-text {
  color: white !important;
}
</style>
