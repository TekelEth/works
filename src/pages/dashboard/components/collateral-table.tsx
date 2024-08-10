import { images } from '../../../utilities/images';

const CollateralTable = () => {
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
            {/* <tbody className="bg-transparent divide-y divide-[#FFFFFF1A]">
            {
                marketTable.map((data, index) => {
                    return (
                        <tr key={index} className='hover:bg-[#FFFFFF0D] cursor-pointer'>
                        <td className="px-6 py-7  text-center  whitespace-nowrap">
                            <div className="ml-6 flex items-center">
                              <img src={data.icon} alt="coin-icon" />
                              <div className="text-[16px]/[21px] ml-3 font-montserrat text-white">{data.name}</div>
                          </div>
                        </td>
                        <td className="pr-8   py-7  text-center whitespace-nowrap">
                          <div className="text-[16px]/[21px] font-montserrat text-white ">{data.collateral}</div>
                        </td>
                        <td className="px-6 py-7  text-center whitespace-nowrap">
                          <span className="text-[16px]/[21px] font-montserrat text-white ">
                            {data.tvl}
                          </span>
                        </td>
                        <td className="text-[16px]/[21px] px-6 py-7  text-center font-montserrat text-white ">{data.mcr}</td>
                        <td className="text-[16px]/[21px] px-6 py-7  text-center  font-montserrat text-white ">{data.apr}</td>
                        <td className="text-[16px]/[21px] px-6 py-7 text-center font-montserrat text-white ">{data.collateral}</td>
                        <td className="text-[16px]/[21px] px-6 py-7 text-center font-montserrat text-white ">
                          <Button className='border border-[#FFFFFF66] w-[110px] text-[#FFFFFF99] text-[14px]'>Mint</Button>
                        </td>
                      </tr> 
                    )
                })
            }
        </tbody> */}
          </table>
        </div>
      </div>
    </div>
  );
};

export default CollateralTable;
