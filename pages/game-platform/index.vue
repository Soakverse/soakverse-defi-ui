<template>
  <div class="container-fluid">
    <div class="card-game-plat">
      <div class="row mt-5">
        <div class="col-12 col-xxl-10 offset-xxl-1">
          <div class="card py-0 overflow-hidden">
            <div class="row">
              <div class="col-lg-6 px-0 col-xl-8">
                <div class="row left-div">
                  <div class="col-12 col-xl-6">
                    <p class="p-gold">Featured games</p>
                    <h2 class="mt-5 text-white fs-1 fw-bold">
                      Play Soakverse Chronicles
                    </h2>
                    <p class="text-grey fs-6">
                      Experience a retro-inspired world of wonders, filled with
                      creatures, traps, perils, and treasures!
                    </p>
                    <div class="mt-4">
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
                </div>
              </div>
              <div class="col-lg-6 col-xl-4 right-div">
                <div class="row mx-auto">
                  <div class="mt-3">
                    <h5 class="pb-2 ps-4 ps-lg-2 p-gold">Trending games</h5>
                    <ul class="p-0">
                      <li class="d-flex my-1">
                        <img src="/images/game-platform/latest-news-1.png" alt="" />
                        <div class="ms-3">
                          <h4 class="text-white fw-bold fs-5">
                            Play Soakverse Chronicles
                          </h4>
                          <p class="text-grey fs-6">Play the flagship game!</p>
                        </div>
                      </li>
                      <li class="d-flex my-1">
                        <img src="/images/game-platform/latest-news-2.png" alt="" />
                        <div class="ms-3">
                          <h4 class="text-white fw-bold fs-5">African Llama</h4>
                          <p class="text-grey fs-6">Episode 1 available</p>
                        </div>
                      </li>
                      <li class="d-flex my-1">
                        <img src="/images/game-platform/latest-news-3.png" alt="" />
                        <div class="ms-3">
                          <h4 class="text-white fw-bold fs-5">Special Order</h4>
                          <p class="text-grey fs-6">
                            From the makes of African
                          </p>
                        </div>
                      </li>
                      <li class="d-flex">
                        <img src="/images/game-platform/latest-news-4.png" alt="" />
                        <div class="ms-3">
                          <h4 class="text-white fw-bold fs-5">
                            More Blastercraze News
                          </h4>
                          <p class="text-grey fs-6">Coming soon in 2024</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mx-auto mt-5">
      <div class="col-10 offset-md-1">
        <div class="row">
          <div class="col-12 col-md-4">
            <h2 class="text-white">
              <span class="fw-bold">GAMES</span> OF THE MOMENT
            </h2>
          </div>
          <div class="col-8 d-none d-md-block">
            <hr class="w-100 hr-game-plat" />
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5 sub-card">
      <div class="col-xl-10 offset-xl-1">
        <div class="row">
          <div class="col-12 col-sm-6 col-lg-4 col-xl-4 col-xxl-2 mb-4" v-for="(game, index) in games" :key="game.title"
            :class="{ 'not-first-card': index !== 0 }">
            <GameCard :gameDefinition="game" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GameCard from '@/components/GamePlatform/GameCard.vue';
import { gameSummaryDefinitions } from '@/utils/mocks/GamePlatform';

const games = gameSummaryDefinitions;

useHead({
  title: 'Dashboard - Soakverse DeFI Platform',
});
definePageMeta({
  layout: 'game-platform',
});
</script>

<style scoped lang="scss">
ul li {
  position: relative;
  width: 100%;
}

ul li:not(:first-child)::before {
  content: 'Coming soon';
  position: absolute;
  font-size: 18px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(20px);
  color: #fff;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
