import { toast } from 'react-toastify';
import { BaseError, ContractFunctionRevertedError } from 'viem';

export const  commonContractError = (e: any) => {
  if (e.toString().indexOf('User rejected the request.') > -1) {
    toast.error('User rejected the request.');
  } else if (
    e.toString().indexOf(' revert Address: low-level call with value failed') >
    -1
  ) {
    toast.error(
      'Try again!! revert Address: low-level call with value failed.'
    );
  } else {
    if (e instanceof BaseError) {
      const revertError = e.walk(err => err instanceof ContractFunctionRevertedError)      
      if (revertError instanceof ContractFunctionRevertedError) {
        const errorName = revertError.data?.errorName?? ''
        console.log(errorName);
        
      }
    }
    console.log(e.toString().message, 'error');
    toast.error('An Error Occured');
  }
};
