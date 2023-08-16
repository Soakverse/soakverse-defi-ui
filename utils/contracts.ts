import soakmontAbi from "./abi/soakmontToken.json";
import soakmontStakingContractAbi from "./abi/soakmontStakingContract.json";
import soakverseOGsNFTAbi from "./abi/soakverseOGsNFT.json";
import eggzNFTAbi from "./abi/eggzNFT.json";
import wizhNFTAbi from "./abi/wizhNFT.json";
import spocAbi from "./abi/spocToken.json";

export type SmartContractDefinition = {
  address: string;
  abi: any[];
};

export interface TokenSmartContractDefinition extends SmartContractDefinition {
  decimals: number;
}

export const soakmontTokenContract: TokenSmartContractDefinition = {
  address: "0x1b2fdb1626285b94782af2fda8e270e95cebc3b4",
  abi: soakmontAbi.abi,
  decimals: 18,
};

export const soakmontStakingContract: SmartContractDefinition = {
  address: "0xF5Da615989DadbD552E3479d79e8e7f34EcA9832",
  abi: soakmontStakingContractAbi.abi,
};

export const soakverseOGsSmartContract: SmartContractDefinition = {
  address: "0x2019f1aa40528e632b4add3b8bcbc435dbf86404",
  abi: soakverseOGsNFTAbi.abi,
};

export const eggzSmartContract: SmartContractDefinition = {
  address: "0x10b366bbf2304b52806b1c9881fc259bd9018d43",
  abi: eggzNFTAbi.abi,
};

export const wizhSmartContract: SmartContractDefinition = {
  address: "0x72684a8cbb13183a8bf407a468591b8306f61d99",
  abi: wizhNFTAbi.abi,
};

export const spocTokenContract: TokenSmartContractDefinition = {
  address: "0xec8b02022035cebbc205eeb78818e88017034235",
  abi: spocAbi.abi,
  decimals: 18,
};

export const spocStakingContract: SmartContractDefinition = {
  address: "0x2AE33aa09ADbe84De47D8b5C08df3D1dFaE17f02",
  abi: soakmontStakingContractAbi.abi,
};
