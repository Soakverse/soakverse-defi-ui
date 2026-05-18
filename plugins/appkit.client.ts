import { createAppKit } from "@reown/appkit/vue";
import { buildAppKitConfig } from "~/config/appkit";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const { wagmiAdapter, appKitOptions } = buildAppKitConfig({
    projectId: config.public.walletConnectProjectId as string,
    alchemyApiKey: config.public.alchemyApiKey as string,
    appName: config.public.appName as string,
    appUrl:
      typeof window !== "undefined"
        ? window.location.origin
        : "https://app.soakverse.io",
  });

  const appKit = createAppKit(appKitOptions);

  return {
    provide: {
      appKit,
      wagmiConfig: wagmiAdapter.wagmiConfig,
    },
  };
});
