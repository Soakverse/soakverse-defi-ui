import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          1: "http://cloudflare-eth.com/v1/mainnet",
          56: "https://bsc-dataseed1.binance.org",
          137: "https://polygon-rpc.com/",
          250: "https://rpc.ftm.tools",
          43114: "https://api.avax.network/ext/bc/C/rpc",
        },
        supportedChainIds: [1, 56, 137, 250, 43114],
        qrcode: true,
        bridge: "https://bridge.walletconnect.org",
      },
    },
  };

  const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
  });

  return {
    provide: {
      web3Modal,
    },
  };
});
