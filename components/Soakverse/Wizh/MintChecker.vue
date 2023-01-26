<template>
  <div class="row text-left px-1 mt-4">
    <div class="col-12">
      <h3>Wizh Mint: Wallet Checker</h3>
      <p class="mb-0">You can mint one time <b>per whitelist</b> you were granted, for the amount of NFTs granted.</p>
      <p>Make sure to mint at the specified time to benefit from your rarity advantage.</p>
      <p style="font-weight: bold">Minting button will appear on this page when it is ready.</p>
      <hr />
      <div class="row" v-if="connectedWallet && chainInformation.chainId == '1'">
        <div class="col-12">
          <div class="row">
            <div class="col-12 col-md-6 col-lg-4 py-3">
              <h4>OG Mint</h4>
              <div v-if="state.ogWLcount > 0">
                <p style="color: green; font-weight: bold">You can mint: {{ state.ogWLcount }} at 12:00 EST</p>
              </div>
              <div v-else><p style="color: red; font-weight: bold">You are not included in this whitelist</p></div>
            </div>
            <div class="col-12 col-md-6 col-lg-4 py-3">
              <h4>Eggish 3/1 Mint</h4>
              <div v-if="state.eggzWhitelistCount > 0">
                <p style="color: green; font-weight: bold">You can mint: {{ state.eggzWhitelistCount }} at 13:00 EST</p>
              </div>
              <div v-else><p style="color: red; font-weight: bold">You are not included in this whitelist</p></div>
            </div>
            <div class="col-12 col-md-6 col-lg-4 py-3">
              <h4>Eggish 1/1 Mint</h4>
              <div v-if="state.eggzFCFSCount > 0">
                <p style="color: green; font-weight: bold">You can mint: {{ state.eggzFCFSCount }} at 14:00 EST</p>
              </div>
              <div v-else><p style="color: red; font-weight: bold">You are not included in this whitelist</p></div>
            </div>
            <div class="col-12 col-md-6 col-lg-4 py-3">
              <h4>Premium WL Mint</h4>
              <div v-if="state.premiumWhitelistCount > 0">
                <p style="color: green; font-weight: bold">
                  You can mint: {{ state.premiumWhitelistCount }} at 15:00 EST
                </p>
              </div>
              <div v-else><p style="color: red; font-weight: bold">You are not included in this whitelist</p></div>
            </div>
            <div class="col-12 col-md-6 col-lg-4 py-3">
              <h4>Standard WL Mint</h4>
              <div v-if="state.standardWhitelistCount > 0">
                <p style="color: green; font-weight: bold">
                  You can mint: {{ state.standardWhitelistCount }} at 16:00 EST
                </p>
              </div>
              <div v-else><p style="color: red; font-weight: bold">You are not included in this whitelist</p></div>
            </div>
            <div class="col-12 col-md-6 col-lg-4 py-3">
              <h4>Waitlist Mint</h4>
              <div v-if="state.waitlistCount > 0">
                <p style="color: green; font-weight: bold">You can mint: {{ state.waitlistCount }} at 17:00 EST</p>
              </div>
              <div v-else><p style="color: red; font-weight: bold">Waitlist not released yet</p></div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h6>Please connect your wallet on the Ethereum Mainnet</h6>
      </div>
    </div>
  </div>

  <div class="row text-center px-1 mt-4">
    <hr />
    <a
      href="https://soakmont.sppx.io/otp?utm_source=soakverse&utm_medium=banner&utm_campaign=madagascar1&utm_term=attention-crowdfund-investors&utm_content=banner1"
      target="_blank"
      ><img style="max-width: 800px" class="w-100 mx-auto" src="~/assets/img/soakmont_crowdfunding_2.gif"
    /></a>
  </div>
</template>

<script setup>
import ogWhitelist from "~/utils/wizh/ogWhitelist";
import eggzWhitelist from "~/utils/wizh/eggzWhitelist";
import eggzFCFS from "~/utils/wizh/eggzFCFS";
import premiumWhitelist from "~/utils/wizh/premiumWhitelist";
import standardWhitelist from "~/utils/wizh/standardWhitelist";
const { chainInformation, connectedWallet } = useWeb3WalletState();

const { $web3 } = useNuxtApp();

const state = reactive({
  ogWhitelistCount: 0,
  eggzWhitelistCount: 0,
  eggzFCFSCount: 0,
  premiumWhitelistCount: 0,
  standardWhitelistCount: 0,
  waitlistCount: 0,
  connectedWallet,
});

onMounted(async () => {
  try {
    const currentChainId = await $web3.eth.net.getId();
    if (process.client && connectedWallet && currentChainId == "1") {
      compileWhitelists();
    }
  } catch (e) {
    console.log(e.message);
  }
});

watch(connectedWallet, async () => {
  const currentChainId = await $web3.eth.net.getId();
  if (process.client && connectedWallet && currentChainId == "1") {
    compileWhitelists();
  }
});

watch(chainInformation, async () => {
  const currentChainId = await $web3.eth.net.getId();
  if (process.client && connectedWallet && currentChainId == "1") {
    compileWhitelists();
  }
});

function compileWhitelists() {
  if (connectedWallet) {
    ogWhitelist()[0].hasOwnProperty(state.connectedWallet)
      ? (state.ogWLcount = ogWhitelist()[0][state.connectedWallet])
      : (state.ogWLcount = 0);

    eggzWhitelist()[0].hasOwnProperty(state.connectedWallet)
      ? (state.eggzWhitelistCount = eggzWhitelist()[0][state.connectedWallet])
      : (state.eggzWhitelistCount = 0);

    eggzFCFS()[0].hasOwnProperty(state.connectedWallet)
      ? (state.eggzFCFSCount = eggzFCFS()[0][state.connectedWallet])
      : (state.eggzFCFSCount = 0);

    premiumWhitelist()[0].hasOwnProperty(state.connectedWallet)
      ? (state.premiumWhitelistCount = premiumWhitelist()[0][state.connectedWallet])
      : (state.premiumWhitelistCount = 0);

    standardWhitelist()[0].hasOwnProperty(state.connectedWallet)
      ? (state.standardWhitelistCount = standardWhitelist()[0][state.connectedWallet])
      : (state.standardWhitelistCount = 0);
  }
}
</script>

<style scoped lang="scss">
.red-text {
  color: red;
  font-size: 12px;
}

.green-text {
  color: green;
  font-size: 12px;
}
</style>
