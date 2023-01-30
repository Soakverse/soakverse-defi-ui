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
