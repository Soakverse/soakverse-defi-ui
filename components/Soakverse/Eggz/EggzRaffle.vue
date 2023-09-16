<template>
  <div class="row px-1 mt-4">
    <div class="col-12 card">
      <h5>
        To participate in giveaways, you must stake Eggz By Soakverse or Own a
        Soakverse OG
      </h5>
      <p class="pb-0 mb-0">Get one of our multi-utilities NFT on OpenSea:</p>
      <div class="d-block">
        <a
          target="_new"
          class="btn btn-success d-inline-block m-2"
          href="https://opensea.io/collection/eggz-by-soakverse"
          >Eggz by Soakverse</a
        >
        <a
          target="_new"
          class="btn btn-success d-inline-block m-2"
          href="https://opensea.io/collection/soakverse-ogs"
          >Soakverse OGs</a
        >
      </div>
    </div>
  </div>
  <div class="row text-left px-1 mt-2">
    <div v-if="state.raffle.id" class="col-12 card">
      <h3>
        <i class="fa-solid fa-award"></i> {{ state.raffle.raffleTitle }}
        <i class="fa-solid fa-award"></i>
      </h3>
      <h6>
        Giveaway end date:
        {{ formatDateInTimezone(state.raffle.raffleDate) }} (Your timezone)
      </h6>
      <span v-if="state.raffle.winnersPicked" class="badge bg-success mx-auto">
        Winners Picked!
      </span>
      <span v-else-if="state.raffle.ended" class="badge bg-warning mx-auto">
        Ended. Waiting winners.
      </span>
      <span v-else class="badge bg-primary mx-auto">
        Giveaway is ongoing!
      </span>
      <div class="row px-4 py-2">
        <h3 class="mt-3 mb-0">Prizes</h3>
        <div v-if="state.prizes.length == 0">
          <h4 class="mt-4">Prizes not defined yet!</h4>
        </div>
        <div
          v-for="prize in state.prizes"
          :key="prize.id"
          class="col-12 col-sm-6 col-lg-4 col-xl-3 py-3"
        >
          <div
            class="card prize-card"
            :class="{
              winner: prize.winner ? verifyAddress(prize.winner) : null,
            }"
          >
            <h5>{{ prize.prizeTitle }}</h5>
            <img :src="prize.webImageUrl" class="img-responsive w-100" />
            <h6 class="mt-2 mb-0 p-0">{{ prize.prizeDescription }}</h6>
            <p class="m-0 p-0" v-if="prize.winner">
              {{ formatWalletAddress(prize.winner) }}
            </p>
            <p class="m-0 p-0" v-else>No winner yet</p>
          </div>
        </div>
      </div>
    </div>
    <OpenSea />
  </div>
</template>

<script setup>
import OpenSea from "~~/components/Soakverse/Utils/OpenSea.vue";
import {
  formatWalletAddress,
  showLoader,
  hideLoader,
  formatDateInTimezone,
} from "~~/utils/helpers";

const props = defineProps({
  raffleId: {
    type: String,
  },
  privateRaffle: {
    type: String,
    default: "false",
  },
});

const { currentAccount } = useWeb3WalletState();

const config = useRuntimeConfig();

const { $web3 } = useNuxtApp();

const state = reactive({
  raffle: {},
  prizes: [],
  currentAccount,
});

onMounted(async () => {
  fetchAllData();
});

async function fetchAllData() {
  if (process.client) {
    showLoader();
    const raffleUrl =
      props.privateRaffle == "true"
        ? `${config.public.apiUrl}/raffle/${props.raffleId}/private`
        : `${config.public.apiUrl}/raffle/${props.raffleId}`;
    try {
      state.raffle = await $fetch(raffleUrl);
    } catch (e) {
      console.log(e);
    }

    if (state.raffle) {
      const prizesUrl = `${config.public.apiUrl}/prizes/${props.raffleId}`;
      try {
        state.prizes = await $fetch(prizesUrl);
      } catch (e) {
        console.log(e);
      }
    }
    hideLoader();
  }
}

function verifyAddress(address) {
  if (!state.currentAccount) {
    return false;
  }
  const addressIsTheSame =
    state.currentAccount.toLowerCase() === address.toLowerCase() ? true : false;
  return addressIsTheSame;
}
</script>

<style lang="scss">
.prize-card {
  border: 4px solid #e1b77e;
  &.winner {
    border: 4px solid green;
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
