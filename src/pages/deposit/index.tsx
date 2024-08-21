import Button from '../../components/ui/button';
import DepositInput from '../../components/ui/input/deposit-input';
import { contractAddress, HexString } from '../../constants/contracts-abi';
import { images } from '../../utilities/images';
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from '@wagmi/core';
import interractionAbi from '../../constants/contracts-abi/interaction.json';
import { ChangeEvent, useEffect, useState } from 'react';
import { ICurrency, InitialCurrency } from '../../interface';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { formatAmount } from '../../utilities/formater';
import { useAppDispatch, useAppSelector } from '../../redux/dispatch';
import {
  fetchIndividualMerketData,
  getUserInfo,
} from '../../redux/slices/market';
import { commonContractError } from '../../utilities/error-handler';
import AmountLoader from '../../components/ui/loader/amount-loader';
import useTokenHooks from '../../hooks/token-hooks';
import { toast } from 'react-toastify';
import ApproveModal from './approve';
import ModalContainer from '../../components/modal';
import { useLocation } from 'react-router-dom';
import { collateralMarketTokens } from '../../__mockdata__/tables';

const DepositPage = () => {
  const dispatch = useAppDispatch();
  const [currency, setCurrency] = useState<ICurrency>(InitialCurrency);
  const { tokenInfo, user } = useAppSelector((state) => state.market);
  const { address: userAddress } = useAccount();
  const { fetchTokenBalance, getAllowanceinfo } = useTokenHooks();
  const [loading, setLoading] = useState(false);
  const [initalLoading, setInitialLoading] = useState(false);
  const [depositType] = useState('');
  const [approveModal, setApproveModal] = useState(false);
  const location = useLocation();




  useEffect(() => {
    if(location.state) {
      const { currency: tokenAddress } = location.state;
      const token = collateralMarketTokens.find((token) => token.contractAddress === tokenAddress);
      console.log(token);
      if(token) {
        setCurrency({
          address: token.contractAddress,
          name: token.name,
          icon: token.icon
        })
      }else {
        setCurrency(InitialCurrency)
      }
    }
  }, [location])



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
    setForm({
      ...form,
      secondAmount: (
        (Number(form.firstAmount) * Number(tokenInfo.tokenPrice)) /
        Number(tokenInfo.mcr)
      ).toString(),
    });
  }, [form.firstAmount]);

  const calculateTokenBalance = async () => {
    if(!userAddress) return
    setInitialLoading(true);
    const tokenBalance = (await fetchTokenBalance(
      currency.address,
      userAddress
    )) as number;
    const allowance = await getAllowanceinfo(currency.address, userAddress);
    if (tokenBalance) {
      dispatch(
        getUserInfo({
          address: currency.address,
          balance: Number(ethers.formatUnits(tokenBalance)).toFixed(2),
          allowance: ethers.formatUnits(allowance as number),
        })
      );
    }
    setInitialLoading(false);
  };

  useEffect(() => {
    dispatch(fetchIndividualMerketData(currency.address));
    calculateTokenBalance();
  }, [currency, setCurrency]);

  useEffect(() => {
    dispatch(fetchIndividualMerketData(currency.address));
  }, []);

  const depositFunction = async (address: HexString, amount: string) => {
    const { request } = await prepareWriteContract({
      address: contractAddress.interaction,
      abi: interractionAbi,
      functionName: 'deposit',
      args: [userAddress, address, ethers.parseUnits(amount)],
    });
    return await writeContract(request);
  };

  const depositHandler = async () => {
    try {
      const fetchAllowance = await getAllowanceinfo(
        currency.address,
        userAddress
      );
      const allowance = ethers.formatUnits(fetchAllowance as number);
      const { firstAmount } = form;
      if (Number(firstAmount) > Number(allowance)) {
        setApproveModal(true);
        return;
      }
      setLoading(true);
      const { hash } = await depositFunction(currency.address, firstAmount);
      if (hash) {
        const data = await waitForTransaction({
          hash,
          confirmations: 1,
        });
        if (data) {
          setForm({
            firstAmount: '',
            secondAmount: '',
          });
          setLoading(false);
          calculateTokenBalance()
          toast.success('Deposited Successfully');
        }
      }
    } catch (error) {
      setForm({
        firstAmount: '',
        secondAmount: '',
      });
      setLoading(false);
      commonContractError(error);
    }
  };

  return (
    <div className="pb-8 max-w-[900px] mx-auto">
      <h1 className="text-bold mb-8 text-[38px] text-center">
        Deposit Collateral
      </h1>
      <DepositInput
        dropdown
        value={form.firstAmount}
        name="firstAmount"
        onChange={onChange}
        topLeft="Deposit Amount"
        topRight={
          initalLoading ? (
            <AmountLoader />
          ) : (
            <div>
              {' '}
              <span>Max</span> {formatAmount(userAddress ? user.userTokenInfo.balance : 0)}{' '}
              {currency.name}{' '}
            </div>
          )
        }
        currency={currency}
        setCurrency={setCurrency}
      />

      <div className="py-8 flex items-center justify-center">
        <img src={images.filter} height={50} width={45} alt="filter-icon" />
      </div>

      <DepositInput
        name="secondAmount"
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
      <Button
        isLoading={loading}
        disabled={form.firstAmount.length === 0 || loading}
        onClick={depositHandler}
        variant={'primary'}
        fullWidth
        className="mt-10 h-[60px]"
      >
        {' '}
        {depositType === 'Approve' ? 'Approve' : 'Deposit'}
      </Button>
      {approveModal && (
        <ModalContainer
          close={() => setApproveModal(false)}
          open={approveModal}
        >
          <ApproveModal
            address={currency.address}
            amount={form.firstAmount}
            setModal={setApproveModal}
          />
        </ModalContainer>
      )}
    </div>
  );
};

export default DepositPage;

