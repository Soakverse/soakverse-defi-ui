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
import BlockchainChecker from "@/components/Blockchain/BlockchainChecker.vue";
import { showLoader, hideLoader, filterArrayOfObjects } from "~~/utils/helpers";
import { soakverseDAOPassSmartContract } from "~~/utils/contracts";
import {
  BlockchainDefinition,
  SmartContractDefinition,
} from "~~/types/blockchain/BlockchainTypes";
import {
  readContract,
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";

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

const levelToShareRegistry = [4, 5, 6, 8, 10];

const { currentAccount } = useWeb3WalletState();

const config = useRuntimeConfig();

const { $swal } = useNuxtApp();

const props = defineProps<{
  stakingContract: SmartContractDefinition;
  blockchain: BlockchainDefinition;
}>();

const state = reactive({
  currentAccount: currentAccount.value,
  stakingActivated: true,
  initialized: false,
  ownedAssets: [] as any[],
  stakedAssets: [] as number[],
  unstakedAssets: [] as number[],
});

const stakedDaoShare = computed(() => {
  let stakedDaoShareValue = 0;
  for (const stakeAsset of state.stakedAssets) {
    stakedDaoShareValue =
      stakedDaoShareValue + levelToShareRegistry[nftLevels[stakeAsset - 1] - 1];
  }
  return stakedDaoShareValue;
});
const potentialDaoShare = computed(() => {
  let potentialDaoShareValue = 0;
  for (const nftAsset of state.ownedAssets) {
    potentialDaoShareValue =
      potentialDaoShareValue +
      levelToShareRegistry[nftLevels[nftAsset.id - 1] - 1];
  }

  return potentialDaoShareValue;
});

watch(currentAccount, async () => {
  if (process.client && currentAccount.value) {
    state.ownedAssets = [];
    state.stakedAssets = [];
    state.unstakedAssets = [];
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

async function fetchAssets() {
  const assetUrl = `${config.public.apiUrl}/nft/dao-pass/address/${currentAccount.value}`;

  const assetList: any = await $fetch(assetUrl);

  for (let nft of assetList) {
    const tokenId = parseInt(nft.id.tokenId, 16);

    state.ownedAssets.push({
      id: nft.tokenId,
      tokenId: nft.tokenId,
      name: nft.name,
      staked: nft.staked,
      stakedAt: nft.stakedAt,
      webImage: nft.webImage,
      attributes: nft.attributes,
    });

    nft.staked
      ? state.stakedAssets.push(nft.tokenId)
      : state.unstakedAssets.push(nft.tokenId);
  }
}

async function stakeNft(tokenId: number) {
  const singleOwnedAsset = filterArrayOfObjects(state.ownedAssets, tokenId);
  if (!singleOwnedAsset) {
    $swal.fire({
      title: "Error",
      text: "You don't own that NFT",
      icon: "error",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-danger btn-fill",
      },
    });
    return;
  }
  try {
    if (currentAccount) {
      showLoader();

      const migrationCCIPFee: any[] = await readContract({
        address: soakverseDAOPassSmartContract.address as `0x${string}`,
        abi: soakverseDAOPassSmartContract.abi,
        functionName: "estimateStakeFee",
        args: [],
      });

      const { request } = await prepareWriteContract({
        address: soakverseDAOPassSmartContract.address as `0x${string}`,
        abi: soakverseDAOPassSmartContract.abi,
        functionName: "stake",
        args: [tokenId],
        value: migrationCCIPFee,
      });

      const { hash } = await writeContract(request);

      const data = await waitForTransaction({
        confirmations: 1,
        hash,
      });

      if (data.status == "success") {
        state.stakedAssets.push(tokenId);
        state.unstakedAssets = state.unstakedAssets.filter(
          (item) => item !== tokenId
        );
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
  } catch (error: any) {
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

async function unstakeNft(tokenId: number) {
  const singleOwnedAsset = filterArrayOfObjects(state.ownedAssets, tokenId);
  if (!singleOwnedAsset) {
    $swal.fire({
      title: "Error",
      text: "You don't own that NFT",
      icon: "error",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-danger btn-fill",
      },
    });
    return;
  }
  try {
    if (currentAccount) {
      showLoader();
      const migrationCCIPFee: any[] = await readContract({
        address: soakverseDAOPassSmartContract.address as `0x${string}`,
        abi: soakverseDAOPassSmartContract.abi,
        functionName: "estimateStakeFee",
        args: [],
      });

      const { request } = await prepareWriteContract({
        address: soakverseDAOPassSmartContract.address as `0x${string}`,
        abi: soakverseDAOPassSmartContract.abi,
        functionName: "unstake",
        args: [tokenId],
        value: migrationCCIPFee,
      });

      const { hash } = await writeContract(request);

      const data = await waitForTransaction({
        confirmations: 1,
        hash,
      });

      if (data.status == "success") {
        state.unstakedAssets.push(tokenId);
        state.stakedAssets = state.stakedAssets.filter(
          (item) => item !== tokenId
        );
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
  } catch (error: any) {
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
</script>
