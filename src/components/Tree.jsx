import React, { useState, useEffect } from "react";
import { useGetTreeData } from "../hooks/useGetTreeData";
import { useGetTokenURI } from "../hooks/useGetTokenURI";
import { useContractWrites } from "../hooks/useContractWrites";
import styled from "styled-components";
import {
  useAccount,
  useBalance,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";
import Stats from "./Stats";
import TreeControls from "./TreeControls";



function Tree({ extraData, treeId, setTreeId, setDisplayPage }) {
  const [isOwner, setIsOwner] = useState(false);
  const [treeInRange, setTreeInRange] = useState(true)


  const { treeData, isLoading,  refetch: getTreeData } = useGetTreeData(treeId); 
  const {tokenURI, treeJson, getUri } = useGetTokenURI(treeId);
  console.log(treeData)


  const { address, isConnecting, isDisconnected } = useAccount();


  useEffect(() => {
    treeData && setIsOwner(treeData[2].result == address); 
    setTreeInRange(++treeId > (extraData[2].result))

  }, [treeData,extraData]);

  return (
    <Container>
      <h1>Tree #{treeId}</h1>
      <Middle>
        <Left>
          
            {isLoading && <Error>loading tree</Error>}

            {treeData && !treeData[0].error && <SVG id="svg" data={"data:image/svg+xml;base64," + Buffer.from(treeData[0].result).toString("base64")} type="image/svg+xml"></SVG>}

            {treeData && treeData[0].error && !treeJson.image && 
              <Error>uh oh, looks like `getRawSvg()` failed using this RPC url. This can happen when a tree is particularly large.
              
              Feel free to view on open sea or toggle the render method to off chain if you own this tree.
              
              </Error>}

            {treeData && treeData[0].error && treeJson.image && <SVG id="svg" data={treeJson.image} type="image/svg+xml"></SVG>}


          
          {/* {treeData && !treeData[0].error ? (
            <SVG id="svg" data={"data:image/svg+xml;base64," + Buffer.from(treeData[0].result).toString("base64")} type="image/svg+xml"></SVG>
          ) : <Error>loading tree</Error>} */}
          <Buttons>
            <button disabled={treeId - 1 == 0} onClick={()=> setTreeId((treeId) => --treeId)}>previous</button>
            <button disabled={treeInRange} onClick={()=> setTreeId((treeId) => ++treeId)}>next</button>
          </Buttons>
          
        </Left>

        <Right>
          {treeData && <Stats treeData={treeData} treeId={treeId} address={address} isOwner={isOwner} />}
          {treeData && <TreeControls isOwner={isOwner} treeId={treeId} treeJson={treeJson} tokenURI={tokenURI} nextHarvest={Number(treeData[1].result.nextHarvest)}></TreeControls>}

        </Right>

      </Middle>

      <ButtonGroup>
        <button onClick={() => {getUri(); getTreeData();}}>refresh</button>
        <button onClick={() => {setDisplayPage(2);}}>back</button>
      </ButtonGroup>

    </Container>
  );
}

export default Tree;


const Buttons = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
`

const Right = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // background-color: green;
`

const Left = styled.div`
  // background-color: blue;
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Error = styled.p`
  height: 100%;

`

const SVG = styled.object`
  width: 80%;
  // height: 70%;
  
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;

  
`;

const Middle = styled.div`
  width: 90%;
  // padding: 1.5em;
  // margin-top: 5em;
  min-height: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: blue;
`;

const ButtonGroup = styled.div`
`;
