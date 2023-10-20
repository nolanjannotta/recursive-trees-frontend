import {useState, useEffect} from 'react'
import { useContractReads, useContractRead } from 'wagmi'
import {recursiveTrees} from '../Contracts.js'

import treeABI from '../ABIs/treeABI.json'

export function useGetTokenURI(treeId) {
    // const [treeData, setTreeData] = useState({})
    const [treeJson, setTreeJson] = useState(undefined);

      const {data: tokenURI, isLoading, isSuccess, isError, refetch: getUri } = useContractRead({
        address: recursiveTrees,
        abi: treeABI,
        functionName: "tokenURI",
        args: [treeId]
        // enabled: true,
      })


      useEffect(()=>{
        if(tokenURI){
          let jsonManifestString = Buffer.from(tokenURI.substring(29), "base64");
          let jsonManifest = JSON.parse(jsonManifestString);
          setTreeJson(jsonManifest);
        }

      },[tokenURI])

      

  return {tokenURI, treeJson, isLoading, isSuccess, isError, getUri}
}


