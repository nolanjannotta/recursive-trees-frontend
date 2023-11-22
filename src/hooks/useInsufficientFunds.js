import { useEffect, useState } from "react";




export function useInsufficientFunds(isLoading, isError, extraData, batchTotal, balance) {
    const [plant1Disabled, setPlant1Disabled] = useState(false)
    const [batchDisabled, setBatchDisabled] = useState(false)
    const [loadingText, setLoadingText] = useState("");

    useEffect(() => {
        if(isLoading) {
          setLoadingText("tx submitted. awaiting results...")
        }
        if(isError) {
          setLoadingText("error occured, try again")
        }
        if(balance.data && extraData) {
            let price = Number(extraData[5].result);
            let userBalance = Number(balance.data.value);
            // if users balance is less than the price for one tree:
            if(userBalance < price) {
                setLoadingText("***insufficient funds :( ***")
                setPlant1Disabled(true);
            }

            // if users balance is less than the batch total price:
            if (userBalance < (price * batchTotal)) {
                setLoadingText("***insufficient funds :( ***")
                setBatchDisabled(true);
            }
            
            // if neither are true:
            else{
                setLoadingText("")
                setBatchDisabled(false);
                setPlant1Disabled(false);
            }
        }
      
      
      },[isLoading, isError,extraData,batchTotal])


    
      return {plant1Disabled, batchDisabled, loadingText, setLoadingText}
}