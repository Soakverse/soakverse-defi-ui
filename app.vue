<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <div id="global-loader">
    <div class="loader-holder">
      <img class="icon" src="/soakverse-icon.png" alt="Soakverse Icon" />
      <img
        class="icon"
        src="@/assets/img/processing.gif"
        alt="Soakverse Loader progress bar"
      />
    </div>
  </div>
  <span aria-hidden="true" class="appkit-font-warmup">.</span>
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
  filter: blur(0.2rem);
}

@font-face {
  font-family: "KHTeka";
  src: url("https://fonts.reown.com/KHTeka-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
.appkit-font-warmup {
  font-family: "KHTeka", sans-serif;
  position: absolute;
  left: -9999px;
  top: -9999px;
  visibility: hidden;
  pointer-events: none;
}
</style>
