import { ChangeEvent, useEffect, useState } from 'react';
import Button from '../../components/ui/button';
import DepositInput from '../../components/ui/input/deposit-input';
import { collateralAddresses, contractAddress, HexString } from '../../constants/contracts-abi';
import useTokenHooks from '../../hooks/token-hooks';
import { images } from '../../utilities/images';
import { ethers } from 'ethers';
import { ICurrency, InitialCurrency } from '../../interface';
import interractionAbi from '../../constants/contracts-abi/interaction.json';
import { toast } from 'react-toastify';
import { commonContractError } from '../../utilities/error-handler';
import { prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core';
import { useAccount } from 'wagmi';
import ModalContainer from '../../components/modal';
import ApproveModal from '../deposit/approve';

const Repay = () => {
  const [loading, setLoading] = useState(false);
  const {address: userAddress} = useAccount();
  const [approveModal, setApproveModal] = useState(false);
  const [currency, setCurrency] = useState<ICurrency>(InitialCurrency);
  const [form, setForm] = useState({
    firstAmount: '',
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
  


  useEffect(() => {
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
        topRight={`Max ${borrowInfo.borrowed} USDT`}
        rightCoin={
          <div className="flex items-center">
            <img src={images.asud} alt="coin-icon" width={22} height={22} />
            <div className="text-[16px]/[21px] ml-2 font-montserrat  text-white">
              aUSD
            </div>
          </div>
        }
      />
      {/* <div className="flex mt-6 mx-auto max-w-[700px]  justify-center items-center">
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
      </div> */}

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
