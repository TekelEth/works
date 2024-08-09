const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full">
      <div className="flex text-[#FFFFFFCC] font-montserrat relative text-[14px] items-center ">
        <span>0%</span>
        <span className={`ml-[${progress}%] `}>{progress}%</span>
        <span className="items-end absolute right-0 justify-self-end">
          100%
        </span>
      </div>
      <div className="progress-bar-container mt-1">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
