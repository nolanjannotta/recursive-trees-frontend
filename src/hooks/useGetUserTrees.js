import {useState} from 'react'
import { useContractRead, useAccount } from 'wagmi'
import {recursiveTrees} from '../Contracts.js'

import treeABI from '../ABIs/treeABI.json'

export function useGetUserTrees() {
    const [userTrees, setUserTrees] = useState("")
    const {address} = useAccount();

    console.log(address)

    const treeContract = {
        address: recursiveTrees,
        abi: treeABI,
      }

    //   add fruit token contract

      const {isLoading, refetch } = useContractRead({
            address: recursiveTrees,
            abi: treeABI,
            functionName: 'tokensOfOwner',
            args:[address],
            onSuccess(data) {
            setUserTrees(data)
            },
      })

  return {userTrees}
}


