<template>
  <NuxtLayout name="base">
    <NuxtPage />
  </NuxtLayout>
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
