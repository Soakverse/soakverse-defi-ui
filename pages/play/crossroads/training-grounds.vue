<template>
  <div class="container-fluid d-flex p-0 game-layout" id="training-grounds-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>
              Training Grounds
              <a
                href="https://docs.soakverse.io/soakverse/soakverse-world/the-soakverse-game-world/the-crossroads/the-training-grounds"
                target="_blank"
                class="btn btn-sm btn-primary"
                ><i class="fa fa-question-circle"></i
              ></a>
              <nuxt-link class="btn btn-sm btn-primary float-end" to="/play/crossroads"
                ><i class="fa-solid fa-circle-arrow-left"></i> Crossroads</nuxt-link
              >
            </h4>
            <p>
              Feeling stressed and want to let off a little steam? How about having your companions fight against your
              friends’ companions? Maybe a little training them up to be stronger? Faster? More skilled?
            </p>
            <p>Hone those cute critters through combat in the PVP Training Grounds!</p>
          </div>
        </div>
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>Actions</h4>
            <div class="row">
              <div class="col-12">
                <p>
                  The Training Ground is not accessible yet. Go to the Athenaeum to learn the basics of the Soakverse!
                </p>
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
  title: "The Training Grounds - Soakverse P2E",
});

const actions = [];
</script>

<style lang="scss">
#training-grounds-layout {
  background-image: url("/images/p2e/training-ground.webp");
  background-size: cover;
  background-position: center center;
}
</style>
