<template>
  <div class="d-inline-flex align-items-center">
    <div class="d-inline-flex align-items-center">
      <select
        v-if="multichain"
        @change="onNetworkChanged($event)"
        v-model="networkId"
      >
        <option v-for="id in networkIds" :value="id" :key="id">
          {{ chainInfo[id].networkName }}
        </option>
      </select>
      <div v-if="chainInformation.shortName">
        <a class="btn btn-primary btn-sm mx-2">{{
          chainInformation.shortName
        }}</a>
      </div>
    </div>
    <div class="d-inline-flex align-items-center">
      <a
        v-if="!connectedWallet"
        @click="initializeWallet"
        class="btn btn-primary btn-sm"
        >Connect</a
      >
      <a v-else @click="disconnectWallet" class="btn btn-primary btn-sm">{{
        formatWalletAddress(connectedWallet)
      }}</a>
    </div>
  </div>
</template>
<script setup>
import { formatWalletAddress } from "../utils/helpers";

const {
  chainInformation,
  connectedWallet,
  chainId,
  web3Provider,
  setWeb3,
  setWeb3Provider,
} = useWeb3WalletState();
const { $web3Modal } = useNuxtApp();
const multichain = false;
const cachedProvider = process.client
  ? localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")
  : null;

if (cachedProvider) initializeWallet();

async function initializeWallet() {
  try {
    const provider = await $web3Modal.connect();
    setWeb3Provider(provider);
  } catch (e) {
    console.log(e);
    alert(e);
  }
}

async function disconnectWallet() {
  if (process.client) {
    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
  }
  await $web3Modal.clearCachedProvider();
  setWeb3Provider(null);
  setWeb3(null);
}
</script>
