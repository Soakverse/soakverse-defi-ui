import Web3 from "web3";
import { chainDefinition } from "../utils/blockchain";
import { inject } from "vue";

const web3Provider: any = null;
const connectedWallet: any = null;
const chainInformation = {
  name: null,
  shortName: null,
  chainId: null,
};

const state = reactive({
  web3Provider,
  connectedWallet,
  chainInformation,
});

const useWeb3WalletState = () => {
  const web3: any = inject("web3");
  const connectedWallet = computed(() => state.connectedWallet);
  const chainInformation = computed(() => state.chainInformation);

  const web3Provider = computed(() => state.web3Provider);
  const setWeb3Provider = async (web3Provider: any) => {
    state.web3Provider = web3Provider;
    web3.setProvider(web3Provider);

    state.chainInformation = chainDefinition[parseInt(web3Provider.chainId)];

    state.connectedWallet = await getConnectedWallet(web3.currentProvider);

    console.log(state.connectedWallet);

    web3Provider.on("accountsChanged", async (accounts: string[]) => {
      state.connectedWallet = await getConnectedWallet(web3.currentProvider);
    });

    web3Provider.on("chainChanged", (chainId: string) => {
      const stringChainId = parseInt(chainId);
      state.chainInformation = chainDefinition[stringChainId];
    });

    web3Provider.on(
      "disconnect",
      (error: { code: number; message: string }) => {
        resetWeb3State();
      }
    );
  };

  const setNetwork = async (networkId: number) => {
    const currentChainId = await web3.eth.net.getId();
    if (currentChainId !== networkId) {
      try {
        await state.web3Provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: Web3.utils.toHex(networkId) }],
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          await addNetwork(networkId);
        }
        if (switchError.code === -32002) {
          alert("You already have a pending request in your MetaMask");
        }
      }
    }
  };

  const addNetwork = async (networkId: number) => {
    try {
      await state.web3Provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            nativeCurrency: {
              name: chainDefinition[networkId].currencySymbol,
              symbol: chainDefinition[networkId].currencySymbol,
              decimals: 18,
            },
            blockExplorerUrls: [chainDefinition[networkId].blockExplorerUrl],
            chainId: Web3.utils.toHex(networkId),
            chainName: chainDefinition[networkId].networkFullName,
            rpcUrls: [chainDefinition[networkId].rpcUrl],
          },
        ],
      });
    } catch (error) {
      alert(error);
    }
  };

  const resetWeb3State = async () => {
    state.web3Provider = null;
    state.connectedWallet = "";
    state.chainInformation = {
      name: null,
      shortName: null,
      chainId: null,
    };
  };

  return {
    setWeb3Provider,
    setNetwork,
    resetWeb3State,
    web3Provider,
    chainInformation,
    connectedWallet,
  };
};

function getConnectedWallet(provider: any): string | null {
  console.log(provider);
  console.log(provider.accounts);
  if (!provider) return null;

  if (provider.isTrust) {
    console.log("is trust");
    return provider.address;
  } else if (provider.isMetamask) {
    console.log("is meta");
    return provider.selectedAddress;
  } else {
    console.log("is walletconnect");
    const accounts = provider.accounts[0];
    return accounts[0];
  }
}

export default useWeb3WalletState;
