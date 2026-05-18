import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, bsc, base, type AppKitNetwork } from "@reown/appkit/networks";
import { http } from "viem";

export const buildAppKitConfig = (opts: {
  projectId: string;
  alchemyApiKey?: string;
  appName?: string;
  appUrl: string;
}) => {
  const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, bsc, base];

  const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId: opts.projectId,
    transports: {
      [mainnet.id]: opts.alchemyApiKey
        ? http(`https://eth-mainnet.g.alchemy.com/v2/${opts.alchemyApiKey}`)
        : http(),
      [bsc.id]: http(),
      [base.id]: opts.alchemyApiKey
        ? http(`https://base-mainnet.g.alchemy.com/v2/${opts.alchemyApiKey}`)
        : http(),
    },
  });

  const appKitOptions = {
    adapters: [wagmiAdapter],
    networks,
    projectId: opts.projectId,
    defaultNetwork: base,
    metadata: {
      name: opts.appName || "Soakverse",
      description: "Soakverse DeFI Platform",
      url: opts.appUrl,
      icons: ["https://app.soakverse.io/favicon-32x32.png"],
    },
    themeMode: "dark" as const,
    themeVariables: {
      "--apkt-accent": "#e9a546",
      "--apkt-qr-color": "#ffffff",
      "--apkt-font-family": "Poppins, sans-serif",
    },
    features: {
      analytics: false,
      email: false,
      socials: false as const,
      emailShowWallets: false,
      reownBranding: false,
    },
  };

  return { wagmiAdapter, appKitOptions };
};
