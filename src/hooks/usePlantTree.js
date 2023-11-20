import {useState} from 'react'
import { useContractWrite,usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import {recursiveTrees} from '../Contracts.js'

import treeABI from '../ABIs/treeABI.json'

export function usePlantTree(batchAmount, price, callback) {
    const contract = {
        address: recursiveTrees,
        abi: treeABI,
    }
      const { config: plantTreeConfig} = usePrepareContractWrite({
        ...contract,
        functionName: 'plantTree',
        value: price.toString(),
        // onError(error) {
        //   console.log('plant 1 error', error)
        // },

      
      })

      const { config: batchPlantConfig} = usePrepareContractWrite({
        ...contract,
        functionName: 'batchPlant',
        args:[batchAmount],
        value: (batchAmount * price).toString(),
        // onError(error) {
        //   console.log('batch error', error)
        // },

      })

      const { config: fruitTokenPlantConfig} = usePrepareContractWrite({
        ...contract,
        functionName: 'plantTreeWithFruitTokens',

      })

      const batchPlantTree = useContractWrite({...batchPlantConfig})

      const plantTreeWrite = useContractWrite({...plantTreeConfig})

      const fruitTokenPlantTreeWrite = useContractWrite({...fruitTokenPlantConfig})

      const {isError, isLoading } = useWaitForTransaction({
        hash: plantTreeWrite.data?.hash || batchPlantTree.data?.hash || fruitTokenPlantTreeWrite.data?.hash,
        onSuccess(data) {callback(data)}

      })


    
  return {plantTreeWrite, batchPlantTree, fruitTokenPlantTreeWrite, isError, isLoading}
}
