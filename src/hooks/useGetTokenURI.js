import {useState, useEffect} from 'react'
import { useContractReads, useContractRead } from 'wagmi'
import {recursiveTrees} from '../Contracts.js'

import treeABI from '../ABIs/treeABI.json'

export function useGetTokenURI(treeId) {
    // const [treeData, setTreeData] = useState({})

      const {data: tokenURI, isLoading, isSuccess, isError, refetch: getUri } = useContractRead({
        address: recursiveTrees,
        abi: treeABI,
        functionName: "tokenURI",
        args: [treeId]
        // enabled: true,
      })

  return {tokenURI, isLoading, isSuccess, isError, getUri}
}


