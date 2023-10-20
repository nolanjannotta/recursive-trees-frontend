import {useState, useEffect} from 'react'
import { useContractReads, useAccount } from 'wagmi'
import {recursiveTrees,fruitToken} from '../Contracts.js'

import treeABI from '../ABIs/treeABI.json'
import fruitABI from '../ABIs/fruitABI.json'

export function useGetExtraData() {
    const [extraData, setExtraData] = useState("")
    const {address} = useAccount();

    const treeContract = {
        address: recursiveTrees,
        abi: treeABI,
      }

      const fruitContract = {
        address: fruitToken,
        abi: fruitABI
      }

    //   add fruit token contract

      const {isLoading, refetch } = useContractReads({
        contracts: [
          {
            ...treeContract,
            functionName: 'getRawSvg',
            args: [1]
          },
          {
            ...treeContract,
            functionName: 'MAX_TREES',
          },
          {
            ...treeContract,
            functionName: 'currentId',
          },
          {
            ...treeContract,
            functionName: 'balanceOf',
            args:[address]
          },
          {
            ...fruitContract,
            functionName: 'balanceOf',
            args:[address]
          },
          {
            ...treeContract,
            functionName: 'PRICE',
          },
          {...treeContract,
            functionName: 'tokensOfOwner',
            args:[address],
          },
          {...treeContract,
            functionName: 'EXTRA_TREE_COUNTER',
          },
          {...fruitContract,
            functionName: 'balanceOf',
            args:[address],
          },
          {...fruitContract,
            functionName: 'totalSupply'
          }
        ],
        // enabled: true,
        onSuccess(data) {
            // console.log('Extra data', data)
            setExtraData(data)
          },
      })

  return {extraData, isLoading, refetch}
}


