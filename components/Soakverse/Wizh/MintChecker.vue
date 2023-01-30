<template>
  <div class="row text-left px-1 mt-4">
    <div class="col-12">
      <h3>Wizh Mint: Wallet Checker</h3>
      <p class="mb-0">You can mint one time <b>per whitelist</b> you were granted, for the amount of NFTs granted.</p>
      <p>Make sure to mint at the specified time to benefit from your rarity advantage.</p>
      <p style="font-weight: bold">Minting button will appear on this page when it is ready.</p>
      <hr />

      <div class="row" v-if="mintFinished">
        <div class="col-12">
          <h1>Mint finished</h1>
        </div>
      </div>
      <div class="row" v-else-if="connectedWallet && chainInformation.chainId == currentViewRequiredChainId">
        <div class="col-12">
          <div class="row">
            <div class="col-12 col-md-6 col-lg-4 py-3">
              <h4 class="mb-0">OG Mint</h4>
              <p class="mb-2">Minting: {{ state.ogMintTime.toLocaleTimeString() }} (Your timezone)</p>
              <div v-if="state.ogWLcount > 0">
                <p style="color: green; font-weight: bold">You can mint: {{ state.ogWLcount }} Wizh</p>
                <a v-if="state.ogMintTime < state.currentTime" class="btn btn-primary" @click="mint(1)">Mint</a>
                <a v-else class="btn btn-disabled" disabled>Not Minting Yet</a>
              </div>
              <div v-else><p style="color: red; font-weight: bold">You are not included in this whitelist</p></div>
            </div>
            <div class="col-12 col-md-6 col-lg-4 py-3">
              <h4 class="mb-0">Eggish 3/1 Mint</h4>
              <p class="mb-2">Minting: {{ state.eggz3MintTime.toLocaleTimeString() }} (Your timezone)</p>
              <div v-if="state.eggzWhitelistCount > 0">
                <p style="color: green; font-weight: bold">You can mint: {{ state.eggzWhitelistCount }} Wizh</p>
                <a v-if="state.eggz3MintTime < state.currentTime" class="btn btn-primary" @click="mint(2)">Mint</a>
                <a v-else class="btn btn-disabled" disabled>Not Minting Yet</a>
              </div>
              <div v-else><p style="color: red; font-weight: bold">You are not included in this whitelist</p></div>
            </div>
            <div class="col-12 col-md-6 col-lg-4 py-3">
              <h4 class="mb-0">Eggish 1/1 Mint</h4>
              <p class="mb-2">Minting: {{ state.eggz1MintTime.toLocaleTimeString() }} (Your timezone)</p>
              <div v-if="state.eggzFCFSCount > 0">
                <p style="color: green; font-weight: bold">You can mint: {{ state.eggzFCFSCount }}</p>
                <a v-if="state.eggz1MintTime < state.currentTime" class="btn btn-primary" @click="mint(3)">Mint</a>
                <a v-else class="btn btn-disabled" disabled>Not Minting Yet</a>
              </div>
              <div v-else><p style="color: red; font-weight: bold">You are not included in this whitelist</p></div>
            </div>
            <div class="col-12 col-md-6 col-lg-4 py-3">
              <h4 class="mb-0">Premium WL Mint</h4>
              <p class="mb-2">Minting: {{ state.premiumMintTime.toLocaleTimeString() }} (Your timezone)</p>
              <div v-if="state.premiumWhitelistCount > 0">
                <p style="color: green; font-weight: bold">You can mint: {{ state.premiumWhitelistCount }}</p>
                <a v-if="state.premiumMintTime < state.currentTime" class="btn btn-primary" @click="mint(4)">Mint</a>
                <a v-else class="btn btn-disabled" disabled>Not Minting Yet</a>
              </div>
              <div v-else><p style="color: red; font-weight: bold">You are not included in this whitelist</p></div>
            </div>
            <div class="col-12 col-md-6 col-lg-4 py-3">
              <h4 class="mb-0">Standard WL Mint</h4>
              <p class="mb-2">Minting: {{ state.standardMintTime.toLocaleTimeString() }} (Your timezone)</p>
              <div v-if="state.standardWhitelistCount > 0">
                <p style="color: green; font-weight: bold">You can mint: {{ state.standardWhitelistCount }}</p>
                <a v-if="state.standardMintTime < state.currentTime" class="btn btn-primary" @click="mint(5)">Mint</a>
                <a v-else class="btn btn-disabled" disabled>Not Minting Yet</a>
              </div>
              <div v-else><p style="color: red; font-weight: bold">You are not included in this whitelist</p></div>
            </div>
            <div class="col-12 col-md-6 col-lg-4 py-3">
              <h4 class="mb-0">Waitlist Mint</h4>
              <p class="mb-2">Minting: {{ state.waitlistMintTime.toLocaleTimeString() }} (Your timezone)</p>
              <div v-if="state.waitlistCount > 0">
                <p style="color: green; font-weight: bold">You can mint: {{ state.waitlistCount }}</p>
                <a v-if="state.waitlistMintTime < state.currentTime" class="btn btn-primary" @click="mint(6)">Mint</a>
                <a v-else class="btn btn-disabled" disabled>Not Minting Yet</a>
              </div>
              <div v-else><p style="color: red; font-weight: bold">You are not included in this Waitlist</p></div>
            </div>
            <hr />

            <div class="col-12 col-md-6 offset-md-3 offset-lg-4 col-lg-4 py-3">
              <h4 class="mb-0">Public Mint</h4>
              <p class="mb-2">Mint finished!</p>
              <div>
                <p style="color: green; font-weight: bold">You can mint: 1 Wizh</p>
                <a v-if="state.publicActivated" class="btn btn-primary" @click="mintPublic()">Mint</a>
                <a v-else class="btn btn-disabled" disabled>Not Minting Yet</a>
              </div>
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
import { Buffer } from "buffer";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import wizhNftAbi from "~/utils/abi/wizhNftAbi";
import ogWhitelist from "~/utils/wizh/ogWhitelist";
import eggzWhitelist from "~/utils/wizh/eggzWhitelist";
import eggzFCFS from "~/utils/wizh/eggzFCFS";
import premiumWhitelist from "~/utils/wizh/premiumWhitelist";
import standardWhitelist from "~/utils/wizh/standardWhitelist";
import waitlistWhitelist from "~/utils/wizh/waitlistWhitelist";
const { chainInformation, connectedWallet } = useWeb3WalletState();

