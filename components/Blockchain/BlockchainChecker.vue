<template>
  <div v-if="!currentAccount" class="col-12">
    <h4>Please connect your wallet.</h4>
  </div>
  <div v-else-if="props.blockchain.chainId != currentChain" class="col-12">
    <h4>You are on the wrong chain.</h4>
    <button
      class="btn btn-success ms-1"
      @click="
        switchNetwork({
          chainId: props.blockchain.chainId,
        })
      "
    >
      Switch to {{ props.blockchain.name }}
    </button>
  </div>
  <div v-else class="col-12">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { switchNetwork } from "@wagmi/core";
import { BlockchainDefinition } from "~~/types/blockchain/BlockchainTypes";
const { currentAccount, currentChain } = useWeb3WalletState();

const props = defineProps<{
  blockchain: BlockchainDefinition;
}>();

const state = reactive({
  currentAccount: currentAccount.value,
});
</script>
