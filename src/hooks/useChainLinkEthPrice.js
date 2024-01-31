import {useState} from 'react'
import { useContractRead,usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import {recursiveTrees} from '../Contracts.js'

import priceFeed from '../ABIs/priceFeed.json'

export function useChainLinkEthPrice(ethAmount) {
    const goerli = "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e";
    const sepolia = "0x694AA1769357215DE4FAC081bf1f309aDC325306";
    const mainnet = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";


    const { data } = useContractRead({
        address: mainnet,
        abi: priceFeed,
        functionName: 'latestAnswer',
      })

    //   console.log((Number(data) / 1e8));



    return ((Number(data) / 1e8) * (ethAmount / 1e18)).toLocaleString('en-US', {maximumFractionDigits: 2})
}