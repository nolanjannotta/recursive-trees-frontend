import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import { usePlantTree } from '../hooks/usePlantTree'
import {formatEther, parseEther} from "viem"
import { useAccount,useWaitForTransaction  } from 'wagmi'

import {useConnectModal} from "@rainbow-me/rainbowkit";


function Mint({extraData, getExtraData, setDisplayPage}) {
  const [batchTotal, setBatchTotal] = useState(1)
  const {address} = useAccount();
  const { openConnectModal } = useConnectModal();
  const [loadingText, setLoadingText] = useState("");


  function handleSuccess(data) {
    getExtraData();
    // setLoading(false);
    setLoadingText("success!")
  }

  function refresh() {
    getExtraData();
    // setLoading(false);
    setLoadingText("")
  }



  const {plantTreeWrite,batchPlantTree,fruitTokenPlantTreeWrite} = usePlantTree(batchTotal, Number(extraData[5].result),handleSuccess)
  // const [loading, setLoading] = useState(plantTreeWrite.isLoading || batchPlantTree.isLoading);
  
  let isMinting = extraData[2].result <= extraData[1].result

  function handleInput(event) {
    setBatchTotal(event.target.value)
}

useEffect(() => {
  if(plantTreeWrite.isSuccess || batchPlantTree.isSuccess) {
    // setLoading(false);
    setLoadingText("tx submitted. awaiting results...")
  }
  if(plantTreeWrite.isError || batchPlantTree.isError) {
    // setLoading(false);
    setLoadingText("error occured, try again")
  }


},[plantTreeWrite.isSuccess,batchPlantTree.isSuccess,plantTreeWrite.isError,batchPlantTree.isError])


  return (
    <Container>
      <h1>plant a tree</h1>
      <Info>
        
        <P>price: {formatEther(extraData[5].result.toString())} eth</P>

        <TotalMinted>
        <P>{(extraData[2].result).toString()} / {extraData[1].result.toString()} minted</P> 

         

        <P style={{cursor: "pointer", fontSize: "10px"}} onClick={refresh}>refresh</P>
        </TotalMinted>

        <P>{(extraData[7].result).toString()} / 2000 bonus trees planted</P>

        <PleaseConnect onClick={openConnectModal}>{!address &&  "please connect a wallet to mint"}</PleaseConnect>
        <P>{loadingText}</P>

      </Info>
     
      <Buttons>     
          
          <button disabled={!isMinting || !address} onClick={()=>{setLoadingText("awaiting user confirmation..."); plantTreeWrite.write()}}>plant 1</button>
          

          <Batch>
            <Input placeholder='amount' type="number" max={100} onChange={handleInput}></Input>
            <button style={{flexGrow: "4"}} disabled={!isMinting || !address || batchTotal > 100} onClick={()=>{setLoadingText("awaiting user confirmation...");batchPlantTree.write()}}>plant batch (100 max)</button>
          </Batch>

          <button disabled={!extraData[8].result || Number(formatEther(extraData[8].result)) < 1000} onClick={()=>{setLoadingText("awaiting user confirmation..."); fruitTokenPlantTreeWrite.write()}}>plant with fruit tokens (1000 fruit)</button>
          
          
      </Buttons> 
<button onClick={() => {setDisplayPage(1)}}>back</button> 
    </Container>
  )
}

export default Mint


const PleaseConnect = styled.div`
cursor: pointer;


`


const Batch = styled.div`
  // background-color: yellow;
  display: flex;
  justify-content: flex-end;






`


const Buttons = styled.div`
// background-color: blue;
  display: flex;
  justify-content: center;
  // align-items: center;
  flex-direction: column;


`

const Input = styled.input`

  width: 15%;
  // height: 10%;


`

const TotalMinted = styled.div`
// background-color: yellow;
// width: 20%;
display:flex;
// justify-content: space-between;


`


const Info = styled.div`
// background-color: orange;
width: 50%;
height: 50%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;


`

const P = styled.p`
// margin: 20px;
// background-color: blue;
display: flex;
justify-content: center;
align-items: center;
// height: 80px;
padding: 0 10px 0 10px;
`


const Container = styled.div`
height: 80%;
width: 100%;
display: flex;
justify-content: space-evenly;
align-items: center;
flex-direction: column;
// background-color: orange;

`


