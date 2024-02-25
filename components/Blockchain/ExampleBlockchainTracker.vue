<template>
  <p>Account: {{ currentAccount }}</p>
  <p>Network: {{ currentChain }}</p>
</template>

<script setup>
const { currentAccount, currentChain } = await useWeb3WalletState();
</script>
