import React, { useState, useEffect, useContext } from "react";
import { useGetTreeData } from "../hooks/useGetTreeData";
import { useGetTokenURI } from "../hooks/useGetTokenURI";
import styled from "styled-components";
import {useAccount} from "wagmi";
import Stats from "./Stats";
import TreeControls from "./TreeControls";
import {Link, useParams,useLocation} from "react-router-dom";

import {DataContext} from './DataContext'
import TreeNotFound from "./TreeNotFound";
import Loading from "./Loading";



function Tree() {

  let {id} = useParams();

  const location = useLocation();

  const {extraData} = useContext(DataContext);

  const userTrees = location.pathname.substring(0,5) == "/user";


  const { treeData,  refetch: getTreeData } = useGetTreeData(id); 
  const {tokenURI, treeJson, getUri } = useGetTokenURI(id);

  const { address } = useAccount();

  const isOwner = treeData ? treeData[2].result == address : false;

  if(!extraData || !treeData ) {
    return(<Loading/>)
  }

  if(extraData && id > extraData[2].result || !Number(id)) {
    return(<TreeNotFound/>)
  }

  console.log(treeData);

  return (
    <Container>
      <Title>Tree #{id}</Title>
      <Middle>
        <Left> {/* this is also the top in mobile mode */}
          
            {!treeData[0].error && <SVG id="svg" src={"data:image/svg+xml;base64," + Buffer.from(treeData[0].result).toString("base64")} type="image/svg+xml"></SVG>}

            {treeData[0].error && !treeJson && 
              <Error>uh oh, looks like `getRawSvg()` failed using this RPC url. This can happen when a tree is particularly large.
              
              Feel free to view on open sea or toggle the render method to off chain if you own this tree.
              
              </Error>}

            {treeData[0].error && treeJson && <SVG id="svg" data={treeJson.image} type="image/svg+xml"></SVG>}
            
          <ButtonGroup>
            <Link to={`/${userTrees ? "user/" : ""}tree/${Number(id) - 1}`}><Button disabled={Number(id) == 1} >previous</Button></Link>
            <Link to={`/${userTrees ? "user/" : ""}tree/${Number(id) + 1}`}><Button disabled={Number(id) == extraData[2].result} >next</Button></Link>
          </ButtonGroup>

        </Left>


        <Right> {/* this is also the bottom in mobile mode */}

        <Stats treeData={treeData} treeId={id} address={address} isOwner={isOwner} />
          <TreeControls address={address} isOwner={isOwner} treeId={id} treeJson={treeJson} tokenURI={tokenURI} nextHarvest={Number(treeData[1].result.nextHarvest)}></TreeControls>

        </Right>

        

      </Middle>

      <ButtonGroup>

        <Link to={`/${userTrees ? "wallet/" : "search/"}`}><Button>back</Button></Link>

        
        <Button onClick={() => {getUri(); getTreeData();}}>refresh</Button>
      </ButtonGroup>


      

    </Container>
  );
}

export default Tree;

const Title = styled.h1`
all: none;
margin: 1rem;

`


const ButtonGroup = styled.div`
width: 100%;
display: flex;
justify-content: center;
`


const Button = styled.button`

@media (max-width: 500px) {
  padding: .5rem 1rem .5rem  1rem; 
  font-size: .5rem;
}
`;


const Right = styled.div`
  width: 45%;
  // height: 100%;
  // background-color: orange;

  @media (max-width: 500px) {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
`

const Left = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Error = styled.p`
  height: 100%;

`

const SVG = styled.img`
  width: 100%;  
  @media (max-width: 500px) {
    width: 80%;
  }

`;
const Container = styled.div`
  width: 100%;
  // height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  // padding-top: 20px;
  
`;

const Middle = styled.div`
  width: 90%;
  // height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: red;

  @media (max-width: 500px) {
    flex-direction: column;
    width: 95%;
    
  }
`