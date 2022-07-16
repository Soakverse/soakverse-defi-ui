<template>
  <div class="row text-left px-4 mt-4">
    <div class="col-12">
      <h5>{{ farm.farmName }}</h5>
      <hr />
      <div class="row">
        <h6>Pool Statistics</h6>
        <div class="col-12 col-sm-6 mb-2">
          <label>{{ farm.ticker }} price</label>
          <input
            class="form-control"
            :name="`${farm.id}_${farm.ticker}_price`"
            readonly
            disabled
            :value="`$${state.currentTokenPrice} USD`"
          />
        </div>
        <div class="col-12 col-sm-6 mb-2">
          <label>Current APR</label>
          <input
            class="form-control"
            :name="`${farm.id}_${farm.ticker}_apr`"
            readonly
            disabled
            value="TBD"
          />
        </div>
        <div class="col-12 col-sm-6 mb-2">
          <label>{{ farm.ticker }} Staked</label>
          <input
            class="form-control"
            :name="`${farm.id}_${farm.ticker}_stake_count`"
            readonly
            disabled
            :value="`${state.currentStakedCount} ${farm.ticker}`"
          />
        </div>
        <div class="col-12 col-sm-6 mb-2">
          <label>TVL Staked</label>
          <input
            class="form-control"
            :name="`${farm.id}_${farm.ticker}_tvl`"
            readonly
            disabled
            :value="`$${state.currentStakedTVL} USD`"
          />
        </div>
      </div>
      <hr class="mb-4 mt-3" />
      <div class="row" v-if="connectedWallet">
        <div class="col-12 col-md-6 mb-4">
          <div class="h-100 my-auto card grey no-shadow">
            <h6 class="fw-bold">Stake {{ farm.ticker }}</h6>
            <p>Balance: {{ state.tokenBalance }}</p>
            <label for="stake-input" class="mb-2 fw-bold"
              >Amount to be staked</label
            >
            <div class="btn-group mb-2" role="group" aria-label="Stake button">
              <button
                type="button"
                class="btn btn-primary"
                @click="setToBeStakedAmount(25)"
              >
                25%
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="setToBeStakedAmount(50)"
              >
                50%
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="setToBeStakedAmount(75)"
              >
                75%
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="setToBeStakedAmount(100)"
              >
                100%
              </button>
            </div>
            <input
              id="stake-input"
              v-model="state.toBeStaked"
              class="form-control"
            />
            <button
              class="btn btn-warning mt-2"
              disabled="disabled"
              v-if="
                state.toBeStaked > state.tokenBalance || state.toBeStaked == 0
              "
            >
              {{
                state.toBeStaked > state.tokenBalance
                  ? "Balance too low"
                  : "Enter an amount"
              }}
            </button>
            <button
              v-else-if="state.toBeStaked <= state.approvalLimit"
              type="button"
              class="btn btn-success mt-2"
              @click="stakeTokens()"
            >
              Stake
            </button>
            <div v-else class="mb-2 d-flex flex-row">
              <button
                @click="approveContract()"
                type="button"
                class="btn btn-success mt-2 flex-fill me-1"
              >
                Approve
              </button>
              <button
                type="button"
                class="btn btn-success mt-2 flex-fill ms-1"
                @click="approveContract(true)"
              >
                Approve max
              </button>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 mb-4">
          <div
            v-if="state.stakingUserInfo.amount == 0"
            class="d-flex h-100 text-center card grey no-shadow"
          >
            <div class="my-auto">
              <h3>Staked {{ farm.ticker }}</h3>
              <h4>Not staked</h4>
            </div>
          </div>
          <div v-else class="my-auto h-100 card grey no-shadow">
            <h6 class="fw-bold">Unstake {{ farm.ticker }}</h6>
            <p>
              Your Stake: {{ convertWeiToEther(state.stakingUserInfo.amount) }}
            </p>
            <label for="stake-input" class="mb-2 fw-bold"
              >Amount to be unstaked</label
            >
            <div class="btn-group mb-2" role="group" aria-label="Stake button">
              <button
                type="button"
                class="btn btn-primary"
                @click="setToBeUnstakedAmount(25)"
              >
                25%
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="setToBeUnstakedAmount(50)"
              >
                50%
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="setToBeUnstakedAmount(75)"
              >
                75%
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="setToBeUnstakedAmount(100)"
              >
                100%
              </button>
            </div>
            <input
              id="stake-input"
              v-model="state.toBeUnstaked"
              class="form-control"
            />
            <button
              class="btn btn-warning mt-2"
              disabled="disabled"
              v-if="
                state.toBeUnstaked > state.stakingUserInfo.amount ||
                state.toBeUnstaked == 0
              "
            >
              {{
                state.toBeUnstaked > state.stakingUserInfo.amount
                  ? "Balance too low"
                  : "Enter an amount"
              }}
            </button>
            <button
              v-else-if="state.toBeStaked <= state.approvalLimit"
              type="button"
              class="btn btn-success mt-2"
              @click="unstakeTokens()"
            >
              Unstake
            </button>
            <div v-else class="mb-2 d-flex flex-row">
              <button
                @click="approveContract()"
                type="button"
                class="btn btn-success mt-2 flex-fill me-1"
              >
                Approve
              </button>
              <button
                type="button"
                class="btn btn-success mt-2 flex-fill ms-1"
                @click="approveContract(true)"
              >
                Approve max
              </button>
            </div>
            <p class="mt-2" style="color: red">
              Unstaking tokens in the first 30 days of staking will tax the
              withdrawal for 10%.
            </p>
          </div>
        </div>
        <div class="col-12 col-md-12 mb-4">
          <div
            v-if="!(state.stakingUserInfo.amount == 0)"
            class="d-flex h-100 text-center card grey no-shadow"
          >
            <p>Your pending rewards: 0 $SKMT</p>
          </div>
        </div>
      </div>
      <div v-else>
        <h6>Please connect your wallet</h6>
      </div>
    </div>
  </div>
