<template>
  <div
    class="container-fluid d-flex p-0 game-layout pt-200"
    id="dao-staking-layout"
  >
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <nuxt-link to="/dao" class="btn btn-primary mb-2">
            DAO Dashboard
          </nuxt-link>
          <div class="card text-center mb-4">
            <ERC721InlineStaking
              :stakingContract="soakverseDAOPassSmartContract"
              :blockchain="targetBlockchain"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ERC721InlineStaking from "~~/components/NFT/ERC721InlineStaking.vue";
import { soakverseDAOPassSmartContract } from "~~/utils/contracts";
import { blockchainDefinitions } from "~~/utils/blockchain";

definePageMeta({
  layout: "p2e-layout",
});

useHead({
  title: "Soakverse DAO Pass Staking - Soakverse DeFI Platform",
});

const targetBlockchain = blockchainDefinitions["1"];
</script>

<style lang="scss">
#dao-staking-layout {
  background-image: url("/images/dao-staking.webp");
  background-size: cover;
  background-position: center center;
}
.green-text {
  color: white !important;
}
</style>
