import Web3Modal from "web3modal";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          56: "https://bsc-dataseed1.binance.org",
          137: "https://polygon-rpc.com/",
          250: "https://rpc.ftm.tools",
          43114: "https://api.avax.network/ext/bc/C/rpc",
        },
        supportedChainIds: [1, 56, 137, 250, 43114],
        qrcode: true,
        network: "binance",
        chainId: 56,
        bridge: "https://bridge.walletconnect.org",
        infuraId: "35f1db62a54d4b1b9feff0a60e5d0612",
      },
    },
  };

  const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
  });

  const web3 = new Web3();

  return {
    provide: {
      web3Modal,
      web3,
    },
  };
});