</template>

<script setup>
import soakmontAbi from "~~/utils/abi/soakmontToken";
import soakmontStakingContractAbi from "~~/utils/abi/soakmontStakingContract";
import { showLoader, hideLoader } from "~~/utils/helpers";
const { $web3, $swal } = useNuxtApp();

const { connectedWallet } = useWeb3WalletState();
const props = defineProps({
  farm: {
    required: true,
    type: [Object],
    farmName: {
      type: String,
    },
    tokenName: {
      type: String,
    },
    ticker: {
      type: String,
    },
    cgId: {
      type: String,
      required: true,
    },
    contracts: {
      type: Object,
    },
  },
});

const tokenContractAddress = "0x1B2fdB1626285B94782af2Fda8e270E95cEbC3b4";
const stakingContractAddress = "0xF5Da615989DadbD552E3479d79e8e7f34EcA9832";
const decimals = 18;

const state = reactive({
  currentStakedCount: 0,
  currentStakedTVL: 0,
  currentTokenPrice: 0,
  tokenBalance: 0,
  toBeStaked: 0,
  toBeUnstaked: 0,
  approvalLimit: 0,
  stakingUserInfo: {},
});

const {
  data: tokenPrice,
  tokenPricePending,
  refresh,
  error,
} = await useLazyFetch(
  `https://api.coingecko.com/api/v3/simple/price?ids=soakmont&vs_currencies=usd`
);

const tokenContract = await new $web3.eth.Contract(
  soakmontAbi.abi,
  tokenContractAddress
);

const stakingContract = await new $web3.eth.Contract(
  soakmontStakingContractAbi.abi,
  stakingContractAddress
);

onMounted(async () => {
  getTokenBalance();
});

watch(connectedWallet, () => {
  getTokenBalance();
});

watch(tokenPrice, (newValue) => {
  if (newValue.soakmont) {
    state.currentTokenPrice = newValue.soakmont.usd;
    calculateStakedInfos();
  }
});

function calculateStakedInfos() {
  state.currentStakedTVL =
    Math.round(state.currentStakedCount * state.currentTokenPrice * 100) / 100;
}

