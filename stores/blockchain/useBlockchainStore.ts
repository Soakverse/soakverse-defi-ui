import { switchNetwork, PublicClient } from "@wagmi/core";
import { defineStore } from "pinia";

export const useBlockchainStore = defineStore("blockchain", {
  state: () => ({
    initialized: false,
    client: null as PublicClient | null,
    currentAccount: null as string | null,
    currentChain: null as number | null,
  }),
  actions: {
    initBlockchainStore() {
      if (this.initialized) return;

      const {
        $getAccount,
        $getNetwork,
        $watchAccount,
        $watchNetwork,
        $publicClient,
      } = useNuxtApp();

      this.client = $publicClient;
      const initialAccount = $getAccount();
      const initialNetwork = $getNetwork();

      this.currentAccount = initialAccount.address || null;
      this.currentChain = initialNetwork.chain?.id || null;

      $watchAccount((account: { address?: string }) => {
        this.currentAccount = account.address || null;
      });

      $watchNetwork((network: { chain?: { id: number } }) => {
        this.currentChain = network.chain?.id || null;
      });

      this.initialized = true;
    },
    async switchCurrentNetwork(chainId: number) {
      await switchNetwork({ chainId });
    },
  },
});
