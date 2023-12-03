import React from 'react'
import styled from 'styled-components';
import { useAccount,useBalance, useEnsName, useContractWrite, useNetwork, useSwitchNetwork} from 'wagmi'
import { recursiveTrees } from '../Contracts';
import treeABI from '../ABIs/treeABI.json'
import { Link } from 'react-router-dom';
import {useConnectModal} from "@rainbow-me/rainbowkit";



function NavBar() {
  const { chain } = useNetwork()
  const { openConnectModal } = useConnectModal();
  const { switchNetwork } = useSwitchNetwork()
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

      <Center>
      <Link style={{color: "inherit"}} to="/home"><div>Recursive Trees</div></Link>  
      </Center>

      

      <Right>
        {address ? 
        <>
        {chain && chain?.id != 5 && <div style={{cursor: "pointer"}} onClick={() => switchNetwork?.(5)}>switch networks</div>}
        &nbsp; &nbsp;
        <div> greetings, {data ? data : address.substring(0,8) + "..." + address.substring(35,42)}</div>
        </>
        
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
font-size: 1.5rem;

`;


const Center = styled.div`
width: 20%;
text-align: center;
font-size: 1.8rem;

  @media (max-width: 500px) {

    font-size: .75rem;
    // display: flex;

    word-wrap: break-word;
    width: 20%;
    
  }

`

const Right = styled.div`
width: 40%;
display:flex;
justify-content: end;
margin-right: 20px;
// background-color: blue;
@media (max-width: 500px) {
  
  justify-content: center;
  font-size: .7rem;
  // text-wrap: nowrap;
  word-wrap: break-word;
  line-height: 1.5;
  margin-right: .5rem;
  text-align: center;
  width: 30%;
  
}
`

const Left = styled.div`
// height: 100%;
width: 40%;
display:flex;
justify-content: start;
align-items: center;
margin-left: 20px;

@media (max-width: 500px) {
  justify-content: end;
  margin-left: .5rem;
  font-size: .7rem;
  line-height: 1.5;
  text-align: center;
  width: 30%;
}

`


const Donate = styled.span`
cursor: pointer;
text-decoration: underline;
`