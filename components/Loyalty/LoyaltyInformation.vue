<template>
  <div class="row text-left px-1 mt-4">
    <div class="col-12">
      <h5>
        <i class="fa-solid fa-award"></i> Soakmont Loyalty Program
        <i class="fa-solid fa-award"></i>
      </h5>
      <hr />
      <div
        class="row"
        v-if="connectedWallet && chainInformation.chainId == '56'"
      >
        <div class="col-12">
          <p class="my-0">
            <b>Staked $SKMT:</b>
            {{ convertWeiToEther(state.stakingUserInfo.amount) }}
          </p>
          <p class="my-0">
            <b>Soakverse OGs count:</b> {{ state.ownedStaches.length }}
          </p>
          <p class="mb-4">
            <b>Soakverse OGs Highest level:</b> {{ state.highestOwnedStache }}
          </p>

          <h5>{{ levelFunnyLabel[state.currentLoyaltyLevel] }}</h5>
          <ProgressBar
            :value="state.currentLoyaltyLevel"
            :maxValue="10"
            label="Level"
          />
          <ul class="mt-4 checked-list">
            <li class="mb-2" v-for="step in state.checkedSteps" :key="step.id">
              <span :style="{ color: step.checked == true ? 'green' : 'red' }">
                <i
                  class="fas"
                  :class="
                    step.checked == true ? 'fa-check-circle' : 'fa-circle-xmark'
                  "
                ></i>
                {{ step.label }}
              </span>
            </li>
          </ul>
        </div>
        <div class="col-12">
          <hr />
          <h4>Want to increase your level?</h4>
        </div>
        <div class="col-12 col-lg-6 social-card">
          <a
            target="_blank"
            href="https://pancakeswap.finance/swap?outputCurrency=0x1b2fdb1626285b94782af2fda8e270e95cebc3b4"
            class="social-holder w-100"
            style="background-color: #06262d"
          >
            <div class="m-auto">
              <img
                class="icon"
                src="@/assets/img/pancakeswap.png"
                alt="Pancake Swap Logo White"
              />
              <p>Get $SKMT on PancakeSwap</p>
            </div>
          </a>
        </div>
        <div class="col-12 col-lg-6 social-card">
          <a
            target="_blank"
            href="https://opensea.io/collection/soakverse-ogs"
            class="social-holder w-100"
            style="background-color: #06262d"
          >
            <div class="m-auto">
              <img
                class="icon"
                src="@/assets/img/opensea-white.png"
                alt="Open Sea Logo"
              />
              <p>Get Soakverse OGs on Open Sea</p>
            </div>
          </a>
        </div>
        <div class="col-12">
          <hr />
          <h4>Wait!? What is this?</h4>
          <h5>The world will soon know</h5>
        </div>
      </div>
      <div v-else>
        <h6>Please connect your wallet on the Binance Smart Chain</h6>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Alchemy, Network } from "alchemy-sdk";
import soakmontAbi from "~~/utils/abi/soakmontToken";
import soakmontStakingContractAbi from "~~/utils/abi/soakmontStakingContract";
import ProgressBar from "~~/components/Loyalty/ProgressBar.vue";
import { showLoader, hideLoader } from "~~/utils/helpers";
const config = useRuntimeConfig();

