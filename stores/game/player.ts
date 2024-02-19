import { defineStore } from "pinia";
// project imports
import axios from "~/plugins/axios.client";

export const usePlayerStore = defineStore({
  id: "Player",
  state: () => ({
    eggz: [],
    name: "test",
  }),
  actions: {
    getName(): string {
      return this.name;
    },
    setName(name: string) {
      this.name = name;
    },
    showName() {
      useNuxtApp().$swal.fire({
        title: "Success",
        text: "Minting successful",
        icon: "success",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-success btn-fill",
        },
      });
    },
  },
});
