// nuxt.d.ts
import Vue from "vue";
import Swal from "sweetalert2";

// If `$swal` is a customized version or wrapper, define its interface accordingly
interface MySwalInterface {
  fire: (options: Swal.SweetAlertOptions) => Promise<Swal.SweetAlertResult>;
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
