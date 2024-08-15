import { useEffect, useState } from 'react';
import useTokenHooks from '../../../hooks/token-hooks';
import { images } from '../../../utilities/images';
import { collateralMarketTokens } from '../../../__mockdata__/tables';
import { ILK } from '../../../constants/contracts-abi';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { ClipLoader } from 'react-spinners';
import Button from '../../../components/ui/button';
import { formatAmount } from '../../../utilities/formater';


interface IProp {
  icon: string;
  name: string;
  tokenPrice: number;
  collateral: string;
  mcr: string;
  borrowApr: string;
  borrow: string;
}

const CollateralTable = () => {
  const { address: userAddress } = useAccount();
  const [collateralInfo, setCollaterralInfo] = useState<IProp[] | null>()
  const { fetchBorrowAPR, fetchUserBorrowedBalance, fetchTokenPrice, fetchCollateralBalance, fetchMCR } = useTokenHooks();
  const [loading, setLoading ] = useState(false);
 
  const fetchMyCollaterallInfo = async () => {
    setLoading(true);

    const results = await Promise.all(
      collateralMarketTokens.map(async (token) => {
        const mcr = (
          (await fetchMCR(token.contractAddress)) as ILK[]
        )[1] as number;

        const borrowAPR = (await fetchBorrowAPR(
          token.contractAddress
        )) as number;
        const formatedMCR = Number(ethers.formatUnits(mcr, 27));
        const tokenPrice = (await fetchTokenPrice(
          token.contractAddress
        )) as number
        const tokenCollaterral = (await fetchCollateralBalance(
          token.contractAddress,
          userAddress
        )) as number;

        const borrowed = (await fetchUserBorrowedBalance(
          token.contractAddress,
          userAddress
        )) as number;

        return {
          icon: token.icon,
          name: token.name,
          tokenPrice: Number(ethers.formatUnits(tokenPrice)),
          collateral: Number(ethers.formatUnits(tokenCollaterral)).toFixed(2),
          mcr: formatedMCR.toFixed(2),
          borrowApr: Number(ethers.formatUnits(borrowAPR)).toFixed(2),
          borrow: Number(ethers.formatUnits(borrowed)).toFixed(2)
        }
      })
    );

    if(results) {
      setCollaterralInfo(results)
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMyCollaterallInfo()
  }, [])

  return (
    <div className="pt-20">
      <div className=" w-full border border-[#FFFFFF4D] min-h-[400px] rounded-[10px]">
        <div className="flex items-center border-b border-[#FFFFFF4D] justify-between px-[30px] py-[18px]">
          <h1 className="text-bold text-[35px]/[50px]">My Collateral List</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y  divide-[#FFFFFF1A]">
            <thead className="bg-transparent">
              <tr className="h-[85px]">
                <th
                  scope="col"
                  className="px-16 py-5  text-[15px]/[21px] text-center  text-[#FFFFFF99] font-semibold"
                >
                  <div className="flex items-center">
                    <span>Assets</span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-5 text-[15px]/[21px] text-center  text-[#FFFFFF99] font-semibold"
                >
                  <div className="flex items-center">
                    <span>Price</span>
                    <img
                      src={images.sortIcon}
                      className="ml-2"
                      alt="sort-icon"
                      width={12}
                      height={12}
                    />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6  py-5 text-[15px]/[21px] text-center  text-[#FFFFFF99] font-semibold"
                >
                  MCR
                </th>
                <th
                  scope="col"
                  className="px-6 py-5 text-[15px]/[21px] text-center  text-[#FFFFFF99] font-semibold"
                >
                  Collateral
                </th>
                <th
                  scope="col"
                  className="px-6 py-5 text-[15px]/[21px] text-center  text-[#FFFFFF99] font-semibold"
                >
                  Borrowed
                </th>
                <th
                  scope="col"
                  className="px-6 py-5 text-[15px]/[21px] text-center  text-[#FFFFFF99] font-semibold"
                >
                  Net Borrowing APR
                </th>
                <th
                  scope="col"
                  className="px-6 py-5 text-[15px]/[21px] text-center  text-[#FFFFFF99] font-semibold"
                >
                  Actions
                </th>
              </tr>
            </thead>
          {
            ( loading) ? <div className="w-full flex items-center justify-center h-[250px]">
            {' '}
            <ClipLoader color="#FB7200" size={70} />
          </div> :   <tbody className="bg-transparent divide-y divide-[#FFFFFF1A]">
            { 

                collateralInfo?.map((data, index) => {
                    return (
                        <tr key={index} className='hover:bg-[#FFFFFF0D] cursor-pointer'>
                        <td className="px-6 py-7  text-center  whitespace-nowrap">
                            <div className="ml-6 flex items-center">
                              <img src={data.icon} alt="coin-icon" />
                              <div className="text-[16px]/[21px] ml-3 font-montserrat text-white">{data.name}</div>
                          </div>
                        </td>
                        <td className="pr-8   py-7  text-center whitespace-nowrap">
                          <div className="text-[16px]/[21px] font-montserrat text-white ">${formatAmount(data.tokenPrice)}</div>
                        </td>
                        <td className="px-6 py-7  text-center whitespace-nowrap">
                          <span className="text-[16px]/[21px] font-montserrat text-white ">
                            {`${Number(data.mcr) * 100}%`}
                          </span>
                        </td>
                        <td className="text-[16px]/[21px] px-6 py-7  text-center font-montserrat text-white ">{data.collateral}</td>
                        <td className="text-[16px]/[21px] px-6 py-7  text-center  font-montserrat text-white ">{data.borrow}</td>
                        <td className="text-[16px]/[21px] px-6 py-7 text-center font-montserrat text-white ">{data.borrowApr}</td>
                        <td className="text-[16px]/[21px] px-6 py-7 text-center font-montserrat text-white ">
                          <Button className='border border-[#FFFFFF66] w-[110px] text-[#FFFFFF99] text-[14px]'>Mint</Button>
                        </td>
                      </tr> 
                    )
                })
            }
           </tbody>
          }
          </table>
        </div>
      </div>
    </div>
  );
};

export default CollateralTable;
