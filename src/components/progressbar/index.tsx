import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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

export const CircularProgressBar = ({ progress }: { progress: number }) => {
  console.log(progress * 100, "rrr");
  
  return (
    
    <CircularProgressbar
      value={progress} 
      maxValue={1} 
      text={`${(progress * 100).toFixed(2)}%`} 
      styles={buildStyles({
        pathColor: `#FB7200`,
        textColor: '#fff',
        textSize: 14,
        trailColor: '#FB72004D',
        backgroundColor: '#FB7200',
    
      })}
    />

  );
};

export default ProgressBar;
