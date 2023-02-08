<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <div id="global-loader">
    <div class="loader-holder">
      <img class="icon" src="/soakverse-icon.png" alt="Soakverse Icon" />
      <img class="icon" src="@/assets/img/processing.gif" alt="Soakverse Loader progress bar" />
    </div>
  </div>
</template>

<script>
if (process.client) {
  window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  });
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
