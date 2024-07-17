import { marketTable } from '../../__mockdata__/tables';
import { images } from '../../utilities/images';

const Table = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y  divide-[#FFFFFF1A]">
        <thead className="bg-transparent">
          <tr className='h-[85px]'>
            <th
              scope="col"
              className="px-6 py-5  text-left text-[18px]/[21px]  text-light-200 font-semibold"
            >
              <div className='flex items-center'>
                <span>Market Names</span>
              <img src={images.collaterralIcon} className='ml-2' alt="sort-icon" width={13} />

              </div>
             </th>
            <th
              scope="col"
              className="px-6 py-5 text-left text-[18px]/[21px]  text-light-200 font-semibold"
            >
             <div className='flex items-center'>
                <span>Collateral</span>
              <img src={images.sortIcon} className='ml-2' alt="sort-icon" width={13} />
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
            {
                marketTable.map((data, index) => {
                    return (
                        <tr key={index} className='hover:bg-[#FFFFFF0D] cursor-pointer'>
                        <td className="px-6 py-7 whitespace-nowrap">
                            <div className="ml-4 flex items-center">
                              <img src={data.icon} alt="coin-icon" />
                              <div className="text-[16px]/[21px] ml-3 font-montserrat text-white">{data.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-7 whitespace-nowrap">
                          <div className="text-[16px]/[21px] font-montserrat text-white ">{data.collateral}</div>
                        </td>
                        <td className="px-6 py-7 whitespace-nowrap">
                          <span className="text-[16px]/[21px] font-montserrat text-white ">
                            {data.tvl}
                          </span>
                        </td>
                        <td className="text-[16px]/[21px] px-6 py-7 font-montserrat text-white ">{data.mcr}</td>
                        <td className="text-[16px]/[21px] px-6 py-7 pl-12 font-montserrat text-white ">{data.apr}</td>
                      </tr> 
                    )
                })
            }
        </tbody>
      </table>
    </div>
  );
};

export default Table;
