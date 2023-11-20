import React from 'react'
import styled from 'styled-components';
import { useAccount,useBalance, useEnsName, useContractWrite, useNetwork} from 'wagmi'
import { recursiveTrees } from '../Contracts';
import treeABI from '../ABIs/treeABI.json'
import { Link } from 'react-router-dom';
import {useConnectModal} from "@rainbow-me/rainbowkit";



function NavBar() {
  const { chain } = useNetwork()
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


        {<div >contract balance:{" " + balance?.data?.formatted.substring(0,4)}{balance?.data?.formatted.length > 4 && "..."} eth. <Donate onClick={donate?.write}>{chain && chain?.id == 5 &&  balance?.data?.value > 0 && "click here to donate!"}</Donate></div>}
      </Left>

      <Link style={{color: "inherit"}} to="/home"><div>Recursive Trees</div></Link>
      <Right>
        {address ? 
        <div>greetings {data ? data : address.substring(0,8) + "..." + address.substring(35,42)}</div>
         : 
         <Connect onClick={openConnectModal}>welcome, please connect your wallet</Connect>}
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
width: 100%;
height: 40px;
display: flex;
justify-content: space-between;
align-items: center;
font-size: 25px;
`

const Right = styled.div`
width: 40%;
height: 100%;
display:flex;
justify-content: flex-end;
margin-right: 20px;
`

const Left = styled.div`
height: 100%;
width: 40%;
display:flex;
justify-content: flex-start;
align-items: center;
margin-left: 20px;

`


const Donate = styled.span`
cursor: pointer;
text-decoration: underline;
`