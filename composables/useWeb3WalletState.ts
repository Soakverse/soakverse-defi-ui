import { getAccount, watchAccount } from "@wagmi/core";

const state = reactive({
  currentAccount: null as string | null,
  currentChain: null as number | null,
});

let initialized = false;

const useWeb3WalletState = () => {
  const { $wagmiConfig, $appKit } = useNuxtApp();
  const currentAccount = computed(() => state.currentAccount);
  const currentChain = computed(() => state.currentChain);

  if (!initialized && $wagmiConfig) {
    const initial = getAccount($wagmiConfig);
    state.currentAccount = initial.address ?? null;
    state.currentChain = initial.chainId ?? null;

    watchAccount($wagmiConfig, {
      onChange: (account) => {
        state.currentAccount = account.address ?? null;
        if (account.chainId != null) state.currentChain = account.chainId;
      },
    });

    if ($appKit) {
      $appKit.subscribeNetwork((network: { chainId?: number | string }) => {
        const id =
          typeof network?.chainId === "string"
            ? Number(network.chainId)
            : network?.chainId ?? null;
        state.currentChain = id;
      });
    }
    initialized = true;
  }

  return {
    currentAccount,
    currentChain,
  };
};

export default useWeb3WalletState;
