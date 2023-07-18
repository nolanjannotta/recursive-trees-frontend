import React,{useEffect, useState} from 'react'
import { useContractWrite,usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import {recursiveTrees} from '../Contracts.js'
import { formatEther, parseEther } from 'viem'

import treeABI from '../ABIs/treeABI.json'

export function usePlantTree(batchAmount, price) {
    const [txHash, setTxHash] = useState("")

    const contract = {
        address: recursiveTrees,
        abi: treeABI,
    }
      const { config: plantTreeConfig, error: plantTreeError } = usePrepareContractWrite({
        ...contract,
        functionName: 'plantTree',
        value: `${price}`

      
      })

      const { config: batchPlantConfig, error: batchPlantError } = usePrepareContractWrite({
        ...contract,
        functionName: 'batchPlant',
        args:[batchAmount],
        value: `${batchAmount * price}`

      })

      const batchPlantTree = useContractWrite({...batchPlantConfig, onSuccess(data) {setTxHash(data.hash)}})

      const plantTreeWrite = useContractWrite({...plantTreeConfig, onSuccess(data) {setTxHash(data.hash)}})

      // const waitForTransaction = useWaitForTransaction({
      //   hash: txHash,
      //   onSuccess(data) {
      //       callBack()
      //     },
      // })




    //   useEffect(()=>{
    //     waitForTransaction.isSuccess && callBack()

    //   },[waitForTransaction.isSuccess])
    
    
  return {plantTreeWrite, batchPlantTree}
}
