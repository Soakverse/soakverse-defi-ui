<template>
  <button class="btn btn-primary sound-player" @click="toggleSound">
    <i v-if="!state.isSoundEnabled" class="fa-solid fa-play"></i>
    <i v-else class="fa-solid fa-stop"></i>
  </button>
</template>

<script setup>
const { state, toggleSoundEnabled } = useUiState();

function toggleSound() {
  if (!state.isSoundEnabled) {
    state.audio = new Audio("/song.mp3");
    state.audio.loop = true;
    state.audio.volume = 1;
    state.audio.play();
    toggleSoundEnabled();
  } else {
    state.audio.pause();
    toggleSoundEnabled();
  }
}
</script>

<style>
.sound-player {
  position: fixed;
  bottom: 15px;
  right: 15px;
  font-size: 10px;
  color: white;
}
</style>
