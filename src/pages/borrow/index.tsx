import { prepareWriteContract, readContract, writeContract } from '@wagmi/core';
import Button from '../../components/ui/button';
import DepositInput from '../../components/ui/input/deposit-input';
import { contractAddress, HexString } from '../../constants/contracts-abi';
import { images } from '../../utilities/images';
import interractionAbi from '../../constants/contracts-abi/interaction.json';
import { ethers } from 'ethers';
import { ChangeEvent, useEffect, useState } from 'react';
import { ICurrency, InitialCurrency } from '../../interface';
import { formatAmount } from '../../utilities/formater';
import tokenAbi from '../../constants/contracts-abi/aUSD.json';
import { useAccount } from 'wagmi';
import spotAbi from '../../constants/contracts-abi/spot.json';

const Borrow = () => {  
  type ILK = string | number;
  const { address: userAddress } = useAccount();
  const [currency, setCurrency] = useState<ICurrency>(InitialCurrency);
  const [initalLoading, setInitialLoading] = useState(false);
  const [loading,setLoading] = useState(false);
  const [tokenInfo, setTokenInfo] = useState({
    balance: 0,
    borrowAPR: 0,
    netBorrowLimit: 0,
  });
  const [form, setForm] = useState({
    firstAmount: '',
  });


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const borrowAction = async () => {    
    try {
      setLoading(true);
      const { request } = await prepareWriteContract({
        address: contractAddress.interaction,
        abi: interractionAbi,
        functionName: 'borrow',
        args: [ currency.address, ethers.parseUnits(form.firstAmount)]
      });
  
      await writeContract(request);
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const fetchTokenTokenBalance = async (address: HexString) => {
    return new Promise((resolve) => {
      resolve(
        readContract({
          abi: tokenAbi,
          address: address,
          functionName: 'balanceOf',
          args: [userAddress],
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

  const fetchBorrowAPR = async (address: HexString) => {
    return new Promise((resolve) => {
      resolve(
        readContract({
          address: contractAddress.interaction,
          abi: interractionAbi,
          functionName: 'borrowApr',
          args: [address],
        })
      );
    });
  };

  
  const lockedBorrow = async (address: HexString) => {
    return new Promise((resolve) => {
      resolve(
        readContract({
          address: contractAddress.interaction,
          abi: interractionAbi,
          functionName: 'locked',
          args: [address, userAddress]
        })
      );
    });
  };

  const calculateTokenBalance = async () => {
    const {address} = currency;
    setInitialLoading(true)
    const balance = (await fetchTokenTokenBalance(address)) as number;
    const borrowAPR = (await fetchBorrowAPR(address)) as number;
    const locked = await lockedBorrow(address)  as number
    console.log(locked);
    
    const mcr = (
      (await fetchMCR(address)) as ILK[]
    )[1] as number;
    const formatedMCR = parseInt(ethers.formatUnits(mcr, 27));
    const formatedLocked =  parseInt(ethers.formatUnits(locked))
    const netBorrowLimit = formatedLocked / formatedMCR

    setTokenInfo({
      ...tokenInfo,
      balance: parseInt(ethers.formatUnits(balance)),
      netBorrowLimit,
      borrowAPR: parseInt(ethers.formatUnits(borrowAPR)),

    });
      setInitialLoading(false)
  };

  useEffect(() => {
    calculateTokenBalance();
  }, [currency, setCurrency]);

  console.log(tokenInfo)

  return (
    <div className="pb-8 max-w-[900px] mx-auto">
      <h1 className="text-bold text-[38px] justify-center text-center">
        Borrow aUSD{' '}
      </h1>
      <div className="flex items-center justify-center mb-8">
        <span className="text-[#FFFFFF99] font-montserrat text-[18px]">
          Net Borrowing APR: {initalLoading ? 0 : tokenInfo.borrowAPR}% 
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
        value={form.firstAmount}
        name='firstAmount'
        onChange={onChange}
        setCurrency={setCurrency}
        currency={currency}
        topLeft="Borrow Amount"
        topRight={initalLoading ? <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-white"></div> : <div> <span>Max</span> {formatAmount(tokenInfo.balance)} {currency.name} </div>}

      />
      <div className="flex mt-6 mx-auto max-w-[700px]  justify-center items-center">
        <img
          src={images.danger}
          alt="danger-icon"
          width={19}
          height={19}
          className=""
        />
        <span className="text-white text-center font-montserrat text-[14px]">
          You are above a 75% borrowing usage. It is recommended that you
          decrease this by repaying loans or providing more collateral to lower
          the risk of a liquidation event
        </span>
      </div>

      <Button isLoading={loading} disabled={loading || form.firstAmount === '0' || form.firstAmount === ''} onClick={borrowAction} variant={'primary'} fullWidth className="mt-10 h-[70px]">
        {' '}
        Borrow{' '}
      </Button>
    </div>
  );
};

export default Borrow;