const { $web3, $swal } = useNuxtApp();

const mintFinished = true;

const state = reactive({
  ogWhitelistCount: 0,
  eggzWhitelistCount: 0,
  eggzFCFSCount: 0,
  premiumWhitelistCount: 0,
  standardWhitelistCount: 0,
  waitlistCount: 0,
  publicActivated: true,
  connectedWallet,
  ogMintTime: new Date("January 25, 2023 17:00:00 UTC"),
  eggz3MintTime: new Date("January 26, 2023 18:00:00 UTC"),
  eggz1MintTime: new Date("January 26, 2023 19:00:00 UTC"),
  premiumMintTime: new Date("January 26, 2023 20:00:00 UTC"),
  standardMintTime: new Date("January 26, 2023 21:00:00 UTC"),
  waitlistMintTime: new Date("January 26, 2023 22:00:00 UTC"),
  currentTime: new Date(),
  interval: null,
});

let wizhContract = null;

// GOERLI
//const wizhContractAddress = "0xac65c17969a2a75d863599ca6327ea6457bc7f21";
//const currentViewRequiredChainId = 5;

// ETHEREUM
const wizhContractAddress = "0x72684a8CBb13183a8Bf407a468591B8306F61d99";
const currentViewRequiredChainId = 1;

onMounted(async () => {
  state.interval = setInterval(() => (state.currentTime = new Date()), 1000);
  try {
    const currentChainId = await $web3.eth.net.getId();
    if (process.client && connectedWallet && currentChainId == currentViewRequiredChainId) {
      wizhContract = await new $web3.eth.Contract(wizhNftAbi.abi, wizhContractAddress);
      compileWhitelists();
    }
  } catch (e) {
    console.log(e.message);
  }
});

