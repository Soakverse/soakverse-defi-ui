const state = reactive({
  currentAccount: null as string | null,
  currentChain: null as number | null,
});

let initialized = false;

const normalizeChainId = (id: number | string | undefined | null): number | null => {
  if (id == null) return null;
  return typeof id === "string" ? Number(id) : id;
};

const useWeb3WalletState = () => {
  if (import.meta.client && !initialized) {
    const { $appKit } = useNuxtApp() as unknown as {
      $appKit?: {
        getAccount: () => { address?: string; isConnected?: boolean } | undefined;
        getCaipNetwork: () => { id?: number | string } | undefined;
        subscribeAccount: (cb: (a: { address?: string; isConnected?: boolean }) => void) => () => void;
        subscribeNetwork: (cb: (n: { chainId?: number | string }) => void) => () => void;
      };
    };

    if ($appKit) {
      try {
        const initialAccount = $appKit.getAccount();
        state.currentAccount = initialAccount?.isConnected
          ? initialAccount.address ?? null
          : null;
      } catch {
        // activeChain may not be set yet — subscription will populate
      }

      try {
        state.currentChain = normalizeChainId($appKit.getCaipNetwork()?.id);
      } catch {
        // same
      }

      $appKit.subscribeAccount((account) => {
        state.currentAccount = account?.isConnected
          ? account.address ?? null
          : null;
      });

      $appKit.subscribeNetwork((network) => {
        state.currentChain = normalizeChainId(network?.chainId);
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
