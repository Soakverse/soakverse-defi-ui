<template>
  <div class="container-fluid d-flex p-0 game-layout" id="shop-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>
              The Common Shop
              <a
                href="https://docs.soakverse.io/soakverse/soakverse-world/the-soakverse-game-world/the-village/the-shop/the-common-shop"
                target="_blank"
                class="btn btn-sm btn-primary"
                ><i class="fa fa-question-circle"></i
              ></a>
              <nuxt-link class="btn btn-sm btn-primary float-end" to="/play/village/shop"
                ><i class="fa-solid fa-circle-arrow-left"></i> Shop</nuxt-link
              >
            </h4>
            <p>The Common Shop is where you stock up on all the base items you need to keep your journey going.</p>
          </div>
        </div>
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>Actions</h4>
            <div class="row">
              <div class="col-12">
                <p>The Shop is not accessible yet. Come back later!</p>
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
  title: "The Common Shop - Soakverse P2E",
});

const actions = [];
</script>

<style lang="scss">
#shop-layout {
  background-image: url("/images/p2e/common-shop.webp");
  background-size: cover;
  background-position: center center;
}
</style>
