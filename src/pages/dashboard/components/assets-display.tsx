
const AssetsDisplay = () => {
  return (
    <div className="w-full col-span-2 row-span-1  text-[#FFFFFFCC] border-line flex items-center justify-between h-[96px] px-[30px]">
        <div className="flex items-center">
            <p className="font-[500] font-montserrat text-[20px]">
              Total Collateral: <span className="font-bold">$0 USD</span>
            </p>
        </div>
        <div className="flex items-center">
            <p className="font-[500] font-montserrat text-[20px]">
            Total Borrowed: <span className="font-bold">$0 USD</span> 0 aUSD
            </p>
        </div>
        <div className="flex items-center">
            <p className="font-[500] font-montserrat text-[20px]">
            Net Asset Value: <span className="font-bold">$0 USD</span>
            </p>
        </div>
      </div>
  )
}

export default AssetsDisplay