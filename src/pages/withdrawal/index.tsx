import { useEffect, useState } from 'react';
import Button from '../../components/ui/button';
import DepositInput from '../../components/ui/input/deposit-input';
import { images } from '../../utilities/images';
import { ICurrency, InitialCurrency } from '../../interface';
import { formatAmount } from '../../utilities/formater';
import { ethers } from 'ethers';
import { contractAddress, HexString } from '../../constants/contracts-abi';
import { prepareWriteContract, readContract, writeContract } from '@wagmi/core';
import { useAccount } from 'wagmi';
import interractionAbi from '../../constants/contracts-abi/interaction.json';
import spotAbi from '../../constants/contracts-abi/spot.json';

type ILK = string | number;


const Withdrawal = () => {
  const [loading, setLoading] = useState(false);
  const { address: userAddress } = useAccount();
  const [currency, setCurrency] = useState<ICurrency>(InitialCurrency);
  const [tokenInfo, setTokenInfo] = useState({
    balance: 0,
    mcr: 0
  });
  
  const fetchTokenPrice = async (address: HexString) => {
    return new Promise((resolve) => {
      resolve(
        readContract({
          abi: interractionAbi,
          address: contractAddress.interaction,
          functionName: 'collateralPrice',
          args: [address],
        })
      );
    });
  };

  const availableToBorrowCalculation = async (address: HexString) => {
    return new Promise((resolve) => {
      resolve(
        readContract({
          abi: interractionAbi,
          address: contractAddress.interaction,
          functionName: 'availableToBorrow',
          args: [address, userAddress],
        })
      );
    });
  };

  const fetchTokenILK = async (address: HexString) => {
    return new Promise((resolve) => {
      resolve(
        readContract({
          abi: interractionAbi,
          address: contractAddress.interaction,
          functionName: 'collaterals',
          args: [address],
        })
      );
    });
  };

  const fetchMCR = async (address: HexString) => {
    const tokenILK = (await fetchTokenILK(address)) as ILK[];
    return new Promise((resolve) => {
      resolve(
        readContract({
          abi: spotAbi,
          address: contractAddress.spot,
          functionName: 'ilks',
          args: [tokenILK[1]],
        })
      );
    });
  };

  const calculateTokenBalance = async () => {
    const mcr = (
      (await fetchMCR(currency.address)) as ILK[]
    )[1] as number;
    const availableToBorrow = (await availableToBorrowCalculation(currency.address)) as number;
    const tokenPrice = (await fetchTokenPrice(currency.address)) as number;
    const formatedMCR = parseInt(ethers.formatUnits(mcr, 27));
    const tokenPriceFormat = parseInt(ethers.formatUnits(tokenPrice));
    const availableToBorrowFormat = ethers.formatUnits(availableToBorrow);    
    const maxWithdrawableAmount = parseInt(availableToBorrowFormat) * (formatedMCR  / tokenPriceFormat);    
  console.log((formatedMCR  / tokenPriceFormat), "fffff");
  
    console.log(maxWithdrawableAmount, "amount");
    

    setTokenInfo({
      ...tokenInfo,
      balance: maxWithdrawableAmount,
      mcr: formatedMCR
    });
  };
  
  useEffect(() => {
    calculateTokenBalance();
  }, [currency, setCurrency]);

  const withdrawalAction = async () => {
    try {      
      if(!tokenInfo.balance || tokenInfo.balance === 0 ) return 0; 
      // calculate 95%
      const actuallWithdrawalAmount = ethers.parseUnits((0.95 * tokenInfo.balance).toString());
      setLoading(true);
      const { request } = await prepareWriteContract({
        address: contractAddress.interaction,
        abi: interractionAbi,
        functionName: 'withdraw',
        args: [userAddress, currency.address, actuallWithdrawalAmount]
      });
        await writeContract(request)
      setLoading(false);
    } catch (error) {
      console.log(error, "errr")
      setLoading(false);
    }

}

  return (
    <div className="pb-8 max-w-[900px] mx-auto">
      <h1 className="text-bold text-[38px] text-center">
        Withdrawal Usdt Collateral{' '}
      </h1>
      <div className="flex mb-8 items-center justify-center">
        <span className="text-[#FFFFFF99] text-center font-montserrat text-[18px]">
          Net Collateral APR: 7.21%
        </span>
        <img
          src={images.sortIcon}
          className="ml-2"
          alt="sort-icon"
          width={12}
          height={12}
        />
      </div>

      <DepositInput
        dropdown
        topLeft="Deposit Amount"
        topRight={`Max ${formatAmount(tokenInfo.balance)} ${currency.name}`}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* <div className="py-8 flex items-center justify-center">
        <img src={images.filter} height={50} width={45} alt="filter-icon" />
      </div> */}

      {/* <DepositInput
        topLeft="New Borrow Limit"
        rightCoin={
          <div className="flex items-center">
            <img src={images.asud} alt="coin-icon" width={22} height={22} />
            <div className="text-[16px]/[21px] ml-2 font-montserrat  text-white">
              aUSD
            </div>
          </div>
        }
      /> */}
      <div className="flex mt-6  justify-center items-center">
        <img
          src={images.danger}
          alt="danger-icon"
          width={19}
          height={19}
          className="mr-2"
        />
        <span className="text-white font-montserrat text-[14px]">
          Borrowing starts from 15 lisUSD. Make a bigger deposit to be able to
          borrow lisUSD
        </span>
      </div>

      <Button onClick={withdrawalAction} isLoading={loading} variant={'primary'} fullWidth className="mt-10 h-[60px]" >
        {' '}
        Withdraw{' '}
      </Button>
    </div>
  );
};

export default Withdrawal;
