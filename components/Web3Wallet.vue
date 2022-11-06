<template>
  <div class="d-inline-flex align-items-center">
    <div class="d-inline-flex align-items-center mx-2">
      <select
        v-if="multichain && chainInformation.chainId"
        @change="changeNetwork(chainInformation.chainId)"
        v-model="chainInformation.chainId"
      >
        <option v-for="id in networkIds" :value="id" :key="id">
          {{ chainDefinition[id].shortName }}
        </option>
      </select>
      <div v-else-if="chainInformation.shortName">
        <a class="btn btn-primary btn-sm mx-2">{{ chainInformation.shortName }}</a>
      </div>
    </div>
    <div class="d-inline-flex align-items-center">
      <a v-if="!connectedWallet" @click="initializeWallet" class="btn btn-primary btn-sm">Connect</a>
      <a v-else class="btn btn-primary btn-sm">{{ formatWalletAddress(connectedWallet) }}</a>
    </div>
  </div>
</template>
<script setup>
import { formatWalletAddress } from "../utils/helpers";
import { chainDefinition } from "../utils/blockchain";

const networkIds = [1, 56, 5, 43114];
const multichain = true;

const { chainInformation, connectedWallet, setWeb3Provider, setNetwork } = useWeb3WalletState();
const { $web3Modal, $swal } = useNuxtApp();
const cachedProvider = process.client ? localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER") : null;

if (cachedProvider) initializeWallet();

async function initializeWallet() {
  try {
    const provider = await $web3Modal.connect();
    setWeb3Provider(provider);
  } catch (error) {
    $swal.fire({
      title: "Error",
      text: error,
      icon: "error",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-danger btn-fill",
      },
    });
  }
}

async function changeNetwork(networkId) {
  if (networkId !== chainInformation.chainId) {
    await setNetwork(networkId);
  }
}
</script>
