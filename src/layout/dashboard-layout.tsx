import { Outlet } from 'react-router-dom';
import TopNavLayout from './topNav';
import NavigationLayout from './navigatiojn-layout';
import { contractAddress, HexString, ILK } from '../constants/contracts-abi';
import interractionAbi from '../constants/contracts-abi/interaction.json';
import spotAbi from '../constants/contracts-abi/spot.json';
import { readContract } from '@wagmi/core';
import { collateralMarketTokens } from '../__mockdata__/tables';
import { ethers } from 'ethers';
import { setLoading, setMarketData } from '../redux/slices/market';
import { useAppDispatch } from '../redux/dispatch';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const DashboardLayout = () => {
  const dispatch = useAppDispatch();
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

  const fetchCollateral = async (address: HexString) => {
    return new Promise((resolve) => {
      resolve(
        readContract({
          abi: interractionAbi,
          address: contractAddress.interaction,
          functionName: 'deposits',
          args: [address],
        })
      );
    });
  };

  const fetchDepositTVL = async (address: HexString) => {
    return new Promise((resolve) => {
      resolve(
        readContract({
          abi: interractionAbi,
          address: contractAddress.interaction,
          functionName: 'depositTVL',
          args: [address],
        })
      );
    });
  };

  const fetchBorrowAPR = (address: HexString) => {
    return new Promise((resolve) => {
      resolve(
        readContract({
          abi: interractionAbi,
          address: contractAddress.interaction,
          functionName: 'borrowApr',
          args: [address],
        })
      );
    });
  };

  const fetchTokenPrice = (address: HexString) => {
    return new Promise ((resolve) => {
      resolve(
        readContract({
          abi: interractionAbi,
          address: contractAddress.interaction,
          functionName: 'collateralPrice',
          args: [address]
        })
      )
    })
  }

  const fetchMarketData = async () => {
    dispatch(setLoading(true));
    const results = await Promise.all(
      collateralMarketTokens.map(async (token) => {
        const mcr = (
          (await fetchMCR(token.contractAddress)) as ILK[]
        )[1] as number;
        const depositTVL = (await fetchDepositTVL(
          token.contractAddress
        )) as number;
        const collateral = (await fetchCollateral(
          token.contractAddress
        )) as number;
        const tokenPrice = (await fetchTokenPrice(
          token.contractAddress
        )) as number
        const borrowAPR = (await fetchBorrowAPR(
          token.contractAddress
        )) as number;
        const formatedMCR = Number(ethers.formatUnits(mcr, 27));
        return {
          icon: token.icon,
          tokenAddress: token.contractAddress,
          name: token.name,
          tokenPrice: Number(ethers.formatUnits(tokenPrice)),
          collateral: Number(ethers.formatUnits(collateral)).toFixed(2),
          mcr: formatedMCR.toFixed(2),
          borrowApr: Number(ethers.formatUnits(borrowAPR)).toFixed(2),
          tvl: (Number(ethers.formatUnits(depositTVL)) / formatedMCR).toFixed(2),
        };
      })
    );

    if (results) {
      dispatch(setMarketData(results));
      dispatch(setLoading(false));
    }
  };

  

  useEffect(() => {
    fetchMarketData();
  }, []);


  return (
    <div className="bg-black pb-24 min-h-screen">
      <TopNavLayout />
      <ToastContainer 
        position="top-right"
        autoClose={5000}  // Close after 5 seconds
        hideProgressBar={false}  // Show progress bar
        newestOnTop={false}  // Newest toasts on top
        closeOnClick
        rtl={false}  // Right-to-left support
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"        
      />
      <NavigationLayout />
      <br /> <br />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
