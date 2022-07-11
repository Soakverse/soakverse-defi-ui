import Web3 from "web3";

const web3: any = new Web3();
const web3Provider: any = null;
const connectedWallet: string | null = null;
const chainId: any = null;
const chainInformation = {
  name: null,
  shortName: null,
  chainId: null,
};

const state = reactive({
  web3,
  web3Provider,
  connectedWallet,
  chainId,
  chainInformation,
});

const useWeb3WalletState = () => {
  const web3 = computed(() => state.web3);
  const setWeb3 = (web3: Web3) => {
    state.web3 = web3;
  };

  const connectedWallet = computed(() => state.connectedWallet);
  const chainId = computed(() => state.chainId);
  const chainInformation = computed(() => state.chainInformation);

  const web3Provider = computed(() => state.web3Provider);
  const setWeb3Provider = (web3Provider: any) => {
    state.web3Provider = web3Provider;
    state.web3 = new Web3(web3Provider);
    state.connectedWallet =
      web3Provider.isWalletConnect && !web3Provider.selectedAddress
        ? web3Provider.accounts[0]
        : web3Provider.selectedAddress;
    state.chainId = web3Provider.chainId;
    state.chainInformation = chainDefinition[web3Provider.chainId];

    console.log(web3Provider);

    web3Provider.on("accountsChanged", (accounts: string[]) => {
      state.connectedWallet = web3Provider.selectedAddress;
    });

    web3Provider.on("chainChanged", (chainId: string) => {
      state.chainId = chainId;
      state.chainInformation = chainDefinition[chainId];
    });

    web3Provider.on("connect", (info: { chainId: number }) => {
      console.log(info);
    });

    web3Provider.on(
      "disconnect",
      (error: { code: number; message: string }) => {
        resetWeb3State();
      }
    );
  };

  return {
    web3Provider,
    setWeb3Provider,
    web3,
    setWeb3,
    chainId,
    chainInformation,
    connectedWallet,
  };
};

function resetWeb3State() {
  state.web3Provider = null;
  state.connectedWallet = null;
  state.chainId = null;
  state.chainInformation = {
    name: null,
    shortName: null,
    chainId: null,
  };
}

const chainDefinition: any = {
  "0x1": {
    name: "Ethereum",
    shortName: "ETH",
    chainId: 1,
  },
  "0x38": {
    name: "Binance Smart Chain",
    shortName: "BSC",
    chainId: 56,
  },
  "1": {
    name: "Ethereum",
    shortName: "ETH",
    chainId: 1,
  },
  "56": {
    name: "Binance Smart Chain",
    shortName: "BSC",
    chainId: 56,
  },
};

export default useWeb3WalletState;
