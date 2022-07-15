<template>
  <div class="row">
    <div class="col-12" v-if="chainInformation.chainId == '56'">
      <FarmItem v-for="farm in farms" :key="farm.id" :farm="farm" />
    </div>
    <div class="col-12" v-else>
      <h4 class="text-center m-4">Please switch to BSC</h4>
    </div>
  </div>
</template>

<script setup>
const { chainInformation } = useWeb3WalletState();
</script>

<script>
import FarmItem from "./FarmItem.vue";

export default {
  data() {
    return {
      farms: [
        {
          id: 1,
          farmName: "$SKMT Staking",
          tokenName: "Soakmont V2",
          ticker: "SKMT",
          cgId: "soakmont",
          contracts: {
            token: "",
            staking: "",
          },
        },
      ],
    };
  },
  components: { FarmItem },
};
</script>
