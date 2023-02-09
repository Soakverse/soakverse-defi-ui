<template>
  <div class="container-fluid d-flex p-0 game-layout" id="bulletin-board-layout">
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>
              Bulletin Board
              <a
                href="https://docs.soakverse.io/soakverse/soakverse-world/soakverse-game-world/the-village/the-public-square"
                target="_blank"
                class="btn btn-sm btn-primary"
                ><i class="fa fa-question-circle"></i
              ></a>
              <nuxt-link class="btn btn-sm btn-primary float-end" to="/play/village/public-square"
                ><i class="fa-solid fa-circle-arrow-left"></i> Public Square</nuxt-link
              >
            </h4>
            <div class="bulletin-board-roadmap">
              <h5>Upcoming Releases</h5>
              <div class="ps-2">
                <h6>Short Term</h6>
                <div class="ps-2">
                  <p><b>Pasture: Eggz start to gain experience</b></p>
                  <ul>
                    <li>Eggz Levels</li>
                    <li>Eggz Runes & Abilities</li>
                    <li>Eggz pedigree</li>
                  </ul>
                  <p><b>Leaderboard</b></p>
                  <ul>
                    <li>Rankings</li>
                    <li>Events with prizes</li>
                    <li>Winning Jackpots</li>
                  </ul>
                  <p><b>Training</b></p>
                  <ul>
                    <li>Early entry expeditions & in-city quests</li>
                    <li>Leveling up system for Resiztance Trainee</li>
                    <li>Player profile & pedigree</li>
                  </ul>
                  <p><b>Countryside: Expeditions & Quests</b></p>
                  <p><b>Shop</b></p>
                  <ul>
                    <li>Ability to buy in-game items</li>
                    <li>Items claimable as NFTs on the BSC chain including Wizh Essences</li>
                    <li>Hidden Caravan with limited rare items</li>
                  </ul>
                  <p><b>Wizh Stones</b></p>
                  <ul>
                    <li>Wizhing Well</li>
                    <li>On-Chain Jackpot Pool</li>
                    <li>Pasture Wizh linking activation</li>
                  </ul>
                  <p><b>Mentor System</b></p>
                  <p><b>More To Be Announced</b></p>
                </div>
                <hr />
                <h6>Mid & Long Term</h6>
                <div class="ps-2">
                  <p><b>PVP System</b></p>
                  <p><b>Tournaments System</b></p>
                  <p><b>More To Be Announced</b></p>
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
definePageMeta({
  layout: "p2e-layout",
});

useHead({
  title: "Bulletin Board - Soakverse P2E",
});

const actions = [];
</script>

<style lang="scss">
#bulletin-board-layout {
  background-image: url("/images/p2e/bulletin-board.webp");
  background-size: cover;
  background-position: center center;
}

.bulletin-board-roadmap {
  color: white;
  p {
    margin-bottom: 0;
  }
  ul {
    font-size: 14px;
    li {
    }
  }
}
</style>
