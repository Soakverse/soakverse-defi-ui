<template>
  <div class="row">
    <h4>Networks</h4>
    <h6 v-if="currentAccount && chainInformation">
      Connected to: {{ chainInformation.name }}
    </h6>
    <div class="accordion text-start" id="blockchainNetworkAccordion">
      <div
        class="accordion-item"
        v-for="(network, index) in blockchainDefinitions"
        :key="network.chainId"
      >
        <h2 class="accordion-header" :id="`heading${index}`">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#collapse${index}`"
            aria-expanded="true"
            :aria-controls="`#collapse${index}`"
          >
            <b>{{ network.networkFullName }}</b>
          </button>
        </h2>
        <div
          :id="`collapse${index}`"
          class="accordion-collapse collapse"
          :aria-labelledby="`heading${index}`"
          data-bs-parent="#blockchainNetworkAccordion"
        >
          <div class="accordion-body">
            <p class="mb-0"><b>Network Name:</b> {{ network.name }}</p>
            <p class="mb-0"><b>Chain ID:</b> {{ network.chainId }}</p>
            <p class="mb-0"><b>Symbol:</b> {{ network.currencySymbol }}</p>
            <p class="mb-0">
              <b>Block Explorer: </b>
              <a href="{{network.blockExplorerUrl}}" target="_new">{{
                network.blockExplorerUrl
              }}</a>
            </p>
            <p><b>RPC:</b> {{ network.rpcUrl }}</p>
            <div v-if="currentAccount">
              <hr />
              <div v-if="currentChain == network.chainId">
                <h6>{{ network.name }} Tools</h6>
                <div
                  class="my-2"
                  v-for="asset in assetsDefinition[network.chainId]"
                >
                  <a
                    class="btn btn-secondary"
                    @click="addAsset(network.chainId, asset.symbol)"
                  >
                    Add {{ asset.name }} ({{ asset.symbol }}) to wallet
                  </a>
                </div>
              </div>
              <div v-else>
                <a class="btn btn-primary" @click="setNetwork(network.chainId)"
                  >Switch to {{ network.name }}</a
                >
              </div>
            </div>
            <div v-else>
              <h6>Please connect wallet for blockchain tools</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
button:focus,
button:active,
.accordion-button:focus {
  outline: 0;
  background-color: #e7f1ff;
  box-shadow: inset 0 -1px 0 rgb(0 0 0 / 13%);
}

.accordion-body {
  word-break: break-all;
}
</style>

<script setup>
import { blockchainDefinitions, assetsDefinition } from "~/utils/blockchain";
import { switchChain, getWalletClient } from "@wagmi/core";

const { currentAccount, currentChain } = useWeb3WalletState();
const { $wagmiConfig } = useNuxtApp();

const chainInformation = computed(() =>
  currentChain.value ? blockchainDefinitions[String(currentChain.value)] : null
);

async function setNetwork(chainId) {
  try {
    await switchChain($wagmiConfig, { chainId });
  } catch (err) {
    console.error("[BlockchainTools] switchChain failed", err);
  }
}

async function addAsset(chainId, symbol) {
  const asset = assetsDefinition[String(chainId)]?.[symbol];
  if (!asset) return;
  try {
    const walletClient = await getWalletClient($wagmiConfig, { chainId });
    await walletClient.watchAsset({
      type: "ERC20",
      options: {
        address: asset.address,
        symbol: asset.symbol,
        decimals: asset.decimals,
        image: asset.image ?? undefined,
      },
    });
  } catch (err) {
    console.error("[BlockchainTools] watchAsset failed", err);
  }
}
</script>
