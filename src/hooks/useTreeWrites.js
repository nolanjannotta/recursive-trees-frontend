import { useContractWrite,usePrepareContractWrite} from 'wagmi'
import {recursiveTrees} from '../Contracts.js'
import { parseEther } from 'viem'

import treeABI from '../ABIs/treeABI.json'

export function useTreeWrites(tokenId, waterAmount) {


    const contract = {
        address: recursiveTrees,
        abi: treeABI,
    }

    const { config: harvestConfig} = usePrepareContractWrite({
        ...contract,
        functionName: 'harvestFruit',
        args:[tokenId],

      
      })
      const { config: pickFruitConfig} = usePrepareContractWrite({
        ...contract,
        functionName: 'pickFruit',
        args:[tokenId],

      
      })
      const { config: waterConfig} = usePrepareContractWrite({
        ...contract,
        functionName: 'water',
        args:[tokenId],
        value: waterAmount ?  parseEther(waterAmount) : 0,

      
      })

      const { config: toggleRenderForIdConfig} = usePrepareContractWrite({
        ...contract,
        functionName: 'toggleRenderMethod',
        args:[tokenId],
       
      
      })

      const harvestWrite = useContractWrite(harvestConfig)
      const pickFruitWrite = useContractWrite(pickFruitConfig)
      const waterWrite = useContractWrite(waterConfig)
      const renderForIdWrite = useContractWrite(toggleRenderForIdConfig)
      const transferFromWrite = useContractWrite({...contract, functionName: 'transferFrom'})


  return {harvestWrite,pickFruitWrite,waterWrite,renderForIdWrite, transferFromWrite}
}
