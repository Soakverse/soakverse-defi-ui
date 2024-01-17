<template>
  <div class="row text-white">
    <div v-if="state.initialized == false">
      <h3>Initializing...</h3>
    </div>
    <div v-else-if="!currentAccount" class="col-12">
      <h4>Please connect your wallet.</h4>
    </div>
    <div v-else-if="props.newContract.chainId != currentChain" class="col-12">
      <h4>You are on the wrong chain.</h4>
      <button
        class="btn btn-success ms-1"
        @click="
          switchNetwork({
            chainId: props.newContract.chainId,
          })
        "
      >
        Switch to Ethereum
      </button>
    </div>
    <div v-else-if="state.migratingIsActive" class="col-12">
      <h3>Welcome to {{ props.newContract.name }} migration page</h3>
      <p>You own: {{ state.oldContractCount }} {{ props.oldContract.name }}</p>
      <hr />
      <p v-if="state.oldContractCount > props.migrationLimit">
        You can only migrate {{ props.migrationLimit }}
        {{ props.oldContract.name }} at a time to prevent out of gas reverting.
      </p>
      <div class="my-4" v-if="state.oldContractCount > 0">
        <button
          type="button"
          class="btn btn-not-responsive btn-success ms-1"
          @click="migrateOldNft()"
          v-if="state.isApprovedForAll"
        >
          Migrate
          {{
            state.oldContractCount > props.migrationLimit
              ? props.migrationLimit
              : state.oldContractCount
          }}
          (Step 2 out of 2)
        </button>
        <button
          type="button"
          class="btn btn-not-responsive btn-success ms-1"
          @click="approveMigration()"
          v-else
        >
          Approve Migration (Step 1 out of 2)
        </button>
      </div>
      <div v-else>
        <p>You cannot migrate.</p>
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

<script setup land="ts">
import { showLoader, hideLoader } from "~~/utils/helpers";
import {
  readContract,
  prepareWriteContract,
  writeContract,
  waitForTransaction,
  switchNetwork,
} from "@wagmi/core";
const { currentAccount, currentChain } = useWeb3WalletState();

const { $swal } = useNuxtApp();

const props = defineProps({
  newContract: {
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
  oldContract: {
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
  migrationLimit: {
    required: true,
    type: Number,
  },
});

const state = reactive({
  currentAccount: currentAccount.value,
  migratingIsActive: false,
  initialized: false,
  isApprovedForAll: false,
  oldContractCount: 0,
  oldContractIds: [],
});

watch(currentAccount, async () => {
  if (process.client && currentAccount.value) {
    await fetchOwnerWallet();
  }
});

onMounted(async () => {
  try {
    state.migratingIsActive = await readContract({
      address: props.newContract.address,
      abi: props.newContract.abi,
      functionName: "claimIsActive",
    });
    if (process.client && currentAccount.value) {
      await fetchOwnerWallet();
      await checkIsApprovelForAll();
    }
    state.initialized = true;
  } catch (e) {
    console.log(e.message);
  }
});

async function fetchOwnerWallet() {
  state.oldContractIds = await readContract({
    address: props.oldContract.address,
    abi: props.oldContract.abi,
    functionName: "walletOfOwner",
    args: [currentAccount.value],
  });
  state.oldContractCount = state.oldContractIds.length;
}

async function checkIsApprovelForAll() {
  state.isApprovedForAll = await readContract({
    address: props.oldContract.address,
    abi: props.oldContract.abi,
    functionName: "isApprovedForAll",
    args: [currentAccount.value, props.newContract.address],
  });
}

async function migrateOldNft() {
  try {
    if (state.oldContractCount > 0) {
      const idsToMigrate =
        state.oldContractCount > props.migrationLimit
          ? state.oldContractIds.slice(0, props.migrationLimit)
          : state.oldContractIds;
      showLoader();
      const { request } = await prepareWriteContract({
        address: props.newContract.address,
        abi: props.newContract.abi,
        functionName: "claimAll",
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
          text: "Migration successful",
          icon: "success",
          customClass: {
            confirmButton: "btn btn-success btn-fill",
          },
        });
        await fetchOwnerWallet();
      }
    }
  } catch (error) {
    hideLoader();
    console.log(error);
    $swal.fire({
      title: "Error",
      text: error.message.split("\n")[0] + " " + error.message.split("\n")[1],
      icon: "error",
      customClass: {
        confirmButton: "btn btn-danger btn-fill",
      },
    });
  }
}

async function approveMigration() {
  try {
    if (state.oldContractCount > 0) {
      showLoader();
      const { request } = await prepareWriteContract({
        address: props.oldContract.address,
        abi: props.oldContract.abi,
        functionName: "setApprovalForAll",
        args: [props.newContract.address, true],
      });

      const { hash } = await writeContract(request);

      const data = await waitForTransaction({
        confirmations: 1,
        hash,
      });

      if (data.status == "success") {
        state.isApprovedForAll = true;
        hideLoader();
        $swal.fire({
          title: "Success",
          text: "Approval successful, proceed to next step",
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
      text: error.message.split("\n")[0] + " " + error.message.split("\n")[1],
      icon: "error",
      customClass: {
        confirmButton: "btn btn-danger btn-fill",
      },
    });
  }
}
</script>
