import { prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core';
import Button from '../../components/ui/button';
import DepositInput from '../../components/ui/input/deposit-input';
import { contractAddress, HexString } from '../../constants/contracts-abi';
import { images } from '../../utilities/images';
import interractionAbi from '../../constants/contracts-abi/interaction.json';
import { ethers } from 'ethers';
import { ChangeEvent, useEffect, useState } from 'react';
import { formatAmount } from '../../utilities/formater';
import { useAccount } from 'wagmi';
import { commonContractError } from '../../utilities/error-handler';
import { useLocation } from 'react-router-dom';
import useTokenHooks from '../../hooks/token-hooks';
import { toast } from 'react-toastify';


const Borrow = () => {
  const location = useLocation();
  const { address: userAddress } = useAccount();
  const { availableToBorrow, fetchBorrowAPR } = useTokenHooks();
  const [initalLoading, setInitialLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenInfo, setTokenInfo] = useState({
    balance: 0,
    borrowAPR: '0',
    availableToBorrow: '0',
  });
  const [form, setForm] = useState({
    firstAmount: '',
  });

  const { currency: tokenAddress, name } = location.state;

  
  const fetchBorrowAmount = async () => {
    if(!userAddress) return
    setInitialLoading(true);
    const availableToBorrowAmount = (await availableToBorrow(
      tokenAddress,
      userAddress as HexString
    )) as number; 
    const formatedAvailableToBorrow =  Number(
      ethers.formatUnits(availableToBorrowAmount)
    ).toFixed(2);   
    const borrowAPR = (await fetchBorrowAPR(tokenAddress)) as number;
    setTokenInfo({
      ...tokenInfo,
      borrowAPR: Number(ethers.formatUnits(borrowAPR)).toFixed(2),
      availableToBorrow: formatedAvailableToBorrow
    });
    setForm({
      ...form,
      firstAmount: formatedAvailableToBorrow
    })
    setInitialLoading(false);
  };

  useEffect(() => {
    fetchBorrowAmount();
  }, [tokenAddress]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const borrowAction = async () => {    
    if(form.firstAmount === '0.00') {
      toast.error("can't borrow a zero amount")
      return
    }

    if(Number(form.firstAmount) > Number(tokenInfo.availableToBorrow)) {
      toast.error("You can't borrow beyound the available borrow balance");
      return;
    };
    const scaledNumber = Math.round(Number(form.firstAmount) * 10 ** 18);
    try {
      setLoading(true);
      const { request } = await prepareWriteContract({
        address: contractAddress.interaction,
        abi: interractionAbi,
        functionName: 'borrow',
        args: [tokenAddress, scaledNumber],
      });
      const { hash } = await writeContract(request);
      if (hash) {
        await waitForTransaction({
          hash,
          confirmations: 1,
        });
      fetchBorrowAmount()
      toast.success('Minting Successful')
      setLoading(false);

      }
    } catch (error) {
      setLoading(false);
      commonContractError(error);
    }
  };



  return (
    <div className="pb-8 max-w-[900px] mx-auto">
      <h1 className="text-bold text-[38px] justify-center text-center">
        Mint aUSD{' '}
      </h1>
      <div className="flex items-center justify-center mb-8">
        <span className="text-[#FFFFFF99] font-montserrat text-[18px]">
          Net Mint APR: {initalLoading ? 0 : tokenInfo.borrowAPR}%
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
        value={form.firstAmount}
        name="firstAmount"
        onChange={onChange}
        topLeft="Mint Amount"
        topRight={
          initalLoading ? (
            <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-white"></div>
          ) : (
            <div>
              {' '}
              <span >Max {name} to Mint</span> {formatAmount(tokenInfo.availableToBorrow)} aUSD
            </div>
          )
        }
        rightCoin={
          <div className="flex items-center">
            <img src={images.asud} alt="coin-icon" width={22} height={22} />
            <div className="text-[16px]/[21px] ml-2 font-montserrat  text-white">
              aUSD
            </div>
          </div>
        }
      />
      <Button
        isLoading={loading}
        disabled={
          loading || form.firstAmount === '0' || form.firstAmount === ''
        }
        onClick={borrowAction}
        variant={'primary'}
        fullWidth
        className="mt-10 h-[70px]"
      >
        {' '}
        Mint{' '}
      </Button>
    </div>
  );
};

export default Borrow;
