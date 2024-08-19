import { collateralMarketTokens } from './__mockdata__/tables';
import { HexString } from './constants/contracts-abi';

export interface ICurrency {
  icon: string;
  name: string;
  address: HexString;
}

export const InitialCurrency = {
  icon: collateralMarketTokens[0].icon,
  name: collateralMarketTokens[0].name,
  address: collateralMarketTokens[0].contractAddress,
};


export interface ToatalProp {
  collaterall: string;
  borrowed: string;
  netAsset: string
}
