<template>
  <NuxtLayout name="base">
    <NuxtPage />
  </NuxtLayout>
</template>

<script>
if (process.client) {
  window.addEventListener("load", () => {
    if (!("serviceWorker" in navigator)) {
      throw new Error("serviceWorker is not supported in current browser!");
    }
    navigator.serviceWorker.register("/sw.js");
  });
}
</script>
