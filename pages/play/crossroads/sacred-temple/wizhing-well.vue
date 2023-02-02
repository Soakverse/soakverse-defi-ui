<template>
  <div class="container-fluid d-flex p-0 game-layout" id="wizhing-well-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>The Wizhing Well</h4>
            <p><b>The Wizhing Well</b> is too simple a name, but it’s the name we use.</p>
            <p>
              To approach it is not just to dream, not just to be judged, but to step into your fate with an open heart,
              ready to be reborn.
            </p>
            <br />
            <p>Cast your Wizh. Receive your blessing.</p>
            <p>Prepare for what comes next.</p>
          </div>
        </div>
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>Actions</h4>
            <div class="row">
              <div class="col-12">
                <p>The Wizhing Well is not accessible yet. Come back later!</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <nuxt-link class="btn btn-primary" to="/play/crossroads/sacred-temple">Back to the Temple</nuxt-link>
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
  title: "The Wizhing Well - Soakverse P2E",
});

const actions = [];
</script>

<style lang="scss">
#wizhing-well-layout {
  background-image: url("/images/p2e/wizhing-well.webp");
  background-size: cover;
  background-position: center center;
}
</style>
