import React, {
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useState,
} from 'react';
import { images } from '../../../utilities/images';
import CurrencyDropdown from '../currencyDropdown';
import { ICurrency, InitialCurrency } from '../../../interface';

interface IProp extends InputHTMLAttributes<HTMLInputElement> {
  topLeft: string;
  topRight?: React.ReactNode;
  rightCoin?: React.ReactNode;
  dropdown?: boolean;
  currency?: ICurrency;
  setCurrency?: Dispatch<SetStateAction<ICurrency>>;
}

const DepositInput = ({
  topLeft,
  topRight,
  rightCoin,
  dropdown,
  currency,
  setCurrency = () => setCurrency(InitialCurrency),
  ...prop
}: IProp) => {
  const [displayDropDown, setDisplayDropdown] = useState(false);

  const toggle = () => setDisplayDropdown(!displayDropDown);
  return (
    <div className="w-full border relative border-[#FFFFFF4D] bg-[#FFFFFF0D] rounded-[15px] py-[24px] px-[30px] flex flex-col">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center">
          <span className="text-[14px] mr-2 text-[#FFFFFFCC] font-montserrat">
            {' '}
            {topLeft}
          </span>
          <img src={images.sortIcon} width={14} height={14} alt="sort-icon" />
        </div>
        {topRight && (
          <div className="flex items-center">
            <span className="text-[14px] uppercase mr-2 text-[#FFFFFFB2] font-montserrat">
              {topRight}
            </span>
            <img src={images.sortIcon} width={14} height={14} alt="sort-icon" />
          </div>
        )}
      </div>
      <div className="w-full border rounded-[7px] px-4 flex items-center justify-between border-[#302E2E] bg-[#FFFFFF0D] h-[65px]">
        <input
          placeholder="0.00"
          type="number"
          className="w-[40%] font-bold text-white text-[25px] font-montserrat h-full placeholder:text-[25px] placeholder:text-white placeholder:font-montserrat focus:outline-none border-none bg-transparent"
          {...prop}
        />
        <div
          className="border-l flex pl-5 border-[#FFFFFF66] cursor-pointer"
          onClick={toggle}
        >
          {dropdown ? (
            <>
              <div   className="flex items-center">
                <img
                  src={currency?.icon}
                  alt="coin-icon"
                  width={22}
                  height={22}
                />
                <div className="text-[16px]/[21px] ml-2 font-montserrat  text-white">
                  {currency?.name}
                </div>
              </div>
              <img
                src={images.arrowDown}
                className="w-[12px] cursor-pointer ml-2"
                alt="arrow-down"
              />
            </>
          ) : (
            rightCoin
          )}
        </div>
      </div>
      {displayDropDown && (
        <CurrencyDropdown
          setDisplayDropdown={setDisplayDropdown}
          setCurrency={setCurrency}
        />
      )}
    </div>
  );
};

export default DepositInput;
