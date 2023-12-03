import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTreeWrites } from "../hooks/useTreeWrites";
import {recursiveTrees} from '../Contracts.js' 
import { isAddress } from 'viem'
import {useUpdateOpenSeaMetadata} from "../hooks/useUpdateOpenSeaMetadata"



function TreeControls({address, isOwner, treeId, treeJson, tokenURI, nextHarvest}) {
  const [waterAmount, setWaterAmount] = useState(0);

  const [transferAddress, setTransferAddress] = useState("");

  const [harvestTimes, setHarvestTimes] = useState({harvest: false, pick: false})


  const { harvestWrite, pickFruitWrite, waterWrite, renderForIdWrite, transferFromWrite } = useTreeWrites(treeId, waterAmount);

  // const {update} = useUpdateOpenSeaMetadata(treeId);

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
              <Input disabled={!address && !waterWrite.write} type="number" onWheel={(e) => e.preventDefault} value={waterAmount} onChange={(e)=>{setWaterAmount(e.target.value)}}></Input>
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
              <TransferInput placeholder="address" type="string" onWheel={(e) => e.preventDefault} value={transferAddress} onChange={(event)=>{setTransferAddress(event.target.value)}}></TransferInput>
              <Button disabled={!isOwner || !isAddress(transferAddress)} onClick={() => {transferFromWrite.write({args:[address, transferAddress, treeId]})}}>Transfer</Button>
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

const OutOfGas = styled.div`
  height: 10%;
  width: 100%;
  text-align: center;
  // background-color: green;
  @media (max-width: 500px) {
    font-size: .5rem;
  }
`;

const ButtonRow = styled.div`
  width: 100%;
  height: 22.5%;
  display:flex;
  justify-content: space-between;
  // background-color: orange;
`;

const Button = styled.button`
width: 100%;
padding: 1.2rem 0 1.2rem  0; 
text-wrap: nowrap;
height: 100%;
text-align: center;
@media (max-width: 500px) {
  // padding: .5rem 0 .5rem  0; 
  font-size: .5rem;
}
@media (max-width: 1280px) {
  padding: .5rem 0 .5rem  0; 

}
@media (max-height: 1000px) {
  padding: .5rem 0 .5rem  0; 

}

`;

const ButtonBox = styled.div`
    width: 49%;
    display: flex;
    justify-content: center;
    margin: .2rem 0 .2rem 0;
    
`


const Controls = styled.div`
  // height: max-content;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  // align-items: center;
  // background-color: blue;
  // margin: auto;

  @media (max-width: 500px) {
    height: 100%;
    width: 50%;  
  }


`;


const Input = styled.input`
  width: 10%;
  @media (max-width: 500px) {
    // padding: .5rem 0 .5rem  0; 
    // width: 40%;
    font-size: .5rem;
  }

  @media (max-width: 1280px) {
    padding: .5rem 0 .5rem  0;
    width: 40%; 
  
  }
  @media (max-height: 1000px) {
    padding: .5rem 0 .5rem  0; 
  
  }
  
`;

const TransferInput = styled.input`
width: 90%;
flex-grow:2;
@media (max-width: 500px) {
  // padding: .5rem 0 .5rem  0; 
  font-size: .5rem;
}

@media (max-width: 1280px) {
  padding: .5rem 0 .5rem  0;
  // width: 40%; 

}
@media (max-height: 1000px) {
  padding: .5rem 0 .5rem  0; 

}

`