const alchemyConfig = {
  apiKey: config.alchemyApiKey,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

const { $web3 } = useNuxtApp();

const { connectedWallet, chainInformation } = useWeb3WalletState();

const tokenContractAddress = "0x1B2fdB1626285B94782af2Fda8e270E95cEbC3b4";
const stakingContractAddress = "0xF5Da615989DadbD552E3479d79e8e7f34EcA9832";
const stachesContractAddress = "0x2019f1aa40528e632b4add3b8bcbc435dbf86404";

const nftLevels = [
  5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 4, 1, 2, 2, 1, 3, 3, 2, 1, 1, 5, 1, 2, 4, 1,
  1, 1, 3, 2, 3, 5, 1, 3, 1, 2, 3, 1, 1, 1, 4, 3, 3, 4, 1, 1, 1, 4, 1, 3, 1, 1,
  1, 2, 2, 4, 4, 2, 1, 5, 2, 1, 4, 1, 2, 5, 2, 3, 2, 1, 2, 5, 1, 4, 4, 1, 2, 3,
  2, 3, 2, 2, 2, 3, 1, 1, 5, 4, 3, 2, 2, 2, 2, 1, 1, 1, 3, 1, 2, 3, 2, 1, 1, 3,
  3, 4, 1, 1, 1, 5, 3, 3, 1, 1, 1, 2, 2, 3, 2, 2, 1, 2, 1, 3, 1, 1, 4, 2, 3, 2,
  2, 3, 5, 3, 2, 1, 1, 1, 4, 1, 3, 2, 3, 5, 1, 3, 1, 4, 3, 3, 2, 1, 3, 3, 1, 1,
  1, 1, 1, 2, 3, 3, 1, 1, 1, 1, 2, 3, 2, 5, 1, 1, 2, 3, 1, 1, 1, 1, 2, 5, 2, 1,
  5, 1, 1, 1, 5, 3, 2, 3, 2, 2, 3, 2, 3, 2, 2, 3, 1, 2,
];

const decimals = 18;
let tokenContract = null;
let stakingContract = null;

const state = reactive({
  stakingUserInfo: {},
  ownedStaches: [],
  highestOwnedStache: null,
  currentLoyaltyLevel: 0,
  checkedSteps: [
    {
      id: 1,
      label: "Soakverse OGs Level 1, 2 or 3: +3 levels",
      checked: false,
    },
    {
      id: 2,
      label: "Soakverse OGs Level 4: +1 level",
      checked: false,
    },
    {
      id: 3,
      label: "Soakverse OGs Level 5: +1 level",
      checked: false,
    },
    {
      id: 4,
      label: "Owns more than 5 Soakverse OGs: +1 level",
      checked: false,
    },
    {
      id: 5,
      label: "Owns more than 10 Soakverse OGs: +1 level",
      checked: false,
    },
    {
      id: 6,
      label: "Staked more than 10m $SKMT: +1 level",
      checked: false,
    },
    {
      id: 7,
      label: "Staked more than 100m $SKMT: +1 level",
      checked: false,
    },
    {
      id: 8,
      label: "Staked more than 500m $SKMT: +1 level",
      checked: false,
    },
  ],
});

const levelFunnyLabel = [
  "Congrats! On nothing.. but at least your here.",
  "That’s a good start.. but there’s like 9 more to go.",
  "Lots of great things happen with the number 2… Not in this case.",
  "Three is a crowd, you should try to just go to 4.",
  "You’re like not even halfway there. At least you made it this far!",
  "Now you're only half empty, time to fill up the rest!",
  "Hey! Over halfway now! But no one likes the number 6.. it's evil.",
  "Look at you! You must be an OG… wanna sell me your OG NFT?",
  "Great! But it ain't 10... slacker.",
  "Seriously?… just go for 10. Congrats though!",
  "You are a true OG, the master of masters. You invented diamond hands. Congrats on being at the top... Now go touch some grass and get outta yo mama's basement.. Nerd.",
];

onMounted(async () => {
  tokenContract = await new $web3.eth.Contract(
    soakmontAbi.abi,
    tokenContractAddress
  );

  stakingContract = await new $web3.eth.Contract(
    soakmontStakingContractAbi.abi,
    stakingContractAddress
  );
  getEcosystemBalance();
});

watch(connectedWallet, () => {
  getEcosystemBalance();
});

async function getEcosystemBalance() {
  showLoader();
  if (process.client) {
    state.ownedStaches = [];
    state.stakingUserInfo = {};
    state.highestOwnedStache = null;

    const accounts = await $web3.eth.getAccounts();

    state.stakingUserInfo = await stakingContract.methods
      .userInfo(accounts[0])
      .call();

    const nfts = await alchemy.nft.getNftsForOwner(accounts[0], {
      contractAddresses: [stachesContractAddress],
    });

    const nftList = nfts["ownedNfts"];

    let highestOwnedStache = null;
    for (let nft of nftList) {
      const nftLevel = nftLevels[nft.tokenId - 1];
      state.ownedStaches.push({
        id: nft.tokenId,
        level: nftLevel,
      });

      if (nftLevel > highestOwnedStache) highestOwnedStache = nftLevel;
    }

    state.highestOwnedStache = highestOwnedStache;
    calculateCurrentLoyaltyLevel();
  }
  hideLoader();
}

async function calculateCurrentLoyaltyLevel() {
  const nftCount = state.ownedStaches.length;
  const highestLevel = state.highestOwnedStache;
  const stakedSKMT = state.stakingUserInfo.amount;
  let level = 0;

  for (let step of state.checkedSteps) {
    step.checked = false;
  }

  if (nftCount > 0 && highestLevel <= 3) {
    level = level + 3;
    state.checkedSteps[0].checked = true;
  } else if (highestLevel == 4) {
    level = level + 4;
    state.checkedSteps[0].checked = true;
    state.checkedSteps[1].checked = true;
  } else if (highestLevel == 5) {
    level = level + 5;
    state.checkedSteps[0].checked = true;
    state.checkedSteps[1].checked = true;
    state.checkedSteps[2].checked = true;
  }

  if (nftCount >= 10) {
    level = level + 2;
    state.checkedSteps[3].checked = true;
    state.checkedSteps[4].checked = true;
  } else if (highestLevel >= 5) {
    level = level + 1;
    state.checkedSteps[3].checked = true;
  }

  if (convertWeiToEther(stakedSKMT) >= 500000000) {
    level = level + 3;
    state.checkedSteps[5].checked = true;
    state.checkedSteps[6].checked = true;
    state.checkedSteps[7].checked = true;
  } else if (convertWeiToEther(stakedSKMT) >= 100000000) {
    level = level + 2;
    state.checkedSteps[5].checked = true;
    state.checkedSteps[6].checked = true;
  } else if (convertWeiToEther(stakedSKMT) >= 10000000) {
    level = level + 1;
    state.checkedSteps[5].checked = true;
  }

  state.currentLoyaltyLevel = level;
}

function convertWeiToEther(amount) {
  return $web3.utils.fromWei(new $web3.utils.BN(amount), "ether");
}
</script>

<style scoped lang="scss">
ul.checked-list {
  max-width: 500px;
  margin: 0 auto;
}

ul.checked-list li {
  list-style-type: none;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 16px;
}

.social-card {
  padding: 8px;
  a.social-holder {
    display: flex;
    padding: 20px;
    border-radius: 8px;
    opacity: 0.7;
    .icon {
      max-height: 40px;
    }
    p {
      margin: 0;
      padding: 0;
      margin-top: 10px;
      font-size: 16px;
      font-weight: 500;
      color: white;
    }
    &:hover {
      opacity: 1;
    }
  }
}
</style>
