import { ChangeEvent, useEffect, useState } from 'react';
import Button from '../../components/ui/button';
import DepositInput from '../../components/ui/input/deposit-input';
import { collateralAddresses, contractAddress, HexString, ILK } from '../../constants/contracts-abi';
import useTokenHooks from '../../hooks/token-hooks';
import { images } from '../../utilities/images';
import { ethers } from 'ethers';
import { ICurrency, InitialCurrency } from '../../interface';
import interractionAbi from '../../constants/contracts-abi/interaction.json';
import { toast } from 'react-toastify';
import { commonContractError } from '../../utilities/error-handler';
import { prepareWriteContract, readContract, waitForTransaction, writeContract } from '@wagmi/core';
import { useAccount } from 'wagmi';
import ModalContainer from '../../components/modal';
import ApproveModal from '../deposit/approve';
import Utilization from '../dashboard/components/utilization';

const Repay = () => {
  const [loading, setLoading] = useState(false);
  const {address: userAddress} = useAccount();
  const { fetchMCR, fetchTokenPrice, lockedBorrow } = useTokenHooks();
  const [approveModal, setApproveModal] = useState(false);
  const [currency, setCurrency] = useState<ICurrency>(InitialCurrency);
  const [form, setForm] = useState({
    firstAmount: '',
  });

  const [maxBorrow, setMaxBorrow] = useState({
    max: '0',
    limit: '0',
    utilization: 0,
    mcr: '0'
  });

  const { fetchUserBorrowedBalance, getAllowanceinfo,  } = useTokenHooks();
  const [borrowInfo, setBorrowInfo] = useState({
    borrowed: '0',
    allowance: '0'
  })

  const fetchAllowance = async () => {
    const allowance = await getAllowanceinfo(contractAddress.ausd, userAddress)
    return allowance;
  }

  const fetchBorrowInfo = async (addresses: HexString[]) => {
    const fetchBorrowed = await Promise.all(addresses.map(fetchUserBorrowedBalance))
    const totalBorrowed = (await fetchBorrowed.reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue
    )) as string;

    setBorrowInfo({
      ...borrowInfo,
      borrowed: Number(ethers.formatUnits(totalBorrowed)).toFixed(2),
    })
  };


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
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
    const formatedTokenPrice = Number(ethers.formatUnits(tokenPrice));
    const availableToBorrowFormat = ethers.formatEther(availableToBorrow);
    const maxWithdrawableAmount =
      Number(availableToBorrowFormat) *
      (Number(formatedMCR) / formatedTokenPrice);
    setMaxBorrow({
      ...maxBorrow,
      max: maxWithdrawableAmount.toFixed(2).toString(),
      limit: (formatedLocked / Number(formatedMCR)).toFixed(2),
  
    });
    setLoading(false);
  };



  useEffect(() => {
    calculateTokenBalance()
    fetchBorrowInfo(collateralAddresses)
    setCurrency(InitialCurrency);
  }, [])
  const { firstAmount } = form;
  
  const repayAction = async () => {    
    const allowance = await fetchAllowance() as number
    if(firstAmount === '0.00') {
      toast.error("can't borrow a zero amount")
      return
    }
    if(Number(firstAmount) > Number(borrowInfo.borrowed)) {
      toast.error("You can't repay beyound availble aUSD");
      return;
    };    
    if (Number(firstAmount) > Number(ethers.formatUnits(allowance))) {
      setApproveModal(true);
      return;
    }
    const scaledNumber = Math.round(Number(form.firstAmount) * 10 ** 18);
    try {
      setLoading(true);
      const { request } = await prepareWriteContract({
        address: contractAddress.interaction,
        abi: interractionAbi,
        functionName: 'payback',
        args: [currency.address, scaledNumber],
      });
      const { hash } = await writeContract(request);
      if (hash) {
        await waitForTransaction({
          hash,
          confirmations: 1,
        });
      fetchBorrowInfo(collateralAddresses)
      toast.success('Repay Successful')
      setLoading(false);

      }
    } catch (error) {
      setLoading(false);
      commonContractError(error);
    }
  };
  
  console.log(borrowInfo.allowance, "aaa");
  

  return (
    <div className="pb-8 max-w-[900px] mx-auto">
      <h1 className="text-bold text-[38px] text-center">Repay aUSD</h1>
      <div className="flex items-center mb-8 justify-center">
        <span className="text-[#FFFFFF99] font-montserrat text-[18px]">
          Your debt: {borrowInfo.borrowed} aUSd
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
        name="firstAmount"
        currency={currency}
        setCurrency={setCurrency}
        onChange={onChange}
        topLeft="Repay Amount"
        topRight={`Max ${borrowInfo.borrowed} aUSD`}
        rightCoin={
          <div className="flex items-center">
            <img src={images.asud} alt="coin-icon" width={22} height={22} />
            <div className="text-[16px]/[21px] ml-2 font-montserrat  text-white">
              aUSD
            </div>
          </div>
        }
      />
    <Utilization maxBorrow={maxBorrow} />
      <Button 
        variant={'primary'} 
        fullWidth className="mt-10 h-[70px]"
        isLoading={loading}
        disabled={
          loading || form.firstAmount === '0' || form.firstAmount === ''
        }
        onClick={repayAction}
        >
        {' '}
        Proceed
      </Button>
      {approveModal && (
        <ModalContainer
          close={() => setApproveModal(false)}
          open={approveModal}
        >
          <ApproveModal
            address={contractAddress.ausd}
            amount={form.firstAmount}
            setModal={setApproveModal}
          />
        </ModalContainer>
      )}
    </div>
  );
};

export default Repay;
