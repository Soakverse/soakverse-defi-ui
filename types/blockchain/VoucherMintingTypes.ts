export type ERC721Voucher = {
  requestId: string;
  tokens: number[];
  signature: string;
  message: string;
};

export type ERC721Vouchers = {
  [address: string]: ERC721Voucher | undefined;
}[];
