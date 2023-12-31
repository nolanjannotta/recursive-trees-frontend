import { useContractReads } from 'wagmi'
import {recursiveTrees} from '../Contracts.js'

import treeABI from '../ABIs/treeABI.json'

export function useGetTreeData(treeId) {
    // const [treeData, setTreeData] = useState({})

    const treeContract = {
        address: recursiveTrees,
        abi: treeABI,
      }

      const {data: treeData, isLoading, isSuccess, isError, refetch } = useContractReads({
        contracts: [
          {
            ...treeContract,
            functionName: 'getRawSvg',
            args: [treeId]
          },
          {
            ...treeContract,
            functionName: 'getTreeData',
            args: [treeId]
          },
          {
            ...treeContract,
            functionName: 'ownerOf',
            args: [treeId]
          },
          {
            ...treeContract,
            functionName: 'calculateFruit',
            args: [treeId]
          }

        ],
        enabled: true,
          watch: true,
      })

  return {treeData, isLoading, isSuccess, isError, refetch}
}


