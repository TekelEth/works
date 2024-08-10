import Button from '../../components/ui/button';
import DepositInput from '../../components/ui/input/deposit-input';
import { contractAddress, HexString } from '../../constants/contracts-abi';
import { images } from '../../utilities/images';
import { prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core';
import interractionAbi from '../../constants/contracts-abi/interaction.json';
import tokenAbi from '../../constants/contracts-abi/aUSD.json';
import { ChangeEvent, useEffect, useState } from 'react';
import { ICurrency, InitialCurrency } from '../../interface';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { formatAmount } from '../../utilities/formater';
import { useAppDispatch, useAppSelector } from '../../redux/dispatch';
import { fetchIndividualMerketData, getUserInfo } from '../../redux/slices/market';
import tokenHooks from '../../hooks/token-hooks';
import { commonContractError } from '../../utilities/error-handler';
import AmountLoader from '../../components/ui/loader/amount-loader';


const DepositPage = () => {
  const dispatch = useAppDispatch();
  const [currency, setCurrency] = useState<ICurrency>(InitialCurrency);
  const { tokenInfo, user } = useAppSelector(state => state.market);
  const { address: userAddress } = useAccount();
  const  {fetchTokenBalance, getAllowanceinfo} = tokenHooks()
  const [loading, setLoading] = useState(false);
  const [initalLoading, setInitialLoading] = useState(false);
  

  useEffect(() => {
    setCurrency(InitialCurrency)
  }, [])

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
      secondAmount: (Number(form.firstAmount) / Number(tokenInfo.mcr)).toString()
    }))
  }, [form.firstAmount])

  const calculateTokenBalance = async () => {
    setInitialLoading(true)
    const tokenBalance = await fetchTokenBalance(currency.address, userAddress) as number;
    const allowance = await getAllowanceinfo(currency.address, userAddress)
    if(tokenBalance) {
      dispatch(getUserInfo({
        address: currency.address,
        balance: Number(ethers.formatUnits(tokenBalance)).toFixed(2),
        allowance: ethers.formatUnits(allowance as number)
      }))
    }
    setInitialLoading(false)
  };

  useEffect(() => {
    dispatch(fetchIndividualMerketData(currency.address));
    calculateTokenBalance();
  }, [currency, setCurrency]);

  useEffect(() => {
    dispatch(fetchIndividualMerketData(currency.address));
  },[])

  
  const approveFunction = async (address:HexString, amount: number) => {
    const {request} = await prepareWriteContract({
      address: address,
      abi: tokenAbi,
      functionName: 'approve',
      args: [contractAddress.interaction, ethers.parseUnits(amount.toString())]
    });

   return  await writeContract(request);
  }

  const depositFunction = async (address: HexString, amount: string) => {
      const { request } = await prepareWriteContract({
        address: contractAddress.interaction,
        abi: interractionAbi,
        functionName: 'deposit',
        args: [userAddress, address, ethers.parseUnits(amount)]
      });

     return await writeContract(request);
  }

  const depositHandler = async () => {
    try {
      setLoading(true);
      const {allowance} = user.userTokenInfo;
      const {firstAmount} = form;
      console.log(allowance, "aw")
      if(Number(firstAmount) > Number(allowance)) {
      const {hash} = await approveFunction(currency.address, Number(firstAmount));
      if(hash) {
        const data = await waitForTransaction({
          hash,
          confirmations: 1
        });
        if(data) {
         const {hash} = await depositFunction(currency.address, firstAmount);
         const data = await waitForTransaction({
          hash,
          confirmations: 1
        });
        console.log(data, "data")
        }
        setForm({
          firstAmount: '',
          secondAmount: ''
        })
      }
      } else {
        await depositFunction(currency.address, firstAmount);
        setLoading(false)
      }
    } catch (error) {
      setForm({
        firstAmount: '',
        secondAmount: ''
      })
      setLoading(false);
      commonContractError(error)
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
        topRight={initalLoading ? <AmountLoader /> : <div> <span>Max</span> {formatAmount(user.userTokenInfo.balance)} {currency.name} </div>}
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