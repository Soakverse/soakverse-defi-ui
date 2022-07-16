import Swal, { SweetAlertOptions } from "sweetalert2";

export default defineNuxtPlugin((nuxtApp) => {
  const options: SweetAlertOptions = {
    buttonsStyling: true,
    showLoaderOnConfirm: true,
    showCancelButton: false,
    heightAuto: false,
  };

  const swal = Swal.mixin(options);

  return {
    provide: {
      swal,
    },
  };
});
