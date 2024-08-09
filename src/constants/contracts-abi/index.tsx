import ausd from './aUSD.json';
import interaction from './interaction.json';
import spot from './spot.json';
import wbbtc from './wbbtc.json';

export const abi = {
  ausd,
  interaction,
  spot,
  wbbtc,
};

export type HexString = `0x${string}`;

export const contractAddress: { [k: string]: HexString } = {
  ausd: '0x620C8A6FC2539C94d900286A2a8b6aB3D4E8e3B9',
  interaction: '0xF662941608059286485d96381aC93Ce8CBf78A52',
  spot: '0xe81d43F7C72b9bA18Dc0f2B9D077E01dc905dd45',
  wbbtc: '0xe88942E18EcEEE177471f4F66e00c981BB752De8',
  ta: '0x9C686dbe0fa9CAdDbB16F4beD47A61797dfDce52',
  tl: '0x921e2D88De991E4e5f609233F2a8b4B7dbf9a138',
  tbx: '0xb218Fa43d1a7d05FC30Dbb08D0f7fdb0ED059073',
};

export const collateralAddresses = [
  contractAddress.wbbtc,
  contractAddress.ta,
  contractAddress.tl,
  contractAddress.tbx,
];
