<template>
  <div class="container-fluid d-flex">
    <div class="row m-auto full">
      <div class="col px-0">
        <div class="card mb-4">
          <h2 class="mt-4 text-center mb-2">Staking Platform</h2>
          <FarmList v-if="stakingActivated" />
          <div v-else>
            <h5 class="mb-4 text-center">Coming in:</h5>
            <Countdown class="pb-4" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Countdown from "~~/components/UI/Countdown.vue";
import FarmList from "~~/components/Staking/Spoc/FarmList.vue";
useHead({
  title: "Staking - Soakverse DeFI Platform",
});
</script>

<script>
export default {
  data() {
    return {
      stakingActivated: true,
    };
  },
};
</script>
