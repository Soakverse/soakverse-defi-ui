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
          farmName: "$SPOC Staking",
          tokenName: "Soakverse Proof Of Contribution",
          ticker: "SPOC",
          cgId: "spoc",
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
