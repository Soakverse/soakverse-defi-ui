<template>
  <div class="row text-left px-1 mt-4">
    <div class="col-12">
      <h5>
        <i class="fa-solid fa-award"></i> Eggz Pasture
        <i class="fa-solid fa-award"></i>
      </h5>
      <h5>Pasturage Count: {{ state.stakedAmount }}</h5>
      <div v-if="state.canStake">
        <a v-if="state.unstakedEggz.length > 0" @click="stakeAllNfts()" class="btn btn-success btn-sm mx-1"
          >Stake All</a
        >
        <!--<a v-if="state.stakedEggz.length > 0" @click="unstakeAllNfts()" class="btn btn-danger btn-sm mx-1"
          >Unstake All</a
        >-->
      </div>
      <hr />
      <div class="row" v-if="connectedWallet && chainInformation.chainId == '1'">
        <div class="col-12">
          <div class="row">
            <div v-if="state.highestOwnedStache" class="col-12 col-sm-6 col-md-3 col-lg-2 py-3">
              <h6>{{ state.highestOwnedStache.nft.metadata.name }}</h6>
              <a @click="comingSoon(1)" class="btn btn-success btn-sm mb-1">Change</a>
              <img
                :src="state.highestOwnedStache.nft.media[0].gateway"
                class="img-responsive w-100"
                style="border: 4px solid #e1b77e; border-radius: 4px"
              />
            </div>
            <div v-for="eggz in state.ownedEggz" :key="eggz.id" class="col-12 col-sm-6 col-md-3 col-lg-2 py-3">
              <h6>{{ eggz.name }}</h6>
              <a @click="comingSoon(2)" class="btn btn-success btn-sm mb-1">Add a Wizh</a>
              <img :src="eggz.webImage" class="img-responsive w-100" />
              <div v-if="state.canStake">
                <div v-if="state.stakedEggz.includes(eggz.tokenId)">
                  <a @click="unstakeNft(eggz.tokenId)" class="btn btn-danger btn-sm mt-1">Release</a>
                  <p class="green-text mt-1">
                    Training for {{ Math.trunc(formatDaysSinceDate(eggz.stakedAt)) }} day(s)
                  </p>
                </div>
                <a v-else @click="stakeNft(eggz.tokenId)" class="btn btn-success btn-sm">Stake</a>
              </div>
              <div v-else>
                <p class="red-text">Staking not activated yet</p>
              </div>
            </div>
            <div v-if="state.ownedEggz.length == 0"><h6 class="my-3">You own no Eggz.</h6></div>
          </div>
        </div>
      </div>
      <div v-else>
        <h6>Please connect your wallet on the Ethereum Mainnet</h6>
      </div>
    </div>
  </div>
</template>

<script setup>
import { showLoader, hideLoader, filterArrayOfObjects, formatDaysSinceDate } from "~~/utils/helpers";
import eggzABI from "@/assets/abi/EggzABI";

const { setNetwork, addNetwork, addAsset, chainInformation, connectedWallet } = useWeb3WalletState();

const config = useRuntimeConfig();

const { $web3, $swal } = useNuxtApp();

//const eggzContractAddress = "0x10b366bbF2304b52806B1c9881FC259bD9018d43";
const eggzContractAddress = "0x10b366bbf2304b52806b1c9881fc259bd9018d43";
const stachesContractAddress = "0x2019f1aa40528e632b4add3b8bcbc435dbf86404";

