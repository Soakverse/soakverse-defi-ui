<template>
  <div class="container-fluid">
    <div class="row m-auto full">
      <div class="col">
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

    <div class="row">
      <pre id="log"></pre>
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
      stakingActivated: false,
    };
  },
  mounted() {
    if (process.client) {
      (function () {
        var old = console.log;
        var logger = document.getElementById("log");
        console.log = function () {
          for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == "object") {
              logger.innerHTML +=
                (JSON && JSON.stringify
                  ? JSON.stringify(arguments[i], undefined, 2)
                  : arguments[i]) + "<br />";
            } else {
              logger.innerHTML += arguments[i] + "<br />";
            }
          }
        };
      })();
    }
  },
};
</script>