onBeforeUnmount(() => {
  clearInterval(state.interval);
});

watch(connectedWallet, async () => {
  const currentChainId = await $web3.eth.net.getId();
  if (process.client && connectedWallet && currentChainId == currentViewRequiredChainId) {
    wizhContract = await new $web3.eth.Contract(wizhNftAbi.abi, wizhContractAddress);
    compileWhitelists();
  }
});

watch(chainInformation, async () => {
  const currentChainId = await $web3.eth.net.getId();
  if (process.client && connectedWallet && currentChainId == currentViewRequiredChainId) {
    wizhContract = await new $web3.eth.Contract(wizhNftAbi.abi, wizhContractAddress);
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

    waitlistWhitelist()[0].hasOwnProperty(state.connectedWallet)
      ? (state.waitlistCount = waitlistWhitelist()[0][state.connectedWallet])
      : (state.waitlistCount = 0);
  }
}

async function mintPublic() {
  try {
    const accounts = await $web3.eth.getAccounts();
    if (accounts.length > 0) {
      showLoader();
      const account = accounts[0];
      const ethUtils = $web3.utils;

      const gasPrice = await $web3.eth.getGasPrice();

      const adjustedGasPrice = new ethUtils.BN(gasPrice).add(new ethUtils.BN(12000000000)).toString();
      const gasLimit = await wizhContract.methods.mint().estimateGas({
        from: account,
        gasPrice: adjustedGasPrice,
      });
      const mintTransaction = await wizhContract.methods.mint().send({ from: account, gasLimit: gasLimit });

      if (mintTransaction.status) {
        hideLoader();
        $swal.fire({
          title: "Success",
          text: "Minting successful",
          icon: "success",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-success btn-fill",
          },
        });
      }
    }
  } catch (error) {
    var strippedError = error.message.split("{");
    hideLoader();
    $swal.fire({
      title: "Error",
      text: strippedError[0],
      icon: "error",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-danger btn-fill",
      },
    });
  }
}

async function mint(mintStep) {
  const mintQuantity = await getMintQuantity(mintStep);
  if (!mintQuantity > 0) {
    $swal.fire({
      title: "Error",
      text: "You cannot mint at this step",
      icon: "error",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-danger btn-fill",
      },
    });
    return;
  }
  try {
    const accounts = await $web3.eth.getAccounts();
    if (accounts.length > 0) {
      showLoader();
      const account = accounts[0];
      const mintTransaction = await onchainMintTransaction(mintStep, account, mintQuantity);

      if (mintTransaction.status) {
        hideLoader();
        $swal.fire({
          title: "Success",
          text: "Minting successful",
          icon: "success",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-success btn-fill",
          },
        });
      }
    }
  } catch (error) {
    var strippedError = error.message.split("{");
    hideLoader();
    $swal.fire({
      title: "Error",
      text: strippedError[0],
      icon: "error",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-danger btn-fill",
      },
    });
  }
}

