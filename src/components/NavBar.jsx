import React from 'react'
import styled from 'styled-components';
import { useAccount,useBalance, useEnsName, useContractWrite} from 'wagmi'
import { recursiveTrees } from '../Contracts';
import treeABI from '../ABIs/treeABI.json'

import {useConnectModal} from "@rainbow-me/rainbowkit";



function NavBar() {
  const { openConnectModal } = useConnectModal();
    const { address } = useAccount()
    const balance = useBalance({
      address: recursiveTrees,
      watch: true,
    })


    const { data } = useEnsName({
      address: address,
      
    }) 


    const donate = useContractWrite({
      address: recursiveTrees,
      abi: treeABI,
      functionName: 'withdraw',
    })




    
    
  return (
    <Container>
      <Left>


        {/* <div>contract balance: {balance?.data?.formatted.substring(0,4)} {balance?.data?.formatted.length > 4 && "..."} eth </div> */}
        { balance?.data?.value > 0 &&
        <Donate onClick={donate?.write} > CLICK HERE TO DONATE {balance?.data?.formatted.substring(0,4)} {balance?.data?.formatted.length > 4 && "..."} ETH</Donate>
        }
      </Left>

      <div>Recursive Trees</div>
      <Right>
        {address ? 
        <div>
          greetings {data ? data : address.substring(0,8) + "..." + address.substring(35,42)}
        </div>
         : 
         <Connect onClick={openConnectModal}>
          welcome, please connect your wallet
         </Connect>




        }
        {/* <p>balance: {!isLoading && !isError && data && data.formatted.substring(0,5) || 0} ether</p> */}
      </Right>

      
    </Container>
    
  )
}

export default NavBar

const Connect = styled.div`
cursor: pointer;

`

const Container = styled.div`
background-color: #b6b6b6;
// opacity: 0.8;
width: 100%;
height: 40px;
display: flex;
justify-content: space-between;
align-items: center;
font-size: 25px;

`

const Right = styled.div`
width: 500px;
height: 100%;
display:flex;
justify-content: center;


`

const Left = styled.div`
height: 100%;
width: 500px;
display:flex;
justify-content: center;
align-items: center;


`

const Donate = styled.div`
cursor: pointer;
height: min-content;



`