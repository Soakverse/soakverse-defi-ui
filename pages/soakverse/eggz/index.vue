<template>
  <div class="container-fluid d-flex">
    <div class="row m-auto">
      <div class="col">
        <div class="card text-center">
          <h4><b>SOAKVERSE WORLD</b></h4>
          <p class="my-3">What do you want to do?</p>
          <nuxt-link to="/soakverse/backpack" class="btn btn-primary mb-2">
            Backpack
          </nuxt-link>
          <p>or</p>
          <nuxt-link to="/soakverse/eggz/staking" class="btn btn-primary"
            >Eggz Staking
          </nuxt-link>
          <p class="mt-3">Other features coming soon...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const state = reactive({
  days: "-",
  hours: "-",
  minutes: "-",
  seconds: "-",
  endTime: new Date("February 01, 2023 12:00:00 EDT"),
});

onMounted(async () => {
  setInterval(() => {
    timer();
  }, 1000);
});

function timer() {
  let endTime = state.endTime;
  if (new Date() > endTime) {
    state.days = "00";
    state.hours = "00";
    state.minutes = "00";
    state.seconds = "00";
    state.mintStarted = true;
    return;
  }
  let endTimeParse = Date.parse(endTime) / 1000;
  let now = new Date();
  let nowParse = Date.parse(now) / 1000;
  let timeLeft = endTimeParse - nowParse;
  let days = Math.floor(timeLeft / 86400);
  let hours = Math.floor((timeLeft - days * 86400) / 3600);
  let minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
  let seconds = Math.floor(
    timeLeft - days * 86400 - hours * 3600 - minutes * 60
  );
  if (days < "10") {
    days = "0" + days;
  }
  if (hours < "10") {
    hours = "0" + hours;
  }
  if (minutes < "10") {
    minutes = "0" + minutes;
  }
  if (seconds < "10") {
    seconds = "0" + seconds;
  }
  state.days = days;
  state.hours = hours;
  state.minutes = minutes;
  state.seconds = seconds;
}

useHead({
  title: "Soakverse Game - Soakverse DeFI Platform",
});
</script>
