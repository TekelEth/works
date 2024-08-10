import { toast } from "react-toastify"

export const commonContractError = (e: any) => {
    if(e.toString().indexOf('User rejected the request.') > -1) {
      toast.error('User rejected the request.')
    } else if(e.toString().indexOf(' revert Address: low-level call with value failed') > -1) {
      toast.error('Try again!! revert Address: low-level call with value failed.')
    } else {
      console.log(e, 'error')
      toast.error('An Error Occured')
    }
  }