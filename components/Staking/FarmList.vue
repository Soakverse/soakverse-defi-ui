<template>
  <div class="row">
    <FarmItem v-for="farm in farms" :key="farm.id" :farm="farm" />
  </div>
</template>

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
