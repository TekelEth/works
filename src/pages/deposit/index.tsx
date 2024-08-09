import Button from '../../components/ui/button';
import DepositInput from '../../components/ui/input/deposit-input';
import { contractAddress, HexString } from '../../constants/contracts-abi';
import { images } from '../../utilities/images';
import { prepareWriteContract, readContract, writeContract } from '@wagmi/core';
import interractionAbi from '../../constants/contracts-abi/interaction.json';
import tokenAbi from '../../constants/contracts-abi/aUSD.json';
import spotAbi from '../../constants/contracts-abi/spot.json';
import { ChangeEvent, useEffect, useState } from 'react';
import { ICurrency, InitialCurrency } from '../../interface';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { formatAmount } from '../../utilities/formater';

type ILK = string | number;

const DepositPage = () => {
  const { address: userAddress } = useAccount();
  const [loading, setLoading] = useState(false);
  const [initalLoading, setInitialLoading] = useState(false);
  const [tokenInfo, setTokenInfo] = useState({
    balance: 0,
    allowance: 0,
    mcr: 0
  });
  const [currency, setCurrency] = useState<ICurrency>(InitialCurrency);
  const [form, setForm] = useState({
    firstAmount: '',
    secondAmount: '',
  });


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  useEffect(() => {
    setForm(({
      ...form,
      secondAmount: (parseInt(form.firstAmount) / tokenInfo.mcr).toString()
    }))
  }, [form.firstAmount])

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

  // check allowance function
  const getAllowance = (collateralAddress: HexString) => {
    return new Promise((resolve)  => {
      resolve(
        readContract({
          abi: tokenAbi,
          address: collateralAddress,
          functionName: 'allowance',
          args: [userAddress,contractAddress.interaction]
        })
      )
    })
  }

  const calculateTokenBalance = async () => {
    setInitialLoading(true)
    const balance = (await fetchTokenTokenBalance(currency.address)) as number;
    const allowance = await getAllowance(currency.address) as number;
    const mcr = (
      (await fetchMCR(currency.address)) as ILK[]
    )[1] as number;
    const formatedMCR = parseInt(ethers.formatUnits(mcr, 27));
    setTokenInfo({
      ...tokenInfo,
      balance: parseInt(ethers.formatUnits(balance)),
      allowance: parseInt(ethers.formatUnits(allowance)),
      mcr: formatedMCR
    });
      setInitialLoading(false)
  };

  useEffect(() => {
    calculateTokenBalance();
  }, [currency, setCurrency]);

  // approve function
  const approveFunction = async (address:HexString, amount: number) => {
    const {request} = await prepareWriteContract({
      address: address,
      abi: tokenAbi,
      functionName: 'approve',
      args: [contractAddress.interaction, ethers.parseUnits(amount.toString())]
    });

    await writeContract(request);
  }

  const depositFunction = async (address: HexString, amount: string) => {
      const { request } = await prepareWriteContract({
        address: contractAddress.interaction,
        abi: interractionAbi,
        functionName: 'deposit',
        args: [userAddress, address, ethers.parseUnits(amount)]
      });

      await writeContract(request);
  }

  // deposit function
  const depositHandler = () => {    
    try {
      setLoading(true);
      if(parseInt(form.firstAmount) > tokenInfo.allowance) {
        const amountDifference = parseInt(form.firstAmount) - tokenInfo.allowance;
        approveFunction(currency.address, amountDifference).then(() => {
          depositFunction(currency.address, amountDifference.toString())
        }).then(() => {
          setLoading(false);
        })
      }else {
        depositFunction(currency.address, form.firstAmount).then(() => {
          calculateTokenBalance()
          setLoading(false);
          setForm({
            firstAmount: '',
            secondAmount: ''
          })
        })
      }
    } catch (error) {
      setLoading(false)
    }

  }

  return (
    <div className="pb-8 max-w-[900px] mx-auto">
      <h1 className="text-bold mb-8 text-[38px] text-center">
        Deposit Collateral
      </h1>
      <DepositInput
        dropdown
        value={form.firstAmount}
        name='firstAmount'
        onChange={onChange}
        topLeft="Deposit Amount"
        topRight={initalLoading ? <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-white"></div> : <div> <span>Max</span> {formatAmount(tokenInfo.balance)} {currency.name} </div>}
        currency={currency}
        setCurrency={setCurrency}
      />

      <div className="py-8 flex items-center justify-center">
        <img src={images.filter} height={50} width={45} alt="filter-icon" />
      </div>

      <DepositInput
        name='secondAmount'
        value={form.secondAmount}
        topLeft="New Borrow Limit"
        rightCoin={
          <div className="flex items-center">
            <img src={images.asud} alt="coin-icon" width={22} height={22} />
            <div className="text-[16px]/[21px] ml-2 font-montserrat  text-white">
              aUSD
            </div>
          </div>
        }
      />
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
      <Button isLoading={loading} disabled={form.firstAmount.length === 0 || loading} onClick={depositHandler} variant={'primary'} fullWidth className="mt-10 h-[60px]">
        {' '}
        Deposit{' '}
      </Button>
    </div>
  );
};

export default DepositPage;



  // const [netDepositLimit, setNetDepositLimit] = useState(0);

  // const fetchLocked = async() => {
  //   return new Promise((resolve) => {
  //     resolve(
  //       readContract({
  //         abi: interractionAbi,
  //         address: contractAddress.interaction,
  //         functionName: 'locked',
  //         args: []
  //       })
  //     )
  //   })
  // }

  // const fetchTokenILK = async(address: HexString) => {
  //   return new Promise((resolve) => {
  //     resolve(
  //       readContract({
  //         abi: interractionAbi,
  //         address: contractAddress.interaction,
  //         functionName: 'collaterals',
  //         args: [address]
  //       })
  //     )
  //   })
  // }

  
  // const fetchMCR = async (address: HexString) => {
  //   const tokenILK = await fetchTokenILK(address) as ILK[];
  //   return new Promise((resolve) => {
  //     resolve(
  //       readContract({
  //         abi: spotAbi,
  //         address: contractAddress.spot,
  //         functionName: 'ilks',
  //         args: [tokenILK[1]] 
  //       })
  //     )
  //   })
  // }

  // const fetchNetDepositLimit = async () => {
  //   const mcr = await fetchMCR(contractAddress.wbbtc);;
  //   const fetchedLocked = await fetchLocked();
  // }

  // useEffect(() => {
  //   fetchNetDepositLimit()
  // }, [])