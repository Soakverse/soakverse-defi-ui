const currentAccount: any = -1;
const currentChain: any = 0;

const state = reactive({
  currentAccount,
  currentChain,
});

const useWeb3WalletState = () => {
  const { $getAccount, $getNetwork, $watchAccount, $watchNetwork } =
    useNuxtApp();
  const currentAccount = computed(() => state.currentAccount);
  const currentChain = computed(() => state.currentChain);
  if (typeof $getAccount == "function") {
    const initialAccount = $getAccount();
    const initialNetwork = $getNetwork();

    state.currentAccount = initialAccount.address
      ? initialAccount.address
      : null;
    state.currentChain = initialNetwork.chain ? initialNetwork.chain.id : null;

    const accountWatch = $watchAccount(
      (account) =>
        (state.currentAccount = account.address ? account.address : null)
    );
    const chainWatch = $watchNetwork((network) => {
      state.currentChain = network.chain ? network.chain.id : null;
    });
  }

  return {
    currentAccount,
    currentChain,
  };
};

export default useWeb3WalletState;
