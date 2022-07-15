<template>
  <div id="timer">
    <div id="days" class="text-center">{{ days }} <span>Days</span></div>
    <div id="hours" class="text-center">{{ hours }} <span>Hours</span></div>
    <div id="minutes" class="text-center">
      {{ minutes }} <span>Minutes</span>
    </div>
    <div id="seconds" class="text-center">
      {{ seconds }} <span>Seconds</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: "",
      hours: "",
      minutes: "",
      seconds: "",
      endTime: new Date("July 16, 2022 16:00:00 EDT"),
    };
  },
  mounted() {
    setInterval(() => {
      this.countdownTimer();
    }, 1000);
  },
  methods: {
    countdownTimer() {
      const endTime = this.endTime;
      if (new Date() > endTime) {
        this.days = "00";
        this.hours = "00";
        this.minutes = "00";
        this.seconds = "00";
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

      this.days = days;
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
    },
  },
};
</script>
