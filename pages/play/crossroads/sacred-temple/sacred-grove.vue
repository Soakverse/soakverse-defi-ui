<template>
  <div class="container-fluid d-flex p-0 game-layout" id="sacred-grove-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>
              The Sacred Grove
              <a
                href="https://docs.soakverse.io/soakverse/soakverse-world/the-soakverse-game-world/the-crossroads/the-sacred-temple/the-sacred-grove"
                target="_blank"
                class="btn btn-sm btn-primary"
                ><i class="fa fa-question-circle"></i
              ></a>
              <nuxt-link class="btn btn-sm btn-primary float-end" to="/play/crossroads/sacred-temple"
                ><i class="fa-solid fa-circle-arrow-left"></i> Sacred Temple</nuxt-link
              >
            </h4>
            <p><b>The Sacred Grove</b> is where <b>Treez</b> grow.</p>
            <p>This is more than it appears.</p>
            <p>And it is vital that we protect it against all threats.</p>
            <br />
            <p>
              Roots interlaced with each other. A magical organic network that weaves deep into the earth & draws the
              mystic waters up into its boughs, fruits, and the realm of us mortals.
            </p>
            <br />
            <p>
              The Soakverse OGs chose this place well. To bear the fruit that will <b>give us a chance to resist.</b>
            </p>
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
  title: "The Sacred Grove - Soakverse P2E",
});

const actions = [];
</script>

<style lang="scss">
#sacred-grove-layout {
  background-image: url("/images/p2e/sacred-grove.webp");
  background-size: cover;
  background-position: center center;
}
</style>
