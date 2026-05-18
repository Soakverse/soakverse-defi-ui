import type { Config } from "@wagmi/core";
import { getAccount, getChainId, watchAccount, watchChainId } from "@wagmi/core";

const state = reactive({
  currentAccount: null as string | null,
  currentChain: null as number | null,
});

let initialized = false;

const useWeb3WalletState = () => {
  if (import.meta.client && !initialized) {
    const { $wagmiConfig } = useNuxtApp() as unknown as { $wagmiConfig?: Config };

    if ($wagmiConfig) {
      const account = getAccount($wagmiConfig);
      state.currentAccount = account.isConnected ? account.address ?? null : null;
      state.currentChain = getChainId($wagmiConfig) ?? null;

      watchAccount($wagmiConfig, {
        onChange(account) {
          state.currentAccount = account.isConnected ? account.address ?? null : null;
        },
      });

      watchChainId($wagmiConfig, {
        onChange(chainId) {
          state.currentChain = chainId ?? null;
        },
      });

      initialized = true;
    }
  }

  const currentAccount = computed(() => state.currentAccount);
  const currentChain = computed(() => state.currentChain);

  return {
    currentAccount,
    currentChain,
  };
};

export default useWeb3WalletState;