async function onchainMintTransaction(mintStep, account, quantity) {
  const ethUtils = $web3.utils;

  const gasPrice = await $web3.eth.getGasPrice();

  const adjustedGasPrice = new ethUtils.BN(gasPrice).add(new ethUtils.BN(15000000000)).toString();

  let leaves = null;
  let merkleTree = null;
  let leaf = null;
  let hexProof = null;
  let gasLimit = null;

  switch (mintStep) {
    case 1:
      leaves = Object.entries(ogWhitelist()[0]).map((node) => hashNode(...node));
      merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      leaf = hashNode(account, quantity);
      hexProof = merkleTree.getHexProof(leaf);
      gasLimit = await wizhContract.methods.ogWhitelistMint(quantity, hexProof).estimateGas({
        from: account,
        gasPrice: adjustedGasPrice,
      });
      return await wizhContract.methods.ogWhitelistMint(quantity, hexProof).send({ from: account, gasLimit: gasLimit });
    case 2:
      leaves = Object.entries(eggzWhitelist()[0]).map((node) => hashNode(...node));
      merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      leaf = hashNode(account, quantity);
      hexProof = merkleTree.getHexProof(leaf);
      gasLimit = await wizhContract.methods.eggz3WhitelistMint(quantity, hexProof).estimateGas({
        from: account,
        gasPrice: adjustedGasPrice,
      });
      return await wizhContract.methods
        .eggz3WhitelistMint(quantity, hexProof)
        .send({ from: account, gasLimit: gasLimit });
    case 3:
      leaves = Object.entries(eggzFCFS()[0]).map((node) => hashNode(...node));
      merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      leaf = hashNode(account, quantity);
      hexProof = merkleTree.getHexProof(leaf);
      gasLimit = await wizhContract.methods.eggz1WhitelistMint(quantity, hexProof).estimateGas({
        from: account,
        gasPrice: adjustedGasPrice,
      });
      return await wizhContract.methods
        .eggz1WhitelistMint(quantity, hexProof)
        .send({ from: account, gasLimit: gasLimit });
    case 4:
      leaves = Object.entries(premiumWhitelist()[0]).map((node) => hashNode(...node));
      merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      leaf = hashNode(account, quantity);
      hexProof = merkleTree.getHexProof(leaf);
      gasLimit = await wizhContract.methods.premiumWhitelistMint(quantity, hexProof).estimateGas({
        from: account,
        gasPrice: adjustedGasPrice,
      });
      return await wizhContract.methods
        .premiumWhitelistMint(quantity, hexProof)
        .send({ from: account, gasLimit: gasLimit });
    case 5:
      leaves = Object.entries(standardWhitelist()[0]).map((node) => hashNode(...node));
      merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      leaf = hashNode(account, quantity);
      hexProof = merkleTree.getHexProof(leaf);
      gasLimit = await wizhContract.methods.standardWhitelistMint(quantity, hexProof).estimateGas({
        from: account,
        gasPrice: adjustedGasPrice,
      });
      return await wizhContract.methods
        .standardWhitelistMint(quantity, hexProof)
        .send({ from: account, gasLimit: gasLimit });
    case 6:
      leaves = Object.entries(waitlistWhitelist()[0]).map((node) => hashNode(...node));
      merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      leaf = hashNode(account, quantity);
      hexProof = merkleTree.getHexProof(leaf);
      gasLimit = await wizhContract.methods.waitlistWhitelistMint(quantity, hexProof).estimateGas({
        from: account,
        gasPrice: adjustedGasPrice,
      });
      return await wizhContract.methods
        .waitlistWhitelistMint(quantity, hexProof)
        .send({ from: account, gasLimit: gasLimit });
  }
}

async function getMintQuantity(mintStep) {
  switch (mintStep) {
    case 1:
      return state.ogWLcount;
    case 2:
      return state.eggzWhitelistCount;
    case 3:
      return state.eggzFCFSCount;
    case 4:
      return state.premiumWhitelistCount;
    case 5:
      return state.standardWhitelistCount;
    case 6:
      return state.waitlistCount;
  }
}

const hashNode = (account, quantity) => {
  return Buffer.from(
    $web3.utils
      .soliditySha3({ t: "address", v: $web3.utils.toChecksumAddress(account) }, { t: "uint256", v: quantity })
      .slice(2),
    "hex"
  );
};
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
