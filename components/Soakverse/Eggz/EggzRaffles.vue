<template>
  <div class="row text-left px-1 mt-4">
    <div class="col-12">
      <h5>
        <i class="fa-solid fa-award"></i> Eggz Giveaways
        <i class="fa-solid fa-award"></i>
      </h5>
      <hr />
      <div class="row">
        <div
          v-for="raffle in state.raffles"
          :key="raffle.id"
          class="col-12 card mb-3"
        >
          <h3>{{ raffle.raffleTitle }}</h3>
          <h6>
            <b>Giveaway end date:</b>
            {{ formatDateInTimezone(raffle.raffleDate) }} (Your timezone)
          </h6>
          <h6>
            <b>Giveaway Status: </b>
            <span v-if="raffle.winnersPicked" class="badge bg-success">
              Winners Picked!
            </span>
            <span v-else-if="raffle.ended" class="badge bg-warning">
              Ended. Waiting winners.
            </span>
            <span v-else class="badge bg-primary"> Giveaway is ongoing! </span>
          </h6>
          <nuxt-link
            :to="'/soakverse/giveaways/' + raffle.id"
            class="mx-auto btn btn-primary mb-2 d-inline-block"
          >
            View Giveaway
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { showLoader, hideLoader, formatDateInTimezone } from "~~/utils/helpers";

const config = useRuntimeConfig();

const state = reactive({
  raffles: [],
});

onMounted(async () => {
  fetchAllData();
});

async function fetchAllData() {
  if (process.client) {
    showLoader();
    const rafflesUrl = `${config.apiUrl}/raffle`;
    state.raffles = await $fetch(rafflesUrl);
    hideLoader();
  }
}
</script>
