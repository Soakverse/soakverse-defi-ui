<template>
  <div class="container-fluid d-flex">
    <div class="row m-auto full">
      <div class="col px-0">
        <div class="card">
          <h2 class="mb-2 mt-4 text-center mb-2">Staking Platform</h2>
          <FarmList v-if="stakingActivated" class="pb-4" />
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
import FarmList from "~~/components/Staking/FarmList.vue";
useHead({
  title: "Staking - Soakmont DeFI Platform",
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
