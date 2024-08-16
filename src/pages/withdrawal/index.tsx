import { ChangeEvent, useEffect, useState } from 'react';
import Button from '../../components/ui/button';
import DepositInput from '../../components/ui/input/deposit-input';
import { images } from '../../utilities/images';
import { ICurrency, InitialCurrency } from '../../interface';
import { formatAmount } from '../../utilities/formater';
import { ethers } from 'ethers';
import { contractAddress, HexString, ILK } from '../../constants/contracts-abi';
import {
  prepareWriteContract,
  readContract,
  waitForTransaction,
  writeContract,
} from '@wagmi/core';
import { useAccount } from 'wagmi';
import interractionAbi from '../../constants/contracts-abi/interaction.json';
import { useAppDispatch } from '../../redux/dispatch';
import AmountLoader from '../../components/ui/loader/amount-loader';
import { fetchIndividualMerketData } from '../../redux/slices/market';
import { commonContractError } from '../../utilities/error-handler';
import { toast } from 'react-toastify';
import useTokenHooks from '../../hooks/token-hooks';
import { CircularProgressBar } from '../../components/progressbar';

const Withdrawal = () => {
  const dispatch = useAppDispatch();
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { address: userAddress } = useAccount();
  const [currency, setCurrency] = useState<ICurrency>(InitialCurrency);
  const [maxBorrow, setMaxBorrow] = useState({
    max: '0',
    limit: '0'
  });
  const [amount, setAmount] = useState('');
  const { fetchMCR, fetchTokenPrice, lockedBorrow } = useTokenHooks();

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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const allowedWithdrawalAmount = 0.95 * Number(maxBorrow);
    const inputValue = e.target.value;
    if (Number(inputValue) > allowedWithdrawalAmount) {
      return;
    } else {
      setAmount(inputValue);
    }
  };

  const calculateTokenBalance = async () => {
    if(!userAddress) return ;
    setLoading(true);
    const availableToBorrow = (await availableToBorrowCalculation(
      currency.address
    )) as number;
    const tokenPrice = (await fetchTokenPrice(currency.address)) as number;
    const mcr = ((await fetchMCR(currency.address)) as ILK[])[1] as number;
    const locked = await lockedBorrow(currency.address, userAddress) as number;
    const formatedMCR = Number(ethers.formatUnits(mcr, 27)).toFixed(2);
    const formatedLocked = Number(ethers.formatUnits(locked));
    console.log(formatedLocked, "locked");
    
    const formatedTokenPrice = Number(ethers.formatUnits(tokenPrice));
    const availableToBorrowFormat = ethers.formatEther(availableToBorrow);
    const maxWithdrawableAmount =
      Number(availableToBorrowFormat) *
      (Number(formatedMCR) / formatedTokenPrice);
    setMaxBorrow({
      max: maxWithdrawableAmount.toFixed(2).toString(),
      limit: (formatedLocked / Number(formatedMCR)).toFixed(2)
    });
    setLoading(false);
  };

  useEffect(() => {
    dispatch(fetchIndividualMerketData(currency.address));
    calculateTokenBalance();
  }, [currency, setCurrency]);

  const withdrawalAction = async () => {
    try {
      if (!maxBorrow || Number(maxBorrow) === 0) return 0;
      setProcessing(true);
      const { request } = await prepareWriteContract({
        address: contractAddress.interaction,
        abi: interractionAbi,
        functionName: 'withdraw',
        args: [userAddress, currency.address, amount],
      });
      const { hash } = await writeContract(request);
      if (hash) {
        await waitForTransaction({
          hash,
          confirmations: 1,
        });
        setProcessing(false);
        toast.success('Withdrawal Sucessfull');
        setAmount('');
      }
    } catch (error) {
      setProcessing(false);
      commonContractError(error);
    }
  };

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
        value={amount}
        onChange={onChange}
        topLeft="Withdrawal Amount"
        topRight={

          loading ? (
            <AmountLoader />
          ) : (
            <div>
              {' '}
              <span>Max</span> ${formatAmount(maxBorrow.max)} {currency.name}{' '}
            </div>
          )
        }
        currency={currency}
        setCurrency={setCurrency}
      />
    <br />
    <DepositInput
        value={maxBorrow.limit}
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

      <div className='border-[#FFFFFF4D] px-[34px] h-[230px] border flex items-center justify-between bg-[#FFFFFF0D] rounded-[15px] mt-10'>
        <span className="text-[14px] mr-2 text-[#FFFFFFCC] font-montserrat"> Borrow Utilizaton </span>
        <CircularProgressBar progress={80} />
      
        <span className="text-[14px] mr-2 text-[#FFFFFFCC] font-montserrat">Withdrawal Limit {maxBorrow.max} aUSD</span>
      </div>
    
      <Button
        isLoading={processing}
        onClick={withdrawalAction}
        variant={'primary'}
        fullWidth
        className="mt-10 h-[60px]"
      >
        {' '}
        Withdraw{' '}
      </Button>
    </div>
  );
};

export default Withdrawal;
