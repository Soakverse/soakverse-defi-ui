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
        Switch to Ethereum
      </button>
    </div>
    <div v-else-if="state.mintIsActive" class="col-12">
      <h3>Welcome to {{ props.mintContract.name }} minting page</h3>
      <h5>The price per NFT is {{ props.price }} ETH</h5>
      <p>
        Select the quantity you want to mint and then confirm in your wallet!
      </p>
      <hr />
      <div class="my-4">
        <select
          class="form-select w-auto d-inline-block mb-4"
          v-model="state.count"
        >
          <option v-for="index in 20" :key="index" :value="index">
            {{ index }} WYRD
          </option>
        </select>
        <button
          type="button"
          class="btn btn-not-responsive btn-success ms-1"
          @click="mintTokens(state.count)"
        >
          Mint {{ state.count }} WYRD(s) for a total of
          {{ totalPrice.toFixed(2) }} ETH
        </button>
      </div>
    </div>
    <div v-else-if="state.initialized == true">
      <h3>Minting is not active yet.</h3>
    </div>
    <div v-else>
      <h3>Something went wrong.</h3>
    </div>
  </div>
</template>

<script setup land="ts">
import { showLoader, hideLoader } from "~~/utils/helpers";
import {
  readContract,
  prepareWriteContract,
  writeContract,
  waitForTransaction,
  switchNetwork,
} from "@wagmi/core";
import { parseEther } from "viem";
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
  price: {
    type: Number,
  },
});

const state = reactive({
  currentAccount: currentAccount.value,
  mintPrice: props.price,
  count: 1,
  mintIsActive: false,
  initialized: false,
});

const totalPrice = computed(() => {
  return Math.round(state.mintPrice * state.count * 1e4) / 1e4;
});

onMounted(async () => {
  try {
    if (process.client) {
      state.mintIsActive = await readContract({
        address: props.mintContract.address,
        abi: props.mintContract.abi,
        functionName: "mintIsActive",
      });
      state.initialized = true;
    }
  } catch (e) {
    console.log(e.message);
  }
});

async function mintTokens(count) {
  try {
    if (count > 0) {
      showLoader();
      const countToMint = Math.ceil(state.count);

      const { request } = await prepareWriteContract({
        address: props.mintContract.address,
        abi: props.mintContract.abi,
        functionName: "publicMint",
        args: [state.count],
        value: parseEther(totalPrice.value.toString()),
      });

      const { hash } = await writeContract(request);

      const data = await waitForTransaction({
        confirmations: 1,
        hash,
      });

      if (data.status == "success") {
        hideLoader();
        $swal.fire({
          title: "Success",
          text: "Mint successful",
          icon: "success",
          customClass: {
            confirmButton: "btn btn-success btn-fill",
          },
        });
      }
    }
  } catch (error) {
    hideLoader();
    console.log(error);
    $swal.fire({
      title: "Error",
      text: error.message.split("\n")[0],
      icon: "error",
      customClass: {
        confirmButton: "btn btn-danger btn-fill",
      },
    });
  }
}
</script>
