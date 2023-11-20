import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTreeWrites } from "../hooks/useTreeWrites";
import {recursiveTrees} from '../Contracts.js' 


function TreeControls({address, isOwner, treeId, treeJson, tokenURI, nextHarvest}) {
  const [waterAmount, setWaterAmount] = useState(0);

  const [transferAddress, setTransferAddress] = useState("");

  const [harvestTimes, setHarvestTimes] = useState({harvest: false, pick: false})


  const { harvestWrite, pickFruitWrite, waterWrite, renderForIdWrite, transferFromWrite } = useTreeWrites(treeId, waterAmount);

  
    useEffect(()=>{
      const timestamp = Date.now()/1000;
      if(timestamp < nextHarvest && timestamp > nextHarvest - 604800) {
        setHarvestTimes({harvest: false, pick: true})
        return
      }

      if(timestamp > nextHarvest) {
        setHarvestTimes({harvest: true, pick: true})
        return
      }
    
      

    },[nextHarvest])



  return (
    <Controls>
      <ButtonRow>

        <ButtonBox><Button disabled={!isOwner} onClick={renderForIdWrite.write}>Toggle render method</Button></ButtonBox>

            <ButtonBox>
            <Input type="number" onWheel={(e) => e.preventDefault} value={waterAmount} onChange={(e)=>{setWaterAmount(e.target.value)}}></Input>
            <Button disabled={!address && !waterWrite.write} onClick={waterWrite.write}>water</Button>
            </ButtonBox>

            
        </ButtonRow>


        <ButtonRow>
          <ButtonBox> <Button disabled={!isOwner || !harvestTimes.pick} onClick={pickFruitWrite.write}>Pick fruit</Button></ButtonBox>
          <ButtonBox> <Button disabled={!isOwner || !harvestTimes.harvest} onClick={harvestWrite.write}>Harvest fruit</Button></ButtonBox>
        </ButtonRow>



        <ButtonRow>
          <ButtonBox><Button disabled={!tokenURI} onClick={() => {navigator.clipboard.writeText(tokenURI);}}>copy token uri</Button></ButtonBox>
          <ButtonBox><Button disabled={!tokenURI} onClick={() => {navigator.clipboard.writeText(treeJson.image);}}>copy image uri</Button></ButtonBox>
        </ButtonRow>




        <ButtonRow>
        <ButtonBox>
        <Link style={{fontColor: "none"}} href={`https://testnets.opensea.io/assets/goerli/${recursiveTrees}/${treeId}`} target="blank">
        <Button>opensea</Button>
        </Link>
        </ButtonBox>


        <ButtonBox> 
          <TransferInput type="string" onWheel={(e) => e.preventDefault} value={transferAddress} onChange={(event)=>{setTransferAddress(event.target.value)}}></TransferInput>
          <Button disabled={!isOwner} onClick={() => {transferFromWrite.write({args:[address, transferAddress, treeId]})}}>Transfer</Button>
        </ButtonBox>
      </ButtonRow>



      <OutOfGas>
        {!tokenURI &&
          <small><h5>oof, looks like tokenURI() ran out of gas using the provided RPC url :( if you own this tree, you can toggle render method to 'off chain' and hit refresh</h5></small> }
      </OutOfGas>
    </Controls>
  );
}

export default TreeControls;


const Link = styled.a`
  width: 100%;
`

const OutOfGas = styled.p`
  // background-color: red;
  height: 10%;
  width: 100%;
  text-align: center;
`;
const ButtonRow = styled.div`
  width: 100%;
  height: 20%;
  display:flex;
  justify-content: space-between;

`;
const Button = styled.button`
width: 100%;
height: 100%;
margin: 0;
padding: 0;
`;

const ButtonBox = styled.div`
    width: 49%;
    height: 100%;
    display: flex;
    justify-content: center;





`

const Controls = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

`;

const Input = styled.input`
  width: 10%;
  margin: 0;
`;

const TransferInput = styled.input`
width: 90%;
margin: 0;

`
