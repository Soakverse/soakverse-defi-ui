<template>
  <div class="row text-white">
    <div v-if="state.initialized == false">
      <h3>Initializing...</h3>
    </div>
    <div v-else-if="!currentAccount" class="col-12">
      <h4>Please connect your wallet.</h4>
    </div>
    <div v-else-if="props.mintContract.chainId != currentChain" class="col-12">
      <h4>You are on the wrong chain.</h4>
      <button
        class="btn btn-success ms-1"
        @click="
          switchNetwork({
            chainId: props.mintContract.chainId,
          })
        "
      >
        Switch to Base
      </button>
    </div>
    <div v-else-if="state.migratingIsActive" class="col-12">
      <h3>{{ props.mintContract.name }} voucher minting</h3>
      <p>You own: {{ state.currentBalance }}</p>
      <p v-if="state.currentAccountVoucherCount">
        You can claim:
        {{ state.currentAccountVoucherCount - state.currentBalance }}
      </p>
      <hr />
      <div class="my-4" v-if="state.currentBalance == 0">
        <button
          type="button"
          class="btn btn-not-responsive btn-success ms-1"
          @click="claimVoucherERC721()"
        >
          Claim Soakemon(s)
        </button>
      </div>
      <div v-else>
        <p>You already claimed your Soakemon(s).</p>
      </div>
    </div>
    <div v-else-if="state.initialized == true">
      <h3>Migrating is not active yet.</h3>
    </div>
    <div v-else>
      <h3>Something went wrong.</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showLoader, hideLoader } from '~~/utils/helpers';
import {
  readContract,
  prepareWriteContract,
  writeContract,
  waitForTransaction,
  switchNetwork,
} from '@wagmi/core';
import { checksumAddress } from 'viem';
import type { ERC721Vouchers } from '~~/types/blockchain/VoucherMintingTypes';

const { currentAccount, currentChain } = useWeb3WalletState();

const { $swal } = useNuxtApp();

const props = defineProps({
  mintContract: {
    required: true,
    type: [Object],
    address: {
      required: true,
      type: String,
    },
    abi: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    ticker: {
      required: true,
      type: String,
    },
    chainId: {
      required: true,
      type: Number,
    },
  },
  mintLimit: {
    required: true,
    type: Number,
  },
  voucherInfo: {
    required: true,
    type: Object as PropType<ERC721Vouchers>,
  },
});

const state = reactive({
  currentAccount: currentAccount.value,
  currentBalance: 0,
  initialized: false,
  migratingIsActive: true,
  currentAccountVoucherInfo: null,
  currentAccountVoucherCount: 0,
});

watch(currentAccount, async () => {
  if (process.client && currentAccount.value) {
    await fetchOwnerWallet();
  }
});

onMounted(async () => {
  try {
    if (process.client && currentAccount.value) {
      await fetchOwnerWallet();
    }
    state.initialized = true;
  } catch (e) {
    console.log(e.message);
  }
});

async function fetchOwnerWallet() {
  state.currentBalance = parseInt(
    await readContract({
      address: props.mintContract.address,
      abi: props.mintContract.abi,
      functionName: 'balanceOf',
      args: [currentAccount.value],
    })
  );

  const data = props.voucherInfo[0];
  const foundValue =
    data[state.currentAccount.toString().toLowerCase()] || null;
  console.log(foundValue.tokens.length);

  console.log(foundValue);
  if (foundValue) {
    state.currentAccountVoucherInfo = foundValue;
    state.currentAccountVoucherCount = parseInt(foundValue.tokens.length);
  } else {
    console.log(foundValue + ' not found');
    state.currentAccountVoucherInfo = null;
    state.currentAccountVoucherCount = 0;
  }
}

async function claimVoucherERC721() {
  console.log(state.currentAccountVoucherInfo.signature);
  try {
    if (state.currentAccountVoucherInfo) {
      showLoader();
      const { request } = await prepareWriteContract({
        address: props.mintContract.address,
        abi: props.mintContract.abi,
        functionName: 'mint',
        args: [
          state.currentAccountVoucherInfo.requestId,
          state.currentAccountVoucherInfo.signature,
          state.currentAccountVoucherInfo.tokens,
        ],
      });

      const { hash } = await writeContract(request);

      const data = await waitForTransaction({
        confirmations: 1,
        hash,
      });

      if (data.status == 'success') {
        hideLoader();
        $swal.fire({
          title: 'Success',
          text: 'Migration successful',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-success btn-fill',
          },
        });
        await fetchOwnerWallet();
      }
    }
  } catch (error) {
    hideLoader();
    console.log(error);
    $swal.fire({
      title: 'Error',
      text: error.message.split('\n')[0] + ' ' + error.message.split('\n')[1],
      icon: 'error',
      customClass: {
        confirmButton: 'btn btn-danger btn-fill',
      },
    });
  }
}
</script>
