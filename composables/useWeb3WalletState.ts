import Web3 from "web3";
import { chainDefinition } from "../utils/blockchain";

const web3: any = new Web3();
const web3Provider: any = null;
const connectedWallet: string = "";
const chainInformation = {
  name: null,
  shortName: null,
  chainId: null,
};

const state = reactive({
  web3,
  web3Provider,
  connectedWallet,
  chainInformation,
});

const useWeb3WalletState = () => {
  const web3 = computed(() => state.web3);
  const setWeb3 = (web3: Web3) => {
    state.web3 = web3;
  };

  const connectedWallet = computed(() => state.connectedWallet);
  const chainInformation = computed(() => state.chainInformation);

  const web3Provider = computed(() => state.web3Provider);
  const setWeb3Provider = async (web3Provider: any) => {
    state.web3Provider = web3Provider;
    state.web3 = await new Web3(web3Provider);
    console.log("state.web3");
    console.log(state.web3);
    state.chainInformation = chainDefinition[web3Provider.chainId];

    console.log("eth");
    console.log(state.web3.eth);

    console.log("accounts");
    const accounts = await state.web3Provider.request({
      method: "eth_requestAccounts",
    });
    if (accounts.length > 0) {
      state.connectedWallet = accounts[0];
    }
    console.log(accounts);

    web3Provider.on("accountsChanged", (accounts: string[]) => {
      if (accounts.length > 0) {
        state.connectedWallet = accounts[0];
      }
      console.log("accounts changed");
      console.log(state);
    });

    web3Provider.on("chainChanged", (chainId: string) => {
      state.chainInformation = chainDefinition[chainId];
    });

    web3Provider.on(
      "disconnect",
      (error: { code: number; message: string }) => {
        resetWeb3State();
      }
    );
  };

  const setNetwork = async (networkId: number) => {
    const currentChainId = await state.web3.eth.net.getId();
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
    setWeb3,
    web3Provider,
    web3,
    chainInformation,
    connectedWallet,
  };
};

export default useWeb3WalletState;