const nftLevels = [
  5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 4, 1, 2, 2, 1, 3, 3, 2, 1, 1, 5, 1, 2, 4, 1, 1, 1, 3, 2, 3, 5, 1, 3, 1, 2, 3, 1, 1,
  1, 4, 3, 3, 4, 1, 1, 1, 4, 1, 3, 1, 1, 1, 2, 2, 4, 4, 2, 1, 5, 2, 1, 4, 1, 2, 5, 2, 3, 2, 1, 2, 5, 1, 4, 4, 1, 2, 3,
  2, 3, 2, 2, 2, 3, 1, 1, 5, 4, 3, 2, 2, 2, 2, 1, 1, 1, 3, 1, 2, 3, 2, 1, 1, 3, 3, 4, 1, 1, 1, 5, 3, 3, 1, 1, 1, 2, 2,
  3, 2, 2, 1, 2, 1, 3, 1, 1, 4, 2, 3, 2, 2, 3, 5, 3, 2, 1, 1, 1, 4, 1, 3, 2, 3, 5, 1, 3, 1, 4, 3, 3, 2, 1, 3, 3, 1, 1,
  1, 1, 1, 2, 3, 3, 1, 1, 1, 1, 2, 3, 2, 5, 1, 1, 2, 3, 1, 1, 1, 1, 2, 5, 2, 1, 5, 1, 1, 1, 5, 3, 2, 3, 2, 2, 3, 2, 3,
  2, 2, 3, 1, 2, 1, 1, 4, 1, 1, 1, 3, 4, 4, 3, 2, 1, 1, 1, 3, 1, 4, 1, 3, 4, 1, 4, 1, 1, 3, 1, 2, 1, 5, 1, 1, 4, 2, 2,
  3, 2, 5, 3, 2, 5, 5, 1, 2, 2, 1, 1, 2, 2, 3, 3, 2, 2, 2, 4, 3, 3, 1, 2, 1, 1, 2, 2, 1, 3, 4, 3, 1, 2, 2, 2, 2, 2, 1,
  1, 1, 4, 1, 4, 1, 4, 1, 1, 1, 2, 3, 4, 4, 3, 1, 2, 3, 1, 1, 3, 1, 1, 4, 1, 3, 2, 2, 2, 2, 2, 3, 2, 2, 3, 1, 1, 1, 1,
  1, 1, 2, 2, 2, 1, 2, 2, 1, 2, 1, 2, 5, 2, 1, 1, 5, 1, 2, 2, 2, 5, 1, 3, 3, 2, 1, 2, 3, 3, 2, 2, 3, 3, 1, 3, 2, 1, 4,
  3, 2, 4, 2, 1, 2, 3, 2, 1, 3, 3, 4, 3, 1,
];

const decimals = 18;
let eggzContract = null;

const state = reactive({
  ownedStaches: [],
  ownedEggz: [],
  stakedEggz: [],
  unstakedEggz: [],
  highestOwnedStache: null,
  canStake: false,
  stakedAmount: 0,
});

onMounted(async () => {
  try {
    const currentChainId = await $web3.eth.net.getId();
    if (process.client && connectedWallet && currentChainId == "1") {
      eggzContract = await new $web3.eth.Contract(eggzABI.abi, eggzContractAddress);
      getEcosystemBalance();
    }
  } catch (e) {
    console.log(e.message);
  }
});

watch(connectedWallet, async () => {
  const currentChainId = await $web3.eth.net.getId();
  if (process.client && connectedWallet && currentChainId == "1") {
    eggzContract = await new $web3.eth.Contract(eggzABI.abi, eggzContractAddress);
    getEcosystemBalance();
  }
});

