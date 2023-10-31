import React,{useEffect, useState} from 'react'
import { useContractWrite,usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import {recursiveTrees} from '../Contracts.js'
import { formatEther, parseEther } from 'viem'

import treeABI from '../ABIs/treeABI.json'

export function usePlantTree(batchAmount, price, callback) {
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

      const { config: fruitTokenPlantConfig, error: fruitTokenPlantError } = usePrepareContractWrite({
        ...contract,
        functionName: 'plantTreeWithFruitTokens',

      })

      const batchPlantTree = useContractWrite({...batchPlantConfig})

      const plantTreeWrite = useContractWrite({...plantTreeConfig})

      const fruitTokenPlantTreeWrite = useContractWrite({...fruitTokenPlantConfig})

      const { data, isError, isLoading } = useWaitForTransaction({
        hash: plantTreeWrite.data?.hash || batchPlantTree.data?.hash || fruitTokenPlantTreeWrite.data?.hash,
        onSuccess(data) {callback(data)}

      })
      

      console.log()

      // const waitForTransaction = useWaitForTransaction({
      //   hash: txHash,
      //   onSuccess(data) {
      //       callBack()
      //     },
      // })




    //   useEffect(()=>{
    //     waitForTransaction.isSuccess && callBack()

    //   },[waitForTransaction.isSuccess])
    
    
  return {plantTreeWrite, batchPlantTree,fruitTokenPlantTreeWrite}
}
