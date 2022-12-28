<template>
  <div class="row text-left px-1 mt-4">
    <div class="col-12 card" v-if="connectedWallet && chainInformation.chainId == '1'">
      <h3>Backpack</h3>
      <span class="badge bg-success mx-auto"> {{ state.items.length }} Item(s)! </span>
      <p class="my-2">
        The items that you win or collect will accumulate here. Consumables will soon be activated. Those are precious.
        Stay tuned!
      </p>
      <div class="row px-2 py-2">
        <div v-if="state.items.length == 0">
          <h4 class="mt-4">No item yet!</h4>
        </div>
        <div v-for="item in state.items" :key="item.id" class="col-12 col-sm-6 col-lg-4 col-xl-3 py-3">
          <div class="card prize-card">
            <h5>{{ item.title }}</h5>
            <div class="item-image-holder">
              <img :src="item.thumbnailImageUrl" class="img-responsive w-100" />
              <div class="item-quantity">{{ item.itemCount }}</div>
            </div>
            <h6 class="mt-2 mb-0 p-0">{{ item.description }}</h6>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 card" v-else>
      <h3>Backpack</h3>
      <h6>Please connect your wallet on the Ethereum Mainnet</h6>
    </div>
    <OpenSea />
  </div>
</template>

<script setup>
import OpenSea from "~~/components/Soakverse/Utils/OpenSea.vue";
import { showLoader, hideLoader } from "~~/utils/helpers";

const { connectedWallet, chainInformation } = useWeb3WalletState();

const config = useRuntimeConfig();

const { $web3 } = useNuxtApp();

const state = reactive({
  items: [],
  connectedWallet,
});

onMounted(async () => {
  try {
    if (process.client && state.connectedWallet) {
      fetchAllData();
    }
  } catch (e) {
    console.log(e.message);
  }
});

watch(connectedWallet, async () => {
  if (process.client && state.connectedWallet) {
    fetchAllData();
  }
});

async function fetchAllData() {
  if (process.client) {
    showLoader();
    try {
      const itemsUrl = `${config.apiUrl}/game-items/${state.connectedWallet}/grouped`;
      state.items = await $fetch(itemsUrl);
    } catch (e) {}
    hideLoader();
  }
}
</script>

<style lang="scss">
.prize-card {
  border: 4px solid #e1b77e;
  height: 100%;
  &.winner {
    border: 4px solid green;
  }
  .item-image-holder {
    position: relative;
    .item-quantity {
      position: absolute;
      bottom: 0;
      right: 0;
      background-color: #071d28;
      border-radius: 16px;
      height: 32px;
      min-width: 30px;
      padding: 1px 6px;
      font-size: 22px;
      font-weight: bold;
      color: white;
    }
  }
}

.social-card {
  padding: 8px;
  a.social-holder {
    display: flex;
    padding: 20px;
    border-radius: 8px;
    opacity: 0.7;
    .icon {
      max-height: 40px;
      max-width: 100%;
    }
    p {
      margin: 0;
      padding: 0;
      margin-top: 10px;
      font-size: 16px;
      font-weight: 500;
      color: white;
    }
    &:hover {
      opacity: 1;
    }
  }
}
</style>
