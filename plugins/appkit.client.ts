import { createAppKit } from "@reown/appkit/vue";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, bsc, base, type AppKitNetwork } from "@reown/appkit/networks";
import { http } from "viem";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const projectId = config.public.walletConnectProjectId as string;
  const alchemyApiKey = config.public.alchemyApiKey as string;

  const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, bsc, base];

  const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
    transports: {
      [mainnet.id]: alchemyApiKey
        ? http(`https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`)
        : http(),
      [bsc.id]: http(),
      [base.id]: alchemyApiKey
        ? http(`https://base-mainnet.g.alchemy.com/v2/${alchemyApiKey}`)
        : http(),
    },
  });

  const appKit = createAppKit({
    adapters: [wagmiAdapter],
    networks,
    projectId,
    defaultNetwork: base,
    metadata: {
      name: (config.public.appName as string) || "Soakverse",
      description: "Soakverse DeFI Platform",
      url:
        typeof window !== "undefined"
          ? window.location.origin
          : "https://app.soakverse.io",
      icons: ["https://app.soakverse.io/favicon-32x32.png"],
    },
    themeMode: "dark",
    themeVariables: {
      "--apkt-accent": "#00b8ff",
      "--apkt-color-mix": "#071d28",
      "--apkt-color-mix-strength": 40,
    },
    features: {
      analytics: false,
    },
  });

  return {
    provide: {
      appKit,
      wagmiConfig: wagmiAdapter.wagmiConfig,
    },
  };
});
