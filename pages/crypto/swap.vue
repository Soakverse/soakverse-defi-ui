<template>
  <div class="container-fluid d-flex">
    <div class="row m-auto full">
      <div class="col">
        <div class="text-center mb-4">
          <h2>Cross-Chain Swap</h2>
          <iframe
            id="simpleswap-frame"
            name="SimpleSwap Widget"
            width="528px"
            height="450px"
            src="https://simpleswap.io/widget/2b0f0648-c73a-4896-8db8-14e355b15a4a"
            frameborder="0"
            class="mx-auto"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>

<script setup>
useHead({
  title: "Home - Soakverse DeFI Platform",
});
</script>
