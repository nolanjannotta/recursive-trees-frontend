import React,{useEffect, useState, useContext} from 'react'
import styled from 'styled-components'
import { usePlantTree } from '../hooks/usePlantTree'
import { useInsufficientFunds } from '../hooks/useInsufficientFunds'
import {formatEther} from "viem"
import { useAccount, useBalance} from 'wagmi'
import {DataContext} from './DataContext'
import {Link} from "react-router-dom";
import Loading from "./Loading";
import {useConnectModal} from "@rainbow-me/rainbowkit";


function Mint() {
  const [batchTotal, setBatchTotal] = useState(1)
  // const [loadingText, setLoadingText] = useState("");
  const {address} = useAccount();
  const balance = useBalance({
    address: address,
  });

  
  const { openConnectModal } = useConnectModal();
  

  const {extraData, refetch} = useContext(DataContext);
  
  function handleSuccess() {
    refetch();
    setLoadingText("success!")
  }

  function refresh() {
    refetch();
    setLoadingText("")
  }



  const {plantTreeWrite,batchPlantTree,fruitTokenPlantTreeWrite, isError, isLoading} = usePlantTree(batchTotal, Number(extraData && extraData[5].result) || 0, handleSuccess)

  const {plant1Disabled, batchDisabled, loadingText, setLoadingText} = useInsufficientFunds(isLoading, isError, extraData, batchTotal, balance)


  let isMinting = extraData ? extraData[2].result <= extraData[1].result : false
 
  function handleInput(event) {
    setBatchTotal(Number(event.target.value) > 0 ? Number(event.target.value) : 1)

}




if(!extraData) {
  return(<Loading/>)
}

  return (
    <Container>
      <h1>plant a tree</h1>
      <Info>
        
        <P>price: {formatEther(extraData[5].result.toString())} eth</P>

        <TotalMinted>
        <P>{(extraData[2].result).toString()} / 7,000 minted</P> 

         

        <P style={{cursor: "pointer", fontSize: "10px"}} onClick={refresh}>refresh</P>
        </TotalMinted>

        <P>{(extraData[7].result).toString()} / 2000 bonus trees planted</P>

        <PleaseConnect onClick={openConnectModal}>{!address &&  "please connect a wallet to mint"}</PleaseConnect>
        <P>{loadingText}</P>

      </Info>
     
      <Buttons>     
          
          <button disabled={!isMinting || !address || plant1Disabled} onClick={()=>{setLoadingText("awaiting user confirmation..."); plantTreeWrite.write()}}>plant 1</button>
          

          <Batch>
            <Input placeholder='amount'  type="number" max={100} onChange={handleInput}></Input>
            <button style={{flexGrow: "4"}} disabled={!isMinting || !address || batchTotal > 100 || batchDisabled} onClick={()=>{setLoadingText("awaiting user confirmation...");batchPlantTree.write()}}>plant batch (100 max)</button>
          </Batch>

          <button disabled={!extraData[8].result || Number(formatEther(extraData[8].result)) < 1000} onClick={()=>{setLoadingText("awaiting user confirmation..."); fruitTokenPlantTreeWrite.write()}}>plant with fruit tokens (1000 fruit)</button>
          
          
      </Buttons> 
      <Link to="/home"><button>back</button> </Link>
    </Container>
  )
}

export default Mint


const PleaseConnect = styled.div`
cursor: pointer;
`


const Batch = styled.div`
  display: flex;
  justify-content: flex-end;
`


const Buttons = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media(max-width: 500px) {
    width:80%;
    
  }
`

const Input = styled.input`
  width: 15%;
`

const TotalMinted = styled.div`
display:flex;
`


const Info = styled.div`
width: 50%;
min-height: 200px;
display: flex;
justify-content: start;
align-items: center;
flex-direction: column;

@media (max-width: 500px) {
  width: 100%;
}


`

const P = styled.p`
display: flex;
justify-content: center;
align-items: center;
padding: 0 10px 0 10px;

`


const Container = styled.div`
height: 80%;
width: 100%;
display: flex;
justify-content: space-evenly;
align-items: center;
flex-direction: column;

`


