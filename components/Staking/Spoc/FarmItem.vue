<template>
  <div class="row text-left px-1 mt-4" v-if="currentChain == '56'">
    <div class="col-12">
      <h5>{{ farm.farmName }}</h5>
      <hr />
      <div class="row">
        <h6>Pool Statistics</h6>
        <div class="col-12 col-sm-6 mb-2">
          <label>{{ farm.ticker }} Staked</label>
          <input
            class="form-control"
            :name="`${farm.id}_${farm.ticker}_stake_count`"
            readonly
            disabled
            :value="`${state.currentStakedCount.toFixed(0)} ${farm.ticker}`"
          />
        </div>
        <div class="col-12 col-sm-6 mb-2">
          <label>Current APR</label>
          <input
            class="form-control"
            :name="`${farm.id}_${farm.ticker}_apr`"
            readonly
            disabled
            value="No APR, based on ecosystem activity"
          />
        </div>
      </div>
      <hr class="mb-4 mt-3" />
      <div class="row" v-if="currentAccount">
        <div class="col-12 col-md-6 mb-4">
          <div class="h-100 my-auto card grey no-shadow">
            <h6 class="fw-bold">Stake {{ farm.ticker }}</h6>
            <p>Balance: {{ state.tokenBalance.toFixed(0) }}</p>
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
              Your Stake:
              {{
                parseFloat(
                  convertWeiToEther(state.stakingUserInfo.amount)
                ).toFixed(0)
              }}
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
          </div>
        </div>
        <div class="col-12 col-md-12 mb-4">
          <div
            v-if="!(state.stakingUserInfo.amount == 0)"
            class="d-flex h-100 text-center card grey no-shadow"
          >
            <p class="mb-0">
              Your pending rewards:
              {{ state.pendingRewards.toFixed(0) }} ${{ farm.reward }}
            </p>
            <button
              v-if="state.pendingRewards > 0"
              type="button"
              class="btn btn-success mt-2"
              @click="claimRewards()"
            >
              Claim Rewards
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <h6>Please connect your wallet</h6>
      </div>
    </div>
  </div>
  <div class="row" v-else>
    <div class="col-12">
      <h4 class="text-center m-4">Please switch to BSC</h4>
    </div>
  </div>
</template>

<script setup>
import { spocTokenContract, spocStakingContract } from "~~/utils/contracts";
import { showLoader, hideLoader, moneyFormatter } from "~~/utils/helpers";
import {
  multicall,
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";
import { formatEther, parseEther, formatUnits, parseUnits } from "viem";
const { currentAccount, currentChain } = useWeb3WalletState();

const { $swal } = useNuxtApp();

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

const state = reactive({
  currentAccount: currentAccount.value,
  currentStakedCount: 0,
  currentStakedTVL: 0,
  tokenBalance: 0,
  toBeStaked: 0,
  toBeUnstaked: 0,
  approvalLimit: 0,
  stakingUserInfo: {},
  stakingUserUnlockTime: 0,
  pendingRewards: 0,
});

onMounted(async () => {
  getTokenBalance();
});

watch(currentAccount, () => {
  getTokenBalance();
});

watch(currentChain, () => {
  getTokenBalance();
});

async function getTokenBalance() {
  if (process.client) {
    const soakmontEcosystemDataForAccount = await multicall({
      contracts: [
        {
          ...spocTokenContract,
          functionName: "balanceOf",
          args: [state.currentAccount],
        },
        {
          ...spocTokenContract,
          functionName: "allowance",
          args: [state.currentAccount, spocStakingContract.address],
        },
        {
          ...spocStakingContract,
          functionName: "userInfo",
          args: [state.currentAccount],
        },
        {
          ...spocStakingContract,
          functionName: "pendingRewards",
          args: [state.currentAccount],
        },
        {
          ...spocTokenContract,
          functionName: "balanceOf",
          args: [spocStakingContract.address],
        },
      ],
    });

    const weiTokenBalance = soakmontEcosystemDataForAccount[0].result;
    const weiApprovalLimit = soakmontEcosystemDataForAccount[1].result;
    const accountStakedTokens = soakmontEcosystemDataForAccount[2].result[0];
    const weiCurrentPendingRewards = soakmontEcosystemDataForAccount[3].result;
    const totalStakedAmount = soakmontEcosystemDataForAccount[4].result;

    state.tokenBalance = parseFloat(convertWeiToEther(weiTokenBalance));

    state.approvalLimit = parseFloat(convertWeiToEther(weiApprovalLimit), 18);

    state.stakingUserInfo.amount = accountStakedTokens;

    state.pendingRewards = parseFloat(
      convertWeiToEther(weiCurrentPendingRewards),
      18
    );

    state.currentStakedCount = parseFloat(
      convertWeiToEther(totalStakedAmount),
      18
    );
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
    if (currentAccount) {
      console.log(state.toBeStaked);
      showLoader();
      const amountToApprove = max
        ? parseEther("100000000000")
        : parseEther(state.toBeStaked.toString());

      const { request } = await prepareWriteContract({
        address: spocTokenContract.address,
        abi: spocTokenContract.abi,
        functionName: "approve",
        args: [spocStakingContract.address, amountToApprove],
      });

      const { hash } = await writeContract(request);

      const data = await waitForTransaction({
        confirmations: 2,
        hash,
      });

      if (data.status == "success") {
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
      text: error.message.split("\n")[0],
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
    if (currentAccount) {
      showLoader();
      const amountToStake = parseUnits(state.toBeStaked.toString(), 18);

      const { request } = await prepareWriteContract({
        address: spocStakingContract.address,
        abi: spocStakingContract.abi,
        functionName: "stake",
        args: [amountToStake],
      });

      const { hash } = await writeContract(request);

      const data = await waitForTransaction({
        confirmations: 2,
        hash,
      });

      if (data.status == "success") {
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
      text: error.message.split("\n")[0],
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
    if (currentAccount) {
      showLoader();
      const amountToUnstake = parseUnits(state.toBeUnstaked.toString(), 18);

      const { request } = await prepareWriteContract({
        address: spocStakingContract.address,
        abi: spocStakingContract.abi,
        functionName: "unstake",
        args: [amountToUnstake],
      });

      const { hash } = await writeContract(request);

      const data = await waitForTransaction({
        confirmations: 2,
        hash,
      });

      if (data.status == "success") {
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
      text: error.message.split("\n")[0],
      icon: "error",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-danger btn-fill",
      },
    });
  }
}

async function claimRewards() {
  if (!state.pendingRewards > 0) {
    alert("Pending Rewards must be higher than 0.");
    return;
  }
  try {
    if (currentAccount) {
      showLoader();

      const { request } = await prepareWriteContract({
        address: spocStakingContract.address,
        abi: spocStakingContract.abi,
        functionName: "claimRewards",
      });

      const { hash } = await writeContract(request);

      const data = await waitForTransaction({
        confirmations: 2,
        hash,
      });

      if (data.status == "success") {
        const claimedRewards = state.pendingRewards;
        state.pendingRewards = 0;
        await getTokenBalance();
        hideLoader();
        $swal.fire({
          title: "Success",
          text: `Claimed reward successfully`,
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
      text: error.message.split("\n")[0],
      icon: "error",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-danger btn-fill",
      },
    });
  }
}

function convertWeiToEther(amount) {
  return amount ? formatEther(amount) : 0;
}
</script>
