// https://chainlist.org/
export const chainDefinition: any = {
  "1": {
    name: "Ethereum",
    shortName: "ETH",
    chainId: 1,
    networkFullName: "Ethereum Mainnet",
    rpcUrl: "https://cloudflare-eth.com/v1/mainnet",
    blockExplorerUrl: "https://etherscan.io",
    currencySymbol: "ETH",
  },
  "5": {
    name: "Goerli",
    shortName: "Goerli",
    chainId: 5,
    networkFullName: "Ethereum Mainnet",
    rpcUrl: "https://goerli.infura.io/v3/",
    blockExplorerUrl: "https://goerli.etherscan.io",
    currencySymbol: "GoerliETH",
  },
  "56": {
    name: "Binance Smart Chain",
    shortName: "BSC",
    chainId: 56,
    networkFullName: "Binance Smart Chain Mainnet",
    rpcUrl: "https://bsc-dataseed1.binance.org",
    blockExplorerUrl: "https://bscscan.com",
    currencySymbol: "BNB",
  },
  "43114": {
    name: "Avalanche Network",
    shortName: "AVAX",
    chainId: 43114,
    networkFullName: "Avalanche C-Chain",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    blockExplorerUrl: "https://snowtrace.io/",
    currencySymbol: "AVAX",
  },
};

export const assetsDefinition: any = {
  "1": {
    WETH: {
      address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      symbol: "WETH",
      name: "Wrapped Ethereum",
      decimals: 18,
      image: null,
    },
    USDC: {
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      image: null,
    },
  },
  "56": {
    WBNB: {
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      symbol: "WBNB",
      name: "Wrapped BNB",
      decimals: 18,
      image: null,
    },
    SKMT: {
      address: "0x1B2fdB1626285B94782af2Fda8e270E95cEbC3b4",
      symbol: "SKMT",
      name: "Soakmont V2",
      decimals: 18,
      image: "https://bscscan.com/token/images/soakmontv2_32.png",
    },
    BUSD: {
      address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
      symbol: "BUSD",
      name: "BUSD",
      decimals: 18,
      image: null,
    },
    XUSD: {
      address: "0x324E8E649A6A3dF817F97CdDBED2b746b62553dD",
      symbol: "XUSD",
      name: "XUSD",
      decimals: 18,
      image: null,
    },
  },
  "43114": {
    WAVAX: {
      address: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
      symbol: "WAVAX",
      name: "Wrapped Avax",
      decimals: 18,
      image: null,
    },
    FAE: {
      address: "0xCD1bb91f4eCa93217421316480cA7D7C315827E5",
      symbol: "FAE",
      name: "Lucky Fairy",
      decimals: 9,
      image: null,
    },
  },
};
