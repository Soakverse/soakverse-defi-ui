<template>
  <div class="row text-left px-1 mt-4">
    <div class="col-12">
      <h5>
        <i class="fa-solid fa-award"></i> Soakverse Loyalty Program
        <i class="fa-solid fa-award"></i>
      </h5>
      <hr />
      <div class="row" v-if="currentAccount && currentChain == '56'">
        <div class="col-12">
          <p class="my-0">
            <b>Staked $SKMT:</b>
            {{ convertWeiToEther(state.stakingUserInfo) }}
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
              <p>Get Soakverse OGs on OpenSea</p>
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
import {
  soakmontStakingContract,
  soakverseOGsSmartContract,
} from "~~/utils/contracts";
import ProgressBar from "~~/components/Loyalty/ProgressBar.vue";
import { showLoader, hideLoader } from "~~/utils/helpers";
import { readContract } from "@wagmi/core";
import { formatEther } from "viem";
const config = useRuntimeConfig();

const { currentAccount, currentChain } = useWeb3WalletState();

const nftLevels = [
  5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 4, 1, 2, 2, 1, 3, 3, 2, 1, 1, 5, 1, 2, 4, 1,
  1, 1, 3, 2, 3, 5, 1, 3, 1, 2, 3, 1, 1, 1, 4, 3, 3, 4, 1, 1, 1, 4, 1, 3, 1, 1,
  1, 2, 2, 4, 4, 2, 1, 5, 2, 1, 4, 1, 2, 5, 2, 3, 2, 1, 2, 5, 1, 4, 4, 1, 2, 3,
  2, 3, 2, 2, 2, 3, 1, 1, 5, 4, 3, 2, 2, 2, 2, 1, 1, 1, 3, 1, 2, 3, 2, 1, 1, 3,
  3, 4, 1, 1, 1, 5, 3, 3, 1, 1, 1, 2, 2, 3, 2, 2, 1, 2, 1, 3, 1, 1, 4, 2, 3, 2,
  2, 3, 5, 3, 2, 1, 1, 1, 4, 1, 3, 2, 3, 5, 1, 3, 1, 4, 3, 3, 2, 1, 3, 3, 1, 1,
  1, 1, 1, 2, 3, 3, 1, 1, 1, 1, 2, 3, 2, 5, 1, 1, 2, 3, 1, 1, 1, 1, 2, 5, 2, 1,
  5, 1, 1, 1, 5, 3, 2, 3, 2, 2, 3, 2, 3, 2, 2, 3, 1, 2, 1, 1, 4, 1, 1, 1, 3, 4,
  4, 3, 2, 1, 1, 1, 3, 1, 4, 1, 3, 4, 1, 4, 1, 1, 3, 1, 2, 1, 5, 1, 1, 4, 2, 2,
  3, 2, 5, 3, 2, 5, 5, 1, 2, 2, 1, 1, 2, 2, 3, 3, 2, 2, 2, 4, 3, 3, 1, 2, 1, 1,
  2, 2, 1, 3, 4, 3, 1, 2, 2, 2, 2, 2, 1, 1, 1, 4, 1, 4, 1, 4, 1, 1, 1, 2, 3, 4,
  4, 3, 1, 2, 3, 1, 1, 3, 1, 1, 4, 1, 3, 2, 2, 2, 2, 2, 3, 2, 2, 3, 1, 1, 1, 1,
  1, 1, 2, 2, 2, 1, 2, 2, 1, 2, 1, 2, 5, 2, 1, 1, 5, 1, 2, 2, 2, 5, 1, 3, 3, 2,
  1, 2, 3, 3, 2, 2, 3, 3, 1, 3, 2, 1, 4, 3, 2, 4, 2, 1, 2, 3, 2, 1, 3, 3, 4, 3,
  1,
];

const decimals = 18;

const state = reactive({
  currentAccount: currentAccount,
  currentChain: currentChain,
  stakingUserInfo: null,
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
      label: "Owns 5 or more Soakverse OGs: +1 level",
      checked: false,
    },
    {
      id: 5,
      label: "Owns 10 or more Soakverse OGs: +1 level",
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
  "Congrats! On nothing.. but at least you are here.",
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
  getEcosystemBalance();
});

watch(currentAccount, () => {
  getEcosystemBalance();
});

watch(currentChain, () => {
  getEcosystemBalance();
});

async function getEcosystemBalance() {
  if (process.client && currentAccount.value && currentChain.value == "56") {
    showLoader();
    state.ownedStaches = [];
    state.stakingUserInfo = null;
    state.highestOwnedStache = null;

    state.stakingUserInfo = (
      await readContract({
        address: soakmontStakingContract.address,
        abi: soakmontStakingContract.abi,
        functionName: "userInfo",
        args: [state.currentAccount],
      })
    )[0];

    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${config.alchemyApiKey}`;
    const url = `${baseURL}/getNFTs/?owner=${state.currentAccount}&contractAddresses[]=${soakverseOGsSmartContract.address}`;

    var requestOptions = {
      method: "get",
      redirect: "follow",
    };

    const nfts = await $fetch(url);

    const nftList = nfts["ownedNfts"];

    let highestOwnedStache = null;
    for (let nft of nftList) {
      const tokenId = parseInt(nft.id.tokenId, 16);
      const nftLevel = nftLevels[tokenId - 1];
      state.ownedStaches.push({
        id: nft.tokenId,
        level: nftLevel,
      });

      if (nftLevel > highestOwnedStache) highestOwnedStache = nftLevel;
    }

    state.highestOwnedStache = highestOwnedStache;
    calculateCurrentLoyaltyLevel();
    hideLoader();
  }
}

async function calculateCurrentLoyaltyLevel() {
  const nftCount = state.ownedStaches.length;
  const highestLevel = state.highestOwnedStache;
  const stakedSKMT = state.stakingUserInfo;
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
  } else if (nftCount >= 5) {
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
  return amount ? formatEther(amount) : 0;
}
</script>

<style scoped lang="scss">
ul.checked-list {
  max-width: 500px;
  margin: 0 auto;
  padding: 0px;
}

ul.checked-list li {
  list-style-type: none;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 16px;
}

@media all and (max-width: 767px) {
  ul.checked-list li {
    text-align: left;
    font-size: 14px;
  }
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
      max-width: 100%;
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
