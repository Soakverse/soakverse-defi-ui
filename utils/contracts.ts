import soakmontAbi from "./abi/soakmontToken.json";
import soakmontStakingContractAbi from "./abi/soakmontStakingContract.json";
import soakverseOGsNFTAbi from "./abi/soakverseOGsNFT.json";
import soakverseDAOPassNFTAbi from "./abi/soakverseDAOPassNFT.json";
import eggzNFTAbi from "./abi/eggzNFT.json";
import wizhNFTAbi from "./abi/wizhNFT.json";
import spocAbi from "./abi/spocToken.json";
import {
  SmartContractDefinition,
  TokenSmartContractDefinition,
} from "~~/types/blockchain/BlockchainTypes";

export const soakmontTokenContract: TokenSmartContractDefinition = {
  address: "0x1b2fdb1626285b94782af2fda8e270e95cebc3b4",
  abi: soakmontAbi.abi,
  decimals: 18,
  name: "Soakmont V2",
  ticker: "SKMT",
  chainId: 56,
};

export const soakmontStakingContract: SmartContractDefinition = {
  address: "0xF5Da615989DadbD552E3479d79e8e7f34EcA9832",
  abi: soakmontStakingContractAbi.abi,
  name: "SKMT Staking",
  ticker: "StakedSKMT",
  chainId: 56,
};

export const soakverseOGsSmartContract: SmartContractDefinition = {
  address: "0x2019f1aa40528e632b4add3b8bcbc435dbf86404",
  abi: soakverseOGsNFTAbi.abi,
  name: "Soakverse OGs",
  ticker: "STACH",
  chainId: 1,
};

export const soakverseDAOPassSmartContract: SmartContractDefinition = {
  address: "0x80233f7b42b503b09fc1cff0894912cbcda816e6",
  abi: soakverseDAOPassNFTAbi.abi,
  name: "Soakverse DAO Pass",
  ticker: "SOAKDAO",
  chainId: 1,
};

export const eggzSmartContract: SmartContractDefinition = {
  address: "0x10b366bbf2304b52806b1c9881fc259bd9018d43",
  abi: eggzNFTAbi.abi,
  name: "Eggz By Soakverse",
  ticker: "EGGZ",
  chainId: 1,
};

export const wizhSmartContract: SmartContractDefinition = {
  address: "0x72684a8cbb13183a8bf407a468591b8306f61d99",
  abi: wizhNFTAbi.abi,
  name: "Wizh By Soakverse",
  ticker: "WIZH",
  chainId: 1,
};

export const spocTokenContract: TokenSmartContractDefinition = {
  address: "0xec8b02022035cebbc205eeb78818e88017034235",
  abi: spocAbi.abi,
  decimals: 18,
  name: "Soakverse Proof Of Contribution",
  ticker: "SPOC",
  chainId: 56,
};

export const spocStakingContract: SmartContractDefinition = {
  address: "0x2AE33aa09ADbe84De47D8b5C08df3D1dFaE17f02",
  abi: soakmontStakingContractAbi.abi,
  name: "Staked Soakverse Proof Of Contribution",
  ticker: "StakedSPOC",
  chainId: 56,
};
