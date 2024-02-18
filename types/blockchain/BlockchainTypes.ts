type BlockchainDefinition = {
  name: string;
  shortName: string;
  chainId: number;
  networkFullName: string;
  rpcUrl: string;
  blockExplorerUrl: string;
  currencySymbol: string;
};

type BlockchainDefinitionRegistry = {
  [key: string]: BlockchainDefinition;
};

type AssetDefinition = {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  image: string | null;
};

type AssetsDefinitionRegistry = {
  [chainId: string]: {
    [assetKey: string]: AssetDefinition;
  };
};

type SmartContractDefinition = {
  address: string;
  abi: any[];
  name: string;
  ticker: string;
  chainId: number;
};

interface TokenSmartContractDefinition extends SmartContractDefinition {
  decimals: number;
}

export type {
  BlockchainDefinition,
  BlockchainDefinitionRegistry,
  AssetDefinition,
  AssetsDefinitionRegistry,
  SmartContractDefinition,
  TokenSmartContractDefinition,
};
