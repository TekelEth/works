import { useEffect, useState } from 'react';
import { collateralMarketTokens } from '../../__mockdata__/tables';
import { images } from '../../utilities/images';
import interractionAbi from '../../constants/contracts-abi/interaction.json';
import spotAbi from '../../constants/contracts-abi/spot.json';
import { readContract } from '@wagmi/core';
import { contractAddress, HexString } from '../../constants/contracts-abi';
import { ClipLoader } from 'react-spinners';
import { ethers } from 'ethers';
type ILK = string | number;
interface IMarketData {
  tvl: number;
  mcr: number;
  collateral: number;
  borrowApr: number;
  icon: string;
  name: string;
}

const Table = () => {
  const [marketData, setMarketData] = useState<IMarketData[]>();
  const [loading, setLoading] = useState(false);

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
  const fetchMarketData = async () => {
    setLoading(true);
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
        const borrowAPR = (await fetchBorrowAPR(
          token.contractAddress
        )) as number;
        const formatedMCR = parseInt(ethers.formatUnits(mcr, 27));
        return {
          icon: token.icon,
          name: token.name,
          collateral: parseInt(ethers.formatUnits(collateral)),
          mcr: formatedMCR,
          borrowApr: parseInt(ethers.formatUnits(borrowAPR)),
          tvl: parseInt(ethers.formatUnits(depositTVL)) / formatedMCR,
        };
      })
    );

    if (results) {
      setLoading(false);
      setMarketData(results);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  return loading ? (
    <div className="w-full flex items-center justify-center h-[250px]">
      {' '}
      <ClipLoader color="#FB7200" size={70} />
    </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y  divide-[#FFFFFF1A]">
        <thead className="bg-transparent">
          <tr className="h-[85px]">
            <th
              scope="col"
              className="px-6 py-5  text-left text-[18px]/[21px]  text-light-200 font-semibold"
            >
              <div className="flex items-center">
                <span>Market Names</span>
                <img
                  src={images.collaterralIcon}
                  className="ml-2 w-[30px] h-[30px]"
                  alt="sort-icon"
                  width={11}
                />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-5 text-left text-[18px]/[21px]  text-light-200 font-semibold"
            >
              <div className="flex items-center">
                <span>Collateral</span>
                <img
                  src={images.sortIcon}
                  className="ml-2"
                  alt="sort-icon"
                  width={13}
                />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-5 text-left text-[18px]/[21px]  text-light-200 font-semibold"
            >
              TVL
            </th>
            <th
              scope="col"
              className="px-6 py-5 text-left text-[18px]/[21px]  text-light-200 font-semibold"
            >
              MCR
            </th>
            <th
              scope="col"
              className="px-6 py-5 text-left text-[18px]/[21px]  text-light-200 font-semibold"
            >
              Borrow APR
            </th>
          </tr>
        </thead>
        <tbody className="bg-transparent divide-y divide-[#FFFFFF1A]">
          {marketData &&
            marketData.map((data, index) => {
              return (
                <tr key={index} className="hover:bg-[#FFFFFF0D] cursor-pointer">
                  <td className="px-6 py-7 whitespace-nowrap">
                    <div className="ml-4 flex items-center">
                      <img src={data.icon} alt="coin-icon" />
                      <div className="text-[16px]/[21px] ml-3 font-montserrat text-white">
                        {data.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-7 whitespace-nowrap">
                    <div className="text-[16px]/[21px] font-montserrat text-white ">{`${data.collateral}`}</div>
                  </td>
                  <td className="px-6 py-7 whitespace-nowrap">
                    <span className="text-[16px]/[21px] font-montserrat text-white ">
                      {`${data.tvl}`}
                    </span>
                  </td>
                  <td className="text-[16px]/[21px] px-6 py-7 font-montserrat text-white ">{`${data.mcr}`}</td>
                  <td className="text-[16px]/[21px] px-6 py-7 pl-12 font-montserrat text-white ">{`${data.borrowApr}%`}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
