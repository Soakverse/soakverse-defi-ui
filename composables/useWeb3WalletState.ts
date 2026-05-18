import { getAccount, watchAccount, watchChainId } from "@wagmi/core";

const state = reactive({
  currentAccount: null as string | null,
  currentChain: null as number | null,
});

let initialized = false;

const useWeb3WalletState = () => {
  const { $wagmiConfig } = useNuxtApp();
  const currentAccount = computed(() => state.currentAccount);
  const currentChain = computed(() => state.currentChain);

  if (!initialized && $wagmiConfig) {
    const initial = getAccount($wagmiConfig);
    state.currentAccount = initial.address ?? null;
    state.currentChain = initial.chainId ?? null;

    watchAccount($wagmiConfig, {
      onChange: (account) => {
        state.currentAccount = account.address ?? null;
        state.currentChain = account.chainId ?? null;
      },
    });
    watchChainId($wagmiConfig, {
      onChange: (chainId) => {
        state.currentChain = chainId ?? null;
      },
    });
    initialized = true;
  }

  return {
    currentAccount,
    currentChain,
  };
};

export default useWeb3WalletState;
