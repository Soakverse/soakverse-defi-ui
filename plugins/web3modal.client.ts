import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/html";
import {
  configureChains,
  createConfig,
  watchNetwork,
  getNetwork,
  watchAccount,
  getAccount,
} from "@wagmi/core";
import { mainnet, bsc, avalanche } from "@wagmi/core/chains";
import logo from "@/assets/img/soakverse-logo.png";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const chains = [mainnet, bsc, avalanche];
  const projectId = config.walletConnectProjectId;

  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
  });
  const ethereumClient = new EthereumClient(wagmiConfig, chains);
  const web3modal = new Web3Modal(
    {
      projectId,
      themeVariables: {
        "--w3m-accent-color": "#00b8ff",
        "--w3m-logo-image-url": logo,
        "--w3m-background-color": "#071d28",
      },
    },
    ethereumClient
  );

  return {
    provide: {
      web3modal,
      ethereumClient,
      publicClient,
      watchNetwork,
      getNetwork,
      watchAccount,
      getAccount,
    },
  };
});
