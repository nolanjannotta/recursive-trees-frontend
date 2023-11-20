import { useEffect, useState } from "react";




export function useInsufficientFunds(isLoading, isError, extraData, batchTotal, balance, setLoadingText) {
    const [plant1Disabled, setPlant1Disabled] = useState(false)
    const [batchDisabled, setBatchDisabled] = useState(false)


    useEffect(() => {
        console.log(batchTotal)
        if(isLoading) {
          setLoadingText("tx submitted. awaiting results...")
        }
        if(isError) {
          setLoadingText("error occured, try again")
        }
        if(extraData) {
            setLoadingText("***insufficient funds***")
            if (balance.data.value < Number(extraData[5].result) * batchTotal) {
                setBatchDisabled(true);
            }
        if(balance.data.value < extraData[5].result) {
            
            setPlant1Disabled(true);
          }
          

          
          else{
            setLoadingText("")
            setBatchDisabled(false);
          }
        }
      
      
      },[isLoading, isError,extraData,batchTotal])


    
      return {plant1Disabled, batchDisabled}
}