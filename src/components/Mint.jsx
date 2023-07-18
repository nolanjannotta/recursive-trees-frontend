import React,{useState} from 'react'
import styled from 'styled-components'
import { usePlantTree } from '../hooks/usePlantTree'
import {formatEther, parseEther} from "viem"
import { useAccount } from 'wagmi'


function Mint({extraData, setDisplayPage}) {
  const [batchTotal, setBatchTotal] = useState(1)
  const {address} = useAccount();
  const {plantTreeWrite,batchPlantTree} = usePlantTree(batchTotal, Number(extraData[5].result))

  let isMinting = extraData[2].result <= extraData[1].result

  function handleInput(event) {
    setBatchTotal(event.target.value)
}


  return (
    <Container>
      <h1>plant a tree</h1>
      <Info>
        <P>price: {formatEther(extraData[5].result.toString())} eth</P>
        <P>{(extraData[2].result - 1n).toString()} / {extraData[1].result.toString()} minted</P> 
      </Info>
      { !address &&  <p>please connact a wallet to mint</p>}
      <Buttons>    
          
          <button disabled={!isMinting || !address} onClick={plantTreeWrite.write}>mint 1</button>
          

          <Batch>
            <Input placeholder='amount' type="number" max={20} onChange={handleInput}></Input>
            <button style={{flexGrow: "4"}} disabled={!isMinting || !address || batchTotal > 20} onClick={batchPlantTree.write}>mint batch (20 max)</button>
          </Batch>
          
          
      </Buttons> 
<button onClick={() => {setDisplayPage(1)}}>back</button> 
    </Container>
  )
}

export default Mint


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


const Info = styled.div`
// background-color: blue;
width: 50%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;


`

const P = styled.p`
margin: 20px;
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