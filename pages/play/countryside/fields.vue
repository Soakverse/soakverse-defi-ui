<template>
  <div class="container-fluid d-flex p-0 game-layout" id="fields-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>The Fields</h4>
            <p><b>Welcome to The Fields Rookie.</b></p>
            <p>Here you find <b>Entry Level Quests</b> that don't even require a scroll!</p>
            <p>You've got this!</p>
          </div>
        </div>
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>Adventure</h4>
            <div class="row">
              <div class="col-12">
                <p>You need to reach level 5 to access the Fields! Start by the Athenaeum & Training Grounds!</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <nuxt-link class="btn btn-primary" to="/play/countryside">Go to the Countryside</nuxt-link>
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
  title: "The Fields - Soakverse P2E",
});

const actions = [];
</script>

<style lang="scss">
#fields-layout {
  background-image: url("/images/p2e/fields.webp");
  background-size: cover;
  background-position: center center;
}
</style>
