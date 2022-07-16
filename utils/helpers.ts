export function formatWalletAddress(address: string): string {
  return address.slice(0, 6) + "..." + address.slice(-4);
}

export function showLoader() {
  if (process.client) {
    const loader: any = document.getElementById("global-loader");
    if (loader) {
      loader.classList.add("show");
    }
  }
}

export function hideLoader() {
  if (process.client) {
    const loader: any = document.getElementById("global-loader");
    if (loader) {
      loader.classList.remove("show");
    }
  }
}
