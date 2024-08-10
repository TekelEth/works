export interface IMarket {
    icon: string;
    name: string;
    collateral: string;
    mcr: string;
    borrowApr: string;
    tokenPrice: number;
    tvl: string;
    tokenAddress: string;
}

export interface IUser {
    userTokenInfo: {
        address: string ;
        balance: string;
        allowance: string
    }
}

export interface InitalMarketState {
    marketData: IMarket[],
    loading: boolean,
    tokenInfo: IMarket,
    user: IUser
}