async function getEcosystemBalance() {
  const currentChainId = await $web3.eth.net.getId();
  if (process.client && connectedWallet && currentChainId == "1") {
    showLoader();
    state.canStake = await eggzContract.methods.canStake().call();
    state.ownedStaches = [];
    state.ownedEggz = [];
    state.highestOwnedStache = null;
    state.stakedAmount = (await $fetch(`${config.apiUrl}/nft/stats/eggz`)).staked;

    const accounts = await $web3.eth.getAccounts();

    const eggzUrl = `${config.apiUrl}/nft/eggz/address/${accounts[0]}`;

    const eggzList = await $fetch(eggzUrl);

    for (let nft of eggzList) {
      const tokenId = parseInt(nft.id.tokenId, 16);

      state.ownedEggz.push({
        id: nft.tokenId,
        tokenId: nft.tokenId,
        name: nft.name,
        staked: nft.staked,
        stakedAt: nft.stakedAt,
        webImage: nft.webImage,
        attributes: nft.attributes,
      });

      nft.staked ? state.stakedEggz.push(nft.tokenId) : state.unstakedEggz.push(nft.tokenId);
    }

    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${config.alchemyApiKey}`;
    const url = `${baseURL}/getNFTs/?owner=${accounts[0]}&contractAddresses[]=${stachesContractAddress}`;

    const staches = await $fetch(url);
    const nftList = staches["ownedNfts"];

    let highestOwnedStache = null;
    for (let nft of nftList) {
      const tokenId = parseInt(nft.id.tokenId, 16);
      const nftLevel = nftLevels[tokenId - 1];

      state.ownedStaches.push({
        id: nft.tokenId,
        level: nftLevel,
        nft: nft,
      });

      if (nftLevel > highestOwnedStache) {
        state.highestOwnedStache = {
          id: nft.tokenId,
          level: nftLevel,
          nft: nft,
        };
        highestOwnedStache = nftLevel;
      }
    }

    hideLoader();
  }
}

async function stakeNft(tokenId) {
  const singleOwnedEggz = filterArrayOfObjects(state.ownedEggz, tokenId);
  if (!singleOwnedEggz) {
    $swal.fire({
      title: "Error",
      text: "You don't own that Eggz",
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
      const ethUtils = $web3.utils;

      const gasPrice = await $web3.eth.getGasPrice();

      const adjustedGasPrice = new ethUtils.BN(gasPrice).add(new ethUtils.BN(190000000000)).toString();
      const gasLimit = await eggzContract.methods.stake(tokenId).estimateGas({
        from: account,
        gasPrice: adjustedGasPrice,
      });

      const stakingTransaction = await eggzContract.methods.stake(tokenId).send({ from: account, gasLimit: gasLimit });

      if (stakingTransaction.status) {
        state.stakedEggz.push(tokenId);
        state.unstakedEggz = state.unstakedEggz.filter((item) => item !== tokenId);
        hideLoader();
        $swal.fire({
          title: "Success",
          text: "Staking successful",
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

async function unstakeNft(tokenId) {
  const singleOwnedEggz = filterArrayOfObjects(state.ownedEggz, tokenId);
  if (!singleOwnedEggz) {
    $swal.fire({
      title: "Error",
      text: "You don't own that Eggz",
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
      const ethUtils = $web3.utils;

      const gasPrice = await $web3.eth.getGasPrice();

      const adjustedGasPrice = new ethUtils.BN(gasPrice).add(new ethUtils.BN(10000000000)).toString();
      const gasLimit = await eggzContract.methods.unstake(tokenId).estimateGas({
        from: account,
        gasPrice: adjustedGasPrice,
      });

      const stakingTransaction = await eggzContract.methods
        .unstake(tokenId)
        .send({ from: account, gasLimit: gasLimit });

      if (stakingTransaction.status) {
        state.unstakedEggz.push(tokenId);
        state.stakedEggz = state.stakedEggz.filter((item) => item !== tokenId);
        hideLoader();
        $swal.fire({
          title: "Success",
          text: "Unstaking successful",
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

async function stakeAllNfts() {
  const currentlyUnstakedEggz = state.unstakedEggz;
  if (!(currentlyUnstakedEggz.length > 0)) {
    $swal.fire({
      title: "Error",
      text: "You don't have Eggz to stake",
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
      const ethUtils = $web3.utils;

      const gasPrice = await $web3.eth.getGasPrice();

      const adjustedGasPrice = new ethUtils.BN(gasPrice).add(new ethUtils.BN(10000000000)).toString();
      const gasLimit = await eggzContract.methods.setTokensStakeStatus(state.unstakedEggz, true).estimateGas({
        from: account,
        gasPrice: adjustedGasPrice,
      });

      const stakingTransaction = await eggzContract.methods
        .setTokensStakeStatus(state.unstakedEggz, true)
        .send({ from: account, gasLimit: gasLimit });

      if (stakingTransaction.status) {
        state.stakedEggz = state.stakedEggz.concat(currentlyUnstakedEggz);
        state.unstakedEggz = [];
        hideLoader();
        $swal.fire({
          title: "Success",
          text: "Staking successful",
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

function comingSoon(id) {
  let text = "";
  if (id === 1) {
    text = "Assigning your hero OG is coming soon!";
  } else if (id === 2) {
    text = "Assigning a Wizh Stone to an Eggz is coming soon!";
  }
  $swal.fire({
    title: "Coming Soon!",
    text: text,
    icon: "warning",
    buttonsStyling: false,
    customClass: {
      confirmButton: "btn btn-danger btn-fill",
    },
  });
}

function convertWeiToEther(amount) {
  return $web3.utils.fromWei(new $web3.utils.BN(amount), "ether");
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
