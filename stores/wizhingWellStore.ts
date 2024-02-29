import { defineStore } from 'pinia';
import { showLoader, hideLoader } from '~~/utils/helpers';

export const useWizhingWellStore = defineStore({
  id: 'WizhingWellStore',
  state: () => ({
    name: 'test',
  }),
  actions: {
    async triggerAction1() {
      showLoader();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await this.actionCallback();
      hideLoader();
      return this.name;
    },
    triggerAction2() {
      const nuxtApp = useNuxtApp();
      nuxtApp.$swal.fire({
        title: 'Success',
        text: 'Minting successful',
        icon: 'success',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-success btn-fill',
        },
      });
    },
    triggerAction3() {
      console.log('ACTION 3');
    },
    triggerAction4(newName: string) {
      this.name = newName;
    },
    async actionCallback() {
      this.triggerAction2();
    },
  },
});
