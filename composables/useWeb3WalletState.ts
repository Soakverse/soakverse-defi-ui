import { storeToRefs } from "pinia";
import { useBlockchainStore } from "~/stores/blockchain/useBlockchainStore";

const useWeb3WalletState = async () => {
  const blockchainStore = useBlockchainStore();
  await blockchainStore.initBlockchainStore();

  const { currentAccount, currentChain } = storeToRefs(blockchainStore);

  return {
    blockchainStore,
    currentAccount,
    currentChain,
  };
};

export default useWeb3WalletState;
