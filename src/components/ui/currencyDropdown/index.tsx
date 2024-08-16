import { Dispatch, FC, SetStateAction } from 'react';
import { collateralMarketTokens } from '../../../__mockdata__/tables';
import { HexString } from '../../../constants/contracts-abi';

interface IProp {
  className?: string;
  setCurrency: Dispatch<
    SetStateAction<{
      icon: string;
      name: string;
      address: HexString;
    }>
  >;

  setDisplayDropdown: Dispatch<SetStateAction<boolean>>;
}

const CurrencyDropdown: FC<IProp> = ({
  setCurrency,
  setDisplayDropdown,
  className = 'right-[30px] top-[130px]',
}) => {
  const setAction = (icon: string, name: string, address: HexString) => {
    setCurrency({
      icon,
      name,
      address,
    });
    setDisplayDropdown(false);
  };

  return (
    <div
      className={`w-[150px] bg-black  z-50 rounded-[12px] absolute  flex flex-col min-h-[220px] p-4 ${className}`}
    >
      {collateralMarketTokens.map((token, index) => (
        <div
          className="flex cursor-pointer items-center space-x-2 py-3"
          key={index}
          onClick={() =>
            setAction(token.icon, token.name, token.contractAddress)
          }
        >
          <img src={token.icon} className="w-6 h-6" alt="token-icon" />
          <span className="uppercase text-[13px] text-gray-100">
            {token.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CurrencyDropdown;
