<template>
  <div v-if="!currentAccount" class="col-12">
    <h4>Please connect your wallet.</h4>
  </div>
  <div v-else-if="props.blockchain.chainId != currentChain" class="col-12">
    <h4>You are on the wrong chain. {{ network }}</h4>
    <button
      class="btn btn-success ms-1"
      @click="blockchainStore.switchCurrentNetwork(props.blockchain.chainId)"
    >
      Switch to {{ props.blockchain.name }}
    </button>
  </div>
  <div v-else class="col-12">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { BlockchainDefinition } from "~~/types/blockchain/BlockchainTypes";
const props = defineProps<{
  blockchain: BlockchainDefinition;
}>();

const { blockchainStore, currentAccount, currentChain } =
  await useWeb3WalletState();
</script>
