import { DateTime, Interval } from "luxon";

export function formatWalletAddress(address: string): string {
  return address.slice(0, 6) + "..." + address.slice(-4);
}

export const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

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

export function filterArrayOfObjects(array: any[], value: any) {
  var result = array.filter(function (o: { tokenId: any }) {
    return o.tokenId == value;
  });

  return result ? result[0] : null; // or undefined
}

export function formatDaysSinceDate(date: string) {
  const luxonPastDate = DateTime.fromISO(date);
  const luxonNowDate = DateTime.now();
  const diff = Interval.fromDateTimes(luxonPastDate, luxonNowDate);
  const diffDays = diff.length("days");
  return diffDays;
}

export function formatDateInTimezone(date: string) {
  const luxonDate = DateTime.fromISO(date);
  return luxonDate.toFormat("yyyy-MM-dd hh:mm");
}
