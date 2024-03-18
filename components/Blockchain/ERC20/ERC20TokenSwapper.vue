<template>
  <div class="row text-white">
    <BlockchainChecker
      :blockchain="props.blockchain"
      :currentAccount="state.currentAccount"
    >
      <div class="col-12">
        <h3>{{ props.stakingContract.name }} Staking</h3>
        <h6>Your DAO Shares: {{ stakedDaoShare }}</h6>
        <h6>Your Potential DAO Shares: {{ potentialDaoShare }}</h6>
        <div class="row">
          <div
            v-for="nftAsset in state.ownedAssets"
            :key="nftAsset.id"
            class="col-12 col-sm-6 col-md-3 col-lg-2 py-3"
          >
            <h6>{{ nftAsset.name }}</h6>
            <img
              :src="nftAsset.webImage"
              class="img-responsive w-100 mb-1 rounded"
            />
            <p class="p-0 m-0">Level: {{ nftLevels[nftAsset.id - 1] }}</p>
            <p class="p-0 m-0">
              DAO Shares:
              {{ levelToShareRegistry[nftLevels[nftAsset.id - 1] - 1] }}
            </p>
            <div v-if="state.stakingActivated">
              <div v-if="state.stakedAssets.includes(nftAsset.tokenId)">
                <a
                  @click="unstakeNft(nftAsset.tokenId)"
                  class="btn btn-danger btn-sm mt-1"
                  >Unstake</a
                >
              </div>
              <a
                v-else
                @click="stakeNft(nftAsset.tokenId)"
                class="btn btn-success btn-sm mt-1"
                >Stake</a
              >
            </div>
            <div v-else>
              <p class="red-text">Staking not activated yet</p>
            </div>
          </div>
          <div v-if="state.ownedAssets.length == 0">
            <h6 class="my-3">You own no NFT.</h6>
          </div>
        </div>
      </div>
    </BlockchainChecker>
  </div>
</template>

<script setup lang="ts">
import BlockchainChecker from '@/components/Blockchain/BlockchainChecker.vue';
import { showLoader, hideLoader, filterArrayOfObjects } from '~~/utils/helpers';
import {
  BlockchainDefinition,
  SmartContractDefinition,
} from '~~/types/blockchain/BlockchainTypes';
import {
  readContract,
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from '@wagmi/core';

const { currentAccount } = await useWeb3WalletState();

const config = useRuntimeConfig();

const { $swal } = useNuxtApp();

const props = defineProps<{
  swappingContract: SmartContractDefinition;
  erc20Contract: SmartContractDefinition;
  blockchain: BlockchainDefinition;
}>();

const state = reactive({
  currentAccount: currentAccount.value,
  stakingActivated: true,
  initialized: false,
  nativeTokenBalance: 0,
  erc20TokenBalance: 0,
  nativeTokenBalanceToSwap: 0,
  erc20TokenBalanceToSwap: 0,
  swapDirection: 0,
});

watch(currentAccount, async () => {
  if (process.client && currentAccount.value) {
    state.nativeTokenBalance = 0;
    state.erc20TokenBalance = 0;
    await fetchAssets();
  }
});

onMounted(async () => {
  try {
    await fetchAssets();
    state.initialized = true;
  } catch (e: any) {
    console.log(e.message);
  }
});

async function fetchAssets() {}

async function swapTokens() {
  if (!singleOwnedAsset) {
    $swal.fire({
      title: 'Error',
      text: "You don't own that NFT",
      icon: 'error',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-danger btn-fill',
      },
    });
    return;
  }
  try {
    if (currentAccount) {
      showLoader();

      const swappingFees = 0.005;

      const { request } = await prepareWriteContract({
        address: swappingContract.address as `0x${string}`,
        abi: swappingContract.abi,
        functionName: 'stake',
        args: [tokenId],
        value: swappingFees,
      });

      const { hash } = await writeContract(request);

      const data = await waitForTransaction({
        confirmations: 1,
        hash,
      });

      if (data.status == 'success') {
        fetchAssets();
        hideLoader();
        $swal.fire({
          title: 'Success',
          text: 'Swapping successful',
          icon: 'success',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success btn-fill',
          },
        });
      }
    }
  } catch (error: any) {
    hideLoader();
    $swal.fire({
      title: 'Error',
      text: error.message.split('\n')[0],
      icon: 'error',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-danger btn-fill',
      },
    });
  }
}
</script>
