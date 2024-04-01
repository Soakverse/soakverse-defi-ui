<template>
  <div class="container-fluid game-detail">
    <div class="row mt-5">
      <div class="col-xxl-9 mx-auto">
        <div class="row">
          <div class="col-xl-5">
            <div class="row">
              <div class="col-xl-3 d-flex justify-content-center justify-content-xl-start">
                <img width="120px" height="120px" class="img-fluid" src="/images/game-platform/game-01-zoom.png" alt=""
                  style="border-radius: 8px;" />
              </div>
              <div
                class="col-xl-9 d-flex justify-content-center justify-content-xl-start mt-3 mt-xl-0 align-items-center">
                <img src="/images/game-platform/title-soakverse.png" class="img-fluid" alt="" />
              </div>
            </div>
          </div>
          <div class="col-12 col-xl-7 justify-content-xl-end mt-auto">
            <div class="row mt-3 mt-xl-0">
              <div class="col-xl-6 d-flex">
                <div class="d-flex mx-auto justify-content-xl-around">
                  <NuxtLink type="button" to="/game-platform/games/play/soakverse-chronicles"
                    class="btn me-2 btn-gold br-8">
                    <img class="pe-2" src="/images/game-platform/games-1.svg" />
                    Play now !
                  </NuxtLink>
                  <button type="button" class="btn btn-green text-white br-8">
                    <img class="pe-2" src="/images/game-platform/star.svg" />
                    Follow
                  </button>
                </div>
              </div>
              <div class="d-flex col-6 col-xl-3 mt-3 mt-xl-0">
                <div class="d-flex justify-content-around">
                  <a class="p-2 me-xl-2 me-3 link-details br-8"><img src="/images/game-platform/share.png" alt=""></a>
                  <a class="p-2 me-xl-2 me-3 link-details br-8"><img src="/images/game-platform/website.png" alt=""></a>
                  <a class="p-2 me-xl-2 me-3 link-details br-8"><img src="/images/game-platform/x.png" alt=""></a>
                  <a class="p-2 br-8 link-details"><img src="/images/game-platform/discord.png" alt=""></a>
                </div>
              </div>
              <div class="col-6 col-xl-3 mt-3 mt-xl-0">
                <div class="d-flex justify-content-end">
                  <NuxtLink class="p-2 br-8 text-grey link-details" to="/game-platform/games">
                    <img src="/images/game-platform/arrow-back.png" class="pe-3" alt="">Games
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4 card-game-plat">
      <div class="col-xxl-9 mx-auto">
        <div class="card">
          <div class="row">
            <div class="col-lg-8 col-12">
              <div class="d-flex ms-2">
                <p class="p-gold me-3">Overview</p>
                <p class="text-grey me-3">Collections</p>
                <p class="text-grey">Activity</p>
              </div>
              <div class="card" style="background-color: #143138;">
                <div id="carouselExampleIndicators" class="carousel slide h-100 w-100" data-bs-ride="carousel">
                  <div class="carousel-inner ratio ratio-16x9 br-8">
                    <div class="carousel-item active">
                      <img src="/images/game-platform/soakverse-video.webp" class="d-block w-100 h-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                      <img src="/images/game-platform/castle.webp" class="d-block w-100 h-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                      <img src="/images/game-platform/lake.webp" class="d-block w-100 h-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                      <img src="/images/game-platform/village.webp" class="d-block w-100 h-100" alt="..." />
                    </div>
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                  <div class="carousel-indicators m-0">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                      class="active thumbnail" aria-current="true" aria-label="Slide 1">
                      <img src="/images/game-platform/soakverse-video.webp" class="d-block w-100" alt="..." />
                    </button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                      class="thumbnail" aria-label="Slide 2">
                      <img src="/images/game-platform/castle.webp" class="d-block w-100" alt="..." />
                    </button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                      class="thumbnail" aria-label="Slide 3">
                      <img src="/images/game-platform/lake.webp" class="d-block w-100" alt="..." />
                    </button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"
                      class="thumbnail" aria-label="Slide 4">
                      <img src="/images/game-platform/village.webp" class="d-block w-100" alt="..." />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-4 mt-5">
              <div class="d-flex my-1">
                <img width="56px" height="56px" style="border-radius: 6px;"
                  src="/images/game-platform/latest-news-1.png" alt="" />
                <div class="ms-3">
                  <h4 class="text-white fw-bold fs-5">
                    Play Soakverse Chronicles
                  </h4>
                  <p class="text-grey fs-6">Free to play</p>
                </div>
              </div>
              <p class="text-grey">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
                dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula
                massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie.
              </p>
              <hr class="hr-game-plat w-75 mx-auto">
              <div class="">
                <div v-for="(gameDetail, index) in gameInfoDetail" :key="(gameDetail.type)"
                  class="d-flex justify-content-between">
                  <p class="text-grey">{{ gameDetail.type }}</p>
                  <p class="text-white">{{ gameDetail.categories }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
console.log(route.params);

useHead({
  title: 'Dashboard - Soakverse DeFI Platform',
});
definePageMeta({
  layout: 'game-platform',
});
</script>
<script>
const gameInfoDetail = [
  {
    type: "Chain(s)",
    categories: "Arbitrum One, Ethereum"
  },
  {
    type: "Developer",
    categories: "Soakverse Studios"
  },
  {
    type: "Game Status",
    categories: "Alpha (Open)"
  },
  {
    type: "Platform(s)",
    categories: "Web, iOS, Android"
  },
  {
    type: "Genre(s)",
    categories: "Role Playing Game"
  },
  {
    type: "Player info",
    categories: "Single player"
  }
]
</script>

<style scoped lang="scss">
.container-fluid {
  background-image: url("/images/game-platform/soakverse-chronicles-bg.webp");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
