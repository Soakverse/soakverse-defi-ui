import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/vue";

const useWeb3WalletState = () => {
  const account = useAppKitAccount();
  const network = useAppKitNetwork();

  const currentAccount = computed<string | null>(() =>
    account.value?.isConnected ? account.value.address ?? null : null
  );

  const currentChain = computed<number | null>(() => {
    const id = network.value?.chainId;
    if (id == null) return null;
    return typeof id === "string" ? Number(id) : id;
  });

  return {
    currentAccount,
    currentChain,
  };
};

export default useWeb3WalletState;
