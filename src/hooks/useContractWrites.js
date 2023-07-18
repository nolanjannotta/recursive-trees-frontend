import React,{useEffect, useState} from 'react'
import { useContractWrite,usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import {recursiveTrees} from '../Contracts.js'
import { parseEther } from 'viem'

import treeABI from '../ABIs/treeABI.json'

export function useContractWrites(tokenId, waterAmount) {
    const [txHash, setTxHash] = useState("")
    // console.log(txHash);

    const contract = {
        address: recursiveTrees,
        abi: treeABI,
    }

    // waterAmount && console.log(parseEther(waterAmount))

    const { config: harvestConfig, error:harvestError } = usePrepareContractWrite({
        ...contract,
        functionName: 'harvestFruit',
        args:[tokenId],

      
      })
      const { config: pickFruitConfig, error: pickFruitError } = usePrepareContractWrite({
        ...contract,
        functionName: 'pickFruit',
        args:[tokenId],

      
      })
      const { config: waterConfig, error: waterError } = usePrepareContractWrite({
        ...contract,
        functionName: 'water',
        args:[tokenId],
        value: waterAmount ?  parseEther(waterAmount) : 0,

      
      })

      const { config: toggleRenderForIdConfig, error: toggleRenderForIdError } = usePrepareContractWrite({
        ...contract,
        functionName: 'toggleRenderMethod',
        args:[tokenId],
       
      
      })

    //   const { config: toggleRenderForAddressconfig, error: toggleRenderForAddressError } = usePrepareContractWrite({
    //     ...contract,
    //     functionName: 'toggleRenderMethod',

      
    //   })

    //   const { config: batchPlantConfig, error: batchPlantError } = usePrepareContractWrite({
    //     ...contract,
    //     functionName: 'plantTree',
    //     args:[]
      
    //   })


      const harvestWrite = useContractWrite({...harvestConfig, onSuccess(data) {setTxHash(data.hash)}})
      const pickFruitWrite = useContractWrite({...pickFruitConfig, onSuccess(data) {setTxHash(data.hash)}})
      const waterWrite = useContractWrite({...waterConfig, onSuccess(data) {setTxHash(data.hash)}})
      const renderForIdWrite = useContractWrite({...toggleRenderForIdConfig, onSuccess(data) {setTxHash(data.hash)}})

    //   const renderForAddressWrite = useContractWrite({...toggleRenderForAddressconfig, onSuccess(data) {setTxHash(data.hash)}})

      const waitForTransaction = useWaitForTransaction({
        hash: txHash,
      })




      // useEffect(()=>{
      //   waitForTransaction.isSuccess && callBack()

      // },[waitForTransaction.isSuccess])
    
    
  return {harvestWrite,pickFruitWrite,waterWrite,renderForIdWrite}
}
