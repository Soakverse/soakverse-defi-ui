<template>
  <div
    class="container-fluid d-flex p-0 game-layout pt-200"
    id="migration-layout"
  >
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12 mb-2">
          <div class="card text-left h-100">
            <h4>
              <span class="me-2 duvall-font mb-2 d-inline-block"
                >Soakverse DAO Pass Claim
              </span>
            </h4>
          </div>
        </div>
        <div class="col-12 mb-2">
          <div class="card text-center h-100">
            <ERC721Migration
              :newContract="soakverseDAOPassSmartContract"
              :oldContract="soakverseOGsSmartContract"
              :migrationLimit="100"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ERC721Migration from "~/components/NFT/ERC721Migration.vue";
import {
  soakverseDAOPassSmartContract,
  soakverseOGsSmartContract,
} from "~~/utils/contracts";
definePageMeta({
  layout: "p2e-layout",
});

useHead({
  title: "Soakverse DAO Pass Migration - Soakverse",
});
</script>

<style lang="scss">
#migration-layout {
  background-image: url("/images/soakverse-dao.webp");
  background-size: cover;
  background-position: center center;
}
.green-text {
  color: white !important;
}
</style>