async function getTokenBalance() {
  if (process.client) {
    const accounts = await $web3.eth.getAccounts();

    const weiTokenBalance = await tokenContract.methods
      .balanceOf(accounts[0])
      .call();

    state.tokenBalance = parseFloat(
      await $web3.utils.fromWei(weiTokenBalance, "ether"),
      8
    );

    const weiApprovalLimit = await tokenContract.methods
      .allowance(accounts[0], stakingContractAddress)
      .call();

    state.approvalLimit = parseFloat(
      await $web3.utils.fromWei(weiApprovalLimit, "ether"),
      8
    );

    state.stakingUserInfo = await stakingContract.methods
      .userInfo(accounts[0])
      .call();

    const weiTotalStakedAmount = await tokenContract.methods
      .balanceOf(stakingContractAddress)
      .call();

    state.currentStakedCount = parseFloat(
      await $web3.utils.fromWei(weiTotalStakedAmount, "ether"),
      8
    );

    calculateStakedInfos();
  }
}

function setToBeStakedAmount(percentage) {
  state.toBeStaked = parseFloat((state.tokenBalance * percentage) / 100);
}

function setToBeUnstakedAmount(percentage) {
  state.toBeUnstaked = parseFloat(
    (convertWeiToEther(state.stakingUserInfo.amount) * percentage) / 100
  );
}

async function approveContract(max = false) {
  if (!state.toBeStaked > 0) {
    alert("Please enter a number");
    return;
  }
  try {
    const accounts = await $web3.eth.getAccounts();
    if (accounts.length > 0) {
      showLoader();
      const account = accounts[0];
      const ethUtils = $web3.utils;
      const amountToApprove = await $web3.utils.toWei(
        max
          ? new ethUtils.BN("100000000000")
          : new ethUtils.BN(state.toBeStaked + 1),
        "ether"
      );
      const weiApprovalLimit = await tokenContract.methods
        .approve(stakingContractAddress, new ethUtils.BN(amountToApprove))
        .send({ from: account });
      if (weiApprovalLimit.status) {
        state.approvalLimit = amountToApprove;
        hideLoader();
        $swal.fire({
          title: "Success",
          text: "Amount approved",
          icon: "success",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-success btn-fill",
          },
        });
      }
    }
  } catch (error) {
    hideLoader();
    $swal.fire({
      title: "Error",
      text: error.message,
      icon: "error",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-danger btn-fill",
      },
    });
  }
}

async function stakeTokens() {
  if (!state.toBeStaked > 0) {
    alert("Please enter a number");
    return;
  }
  try {
    const accounts = await $web3.eth.getAccounts();
    if (accounts.length > 0) {
      showLoader();
      const account = accounts[0];
      const ethUtils = $web3.utils;
      const amountToStake = await $web3.utils.toWei(
        new ethUtils.BN(state.toBeStaked),
        "ether"
      );
      const stakingTransaction = await stakingContract.methods
        .stake(new ethUtils.BN(amountToStake))
        .send({ from: account });
      if (stakingTransaction.status) {
        state.toBeStaked = 0;
        await getTokenBalance();
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
    hideLoader();
    $swal.fire({
      title: "Error",
      text: error.message,
      icon: "error",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-danger btn-fill",
      },
    });
  }
}

async function unstakeTokens() {
  if (!state.toBeUnstaked > 0) {
    alert("Please enter a number");
    return;
  }
  try {
    const accounts = await $web3.eth.getAccounts();
    if (accounts.length > 0) {
      showLoader();
      const account = accounts[0];
      const ethUtils = $web3.utils;
      const amountToUnstake = await $web3.utils.toWei(
        new ethUtils.BN(state.toBeUnstaked + 1),
        "ether"
      );
      const stakingTransaction = await stakingContract.methods
        .unstake(new ethUtils.BN(amountToUnstake))
        .send({ from: account });
      if (stakingTransaction.status) {
        state.toBeUnstaked = 0;
        await getTokenBalance();
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
    hideLoader();
    $swal.fire({
      title: "Error",
      text: error.message,
      icon: "error",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-danger btn-fill",
      },
    });
  }
}

function convertWeiToEther(amount) {
  return $web3.utils.fromWei(new $web3.utils.BN(amount), "ether");
}
</script>
