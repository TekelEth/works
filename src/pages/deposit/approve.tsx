import React, { Dispatch, SetStateAction, useState } from 'react'
import Button from '../../components/ui/button';
import { HexString } from '../../constants/contracts-abi';
import useTokenHooks from '../../hooks/token-hooks';
import { waitForTransaction } from '@wagmi/core';
import { toast } from 'react-toastify';

interface IProp {
    amount: string;
    setModal: Dispatch<SetStateAction<boolean>>;
    address: HexString
}


const ApproveModal = ({amount, setModal, address}: IProp) => {
  const [loading, setLoading] = useState(false);

    const { approveFunction } = useTokenHooks();
    const approveAction = async () => {
        setLoading(true)
        const {hash} = await approveFunction(address, Number(amount))
        if(hash) {
            const data = await waitForTransaction({
              hash,
              confirmations: 1
            });
            if(data) {
              setLoading(false)
              setModal(false);
              toast.success('Approved Successfully')
            }
        }
    }
  return (
    <div className='bg-black shadow-lg w-[500px] p-12 rounded-[16px] h-[300px]'>
        <h1 className="text-bold mb-8 text-[22px] text-center">
            Approve Deposit
        </h1>
      <div className="w-full border rounded-[7px] px-4 flex items-center justify-between border-[#302E2E] bg-[#FFFFFF0D] h-[65px]">
        <h2 className=' font-bold text-white text-[25px] font-montserrat'> {amount}</h2>
      </div>
      <Button isLoading={loading} onClick={approveAction} variant={'primary'} fullWidth className="mt-5 h-[60px]">
        Approve
     </Button>      
    </div>
  )
}

export default ApproveModal