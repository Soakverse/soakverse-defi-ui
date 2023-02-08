<template>
  <div class="container-fluid d-flex p-0 game-layout" id="shop-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>
              Hidden Caravan
              <a
                href="https://docs.soakverse.io/soakverse/soakverse-world/the-soakverse-game-world/the-village/the-shop/the-hidden-caravan"
                target="_blank"
                class="btn btn-sm btn-primary"
                ><i class="fa fa-question-circle"></i
              ></a>
              <nuxt-link class="btn btn-sm btn-primary float-end" to="/play/village/shop"
                ><i class="fa-solid fa-circle-arrow-left"></i> Shop</nuxt-link
              >
            </h4>
            <p>
              But wait, there's more! Behind the store lies the mysterious Hidden Caravan, where you'll find some of the
              rarest and most unique items in the Soakverse world.
            </p>
          </div>
        </div>
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>Actions</h4>
            <div class="row">
              <div class="col-12">
                <p>The Hidden Caravan is not accessible yet. Come back later!</p>
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
  title: "The Hidden Caravan - Soakverse P2E",
});

const actions = [];
</script>

<style lang="scss">
#shop-layout {
  background-image: url("/images/p2e/hidden-caravan.webp");
  background-size: cover;
  background-position: center center;
}
</style>
