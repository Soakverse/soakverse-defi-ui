<template>
  <div class="container-fluid d-flex p-0 game-layout" id="soakverse-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row m-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-center h-100">
            <div>
              <h4>Welcome to Soakverse!</h4>
              <p>
                <b>Do you have the courage, wisdom, and drive to protect the world from the dark forces assembling?</b>
              </p>
              <p>
                If you are ready to answer this call, <b>enter The Village</b>, where you’ll find the start of the
                answers you seek.
              </p>
              <nuxt-link to="/play/village" class="btn btn-primary">Enter Now!</nuxt-link>
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
  title: "The Soakverse - Soakverse P2E",
});
</script>

<style lang="scss">
#soakverse-layout {
  background-image: url("/images/p2e/soakverse-world.webp");
  background-size: cover;
  background-position: center center;
}
</style>
