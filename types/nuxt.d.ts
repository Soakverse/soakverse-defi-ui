// nuxt.d.ts
import Vue from "vue";
import Swal, { SweetAlert2 } from "sweetalert2";
import { GetAccountResult, GetNetworkResult, PublicClient } from "@wagmi/core";

declare function useNuxtApp(): NuxtApp;

declare module "#app" {
  interface NuxtApp {
    $swal: SweetAlert2;
    $publicClient: PublicClient;
    $getAccount: Function;
    $getNetwork: Function;
    $watchAccount: Function;
    $watchNetwork: Function;
  }
}
declare module "@nuxt/types" {
  interface NuxtApp {
    $swal: MySwalInterface;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $swal: MySwalInterface;
  }
}

// If you're using Composition API, you might also want to extend the type for `useNuxtApp`
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $swal: MySwalInterface;
  }
}
