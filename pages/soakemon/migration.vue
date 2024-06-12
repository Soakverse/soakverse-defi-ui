<template>
  <div
    class="container-fluid d-flex p-0 game-layout pt-200"
    id="voucher-minting-layout"
  >
    <div class="container-fluid d-flex p-2 game-sublayout">
      <div class="row w-100 mt-auto g-0">
        <div class="col-12">
          <div class="card text-center h-100">
            <ERC721VoucherMinting
              :mintContract="soakemonSmartContract"
              :mintLimit="1000"
              :voucherInfo="soakemonVoucherInfo"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ERC721VoucherMinting from '~/components/Blockchain/NFT/ERC721VoucherMinting.vue';
import { soakemonSmartContract } from '~~/utils/contracts';
import { soakemonVoucherInfo } from '~~/utils/voucher/soakemon-voucher';

definePageMeta({
  layout: 'p2e-layout',
});

useHead({
  title: 'Soakemon By Soakverse NFT Voucher Claim - Soakverse',
});
</script>

<style lang="scss">
#voucher-minting-layout {
  background-image: url('/images/dao-migration.webp');
  background-size: cover;
  background-position: center center;
}
.green-text {
  color: white !important;
}
</style>
