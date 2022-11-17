<template>
  <div class="row text-left px-1 mt-4">
    <div v-if="state.raffle.id" class="col-12 card">
      <h3>
        <i class="fa-solid fa-award"></i> {{ state.raffle.raffleTitle }}
        <i class="fa-solid fa-award"></i>
      </h3>
      <h6>Raffle end date: {{ formatDateInTimezone(state.raffle.raffleDate) }} (Your timezone)</h6>
      <span v-if="state.raffle.winnersPicked" class="badge bg-success mx-auto"> Winners Picked! </span>
      <span v-else-if="state.raffle.ended" class="badge bg-warningv"> Ended. Waiting winners. </span>
      <span v-else class="badge bg-primary mx-auto"> Raffle is ongoing! </span>
      <div class="row px-4 py-2">
        <h3 class="mt-3 mb-0">Prizes</h3>
        <div v-for="prize in state.prizes" :key="prize.id" class="col-12 col-sm-6 col-md-3 py-3">
          <div class="card prize-card">
            <h5>{{ prize.prizeTitle }}</h5>
            <img :src="prize.webImageUrl" class="img-responsive w-100" />
            <h6 class="mt-2 mb-0 p-0">{{ prize.prizeDescription }}</h6>
            <p class="m-0 p-0" v-if="prize.winner">{{ winner }}</p>
            <p class="m-0 p-0" v-else>No winner yet</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-6 social-card">
      <a
        target="_blank"
        href="https://opensea.io/collection/soakverse-ogs"
        class="social-holder w-100"
        style="background-color: #06262d"
      >
        <div class="m-auto">
          <img class="icon" src="@/assets/img/opensea-white.png" alt="Open Sea Logo" />
          <p>Get Soakverse OGs on Open Sea</p>
        </div>
      </a>
    </div>
    <div class="col-12 col-lg-6 social-card">
      <a
        target="_blank"
        href="https://opensea.io/collection/eggz-by-soakverse"
        class="social-holder w-100"
        style="background-color: #06262d"
      >
        <div class="m-auto">
          <img class="icon" src="@/assets/img/opensea-white.png" alt="Open Sea Logo" />
          <p>Get Soakverse Eggz on Open Sea</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { showLoader, hideLoader, formatDateInTimezone } from "~~/utils/helpers";

const props = defineProps({
  raffleId: {
    type: String,
  },
});

const { connectedWallet } = useWeb3WalletState();

const config = useRuntimeConfig();

const { $web3 } = useNuxtApp();

const state = reactive({
  raffle: {},
  prizes: [],
});

onMounted(async () => {
  fetchAllData();
});

async function fetchAllData() {
  if (process.client) {
    showLoader();
    const raffleUrl = `${config.apiUrl}/raffle/${props.raffleId}`;
    state.raffle = await $fetch(raffleUrl);

    const prizesUrl = `${config.apiUrl}/prizes/${props.raffleId}`;
    state.prizes = await $fetch(prizesUrl);
    hideLoader();
  }
}
</script>

<style lang="scss">
.prize-card {
  border: 4px solid #e1b77e;
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
