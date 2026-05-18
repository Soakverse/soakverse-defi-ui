import Swal from "sweetalert2";

export default defineNuxtPlugin((nuxtApp) => {
  const options = {
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
